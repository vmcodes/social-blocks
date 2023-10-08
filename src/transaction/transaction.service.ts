import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  Alchemy,
  AssetTransfersCategory,
  SortingOrder,
  Utils,
} from 'alchemy-sdk';
import { sendTokens } from '../utils/sendTokens';
import { Payment } from './classes';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/models';
import { Model, Types } from 'mongoose';
import { jwtPayload } from 'jwt-payloader';
import { networkFilter } from '../utils/networkFilter';

@Injectable()
export class TransactionService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getTransactions(params) {
    try {
      const settings = networkFilter(params.network);

      const alchemy = new Alchemy(settings);

      const { EXTERNAL, ERC20, ERC721, ERC1155 } = AssetTransfersCategory;

      const { DESCENDING } = SortingOrder;

      if (params.type === 'incoming') {
        return await alchemy.core.getAssetTransfers({
          toAddress: params.address,
          excludeZeroValue: true,
          category: [EXTERNAL, ERC20, ERC721, ERC1155],
          order: DESCENDING,
          maxCount: 50,
        });
      } else if (params.type === 'outgoing') {
        return await alchemy.core.getAssetTransfers({
          fromAddress: params.address,
          excludeZeroValue: true,
          category: [EXTERNAL, ERC20, ERC721, ERC1155],
          order: DESCENDING,
          maxCount: 50,
        });
      }

      throw new InternalServerErrorException();
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async getBalance(params) {
    try {
      const settings = networkFilter(params.network);

      const alchemy = new Alchemy(settings);

      const balance = await alchemy.core.getBalance(params.address, 'latest');

      return Utils.formatEther(balance);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async transferTokens(req: Request, payment: Payment) {
    try {
      const payload = await jwtPayload(req);

      const sender = await this.userModel
        .findById(new Types.ObjectId(payload.sub))
        .exec();

      const settings = networkFilter(payment.network);

      return await sendTokens(
        sender.account,
        payment.receiver,
        payment.amount,
        settings,
      );
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
