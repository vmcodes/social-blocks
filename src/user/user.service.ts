import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './models';
import { RestoreWallet } from './classes';
import { restoreWallet } from '../utils/restoreWallet';
import { decryptData } from '../utils/crypto';
import { jwtPayload } from 'jwt-payloader';
import { Alchemy, Utils } from 'alchemy-sdk';
import { networkFilter } from '../utils/networkFilter';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUser(req: Request) {
    try {
      const payload = await jwtPayload(req);

      if (payload.sub) {
        const user = await this.userModel
          .findById(new Types.ObjectId(payload.sub), { _id: 0, pin: 0 })
          .exec();

        user.mnemonic = decryptData(user.mnemonic);
        user.account = decryptData(user.account);

        return user;
      }

      throw new ForbiddenException();
    } catch (e) {
      console.log(e);
      throw new ForbiddenException();
    }
  }

  async deleteUser(req: Request): Promise<boolean> {
    try {
      const payload = await jwtPayload(req);

      const account = await this.userModel
        .findById(new Types.ObjectId(payload.sub))
        .exec();

      if (account?._id) {
        await this.userModel.findByIdAndDelete(account._id).exec();

        return true;
      }

      throw new ForbiddenException();
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async restoreWallet(wallet: RestoreWallet) {
    try {
      const restored = restoreWallet(wallet.mnemonic);

      const user = await this.userModel
        .findOne({ address: restored.address })
        .exec();

      const match = restored.mnemonic === decryptData(user.mnemonic);

      if (match) {
        return {
          _id: user._id,
          mnemonic: restored.mnemonic,
        };
      }

      throw new ForbiddenException();
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async getERC20Tokens(params) {
    try {
      const settings = networkFilter(params.network);

      const alchemy = new Alchemy(settings);

      const tokens = await alchemy.core.getTokenBalances(params.address);

      const balances = tokens.tokenBalances;
      const metaData = [];

      for (const contract of balances) {
        await alchemy.core
          .getTokenMetadata(contract.contractAddress)
          .then((data) =>
            metaData.push({ data: data, address: contract.contractAddress }),
          );
      }

      return metaData;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }

  async getERCToken(req: Request, params) {
    try {
      const payload = await jwtPayload(req);

      const wallet = await this.userModel
        .findById(new Types.ObjectId(payload.sub), { _id: 0, pin: 0 })
        .exec();

      const settings = networkFilter(params.network);

      const alchemy = new Alchemy(settings);

      const balance = await alchemy.core.getTokenBalances(wallet.address, [
        params.contract,
      ]);

      return Utils.formatEther(balance.tokenBalances[0].tokenBalance);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }
}
