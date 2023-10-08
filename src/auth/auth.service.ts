import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Jwt, LoginUser, RegisterUser, Registered } from './classes';
import { User } from '../user/models';
import { newAccount } from '../utils/newAccount';
import { encryptData } from '../utils/crypto';
const bcrypt = require('bcrypt');
const saltRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async login(user: LoginUser): Promise<Jwt> {
    try {
      const account = await this.userModel
        .findById(new Types.ObjectId(user._id))
        .exec();

      const match = await bcrypt.compareSync(user.pin, account.pin);

      if (match) {
        const token = this.jwtService.sign({
          sub: account._id,
        });

        return { token, address: account.address };
      }

      throw new ForbiddenException();
    } catch (e) {
      console.log(e);
      throw new ForbiddenException();
    }
  }

  async register(user: RegisterUser): Promise<Registered> {
    try {
      const wallet = await newAccount();

      const account = await this.userModel.findOne({
        address: wallet.address,
      });

      if (account) {
        throw new ForbiddenException();
      }

      const hash = await bcrypt.hashSync('00000000', saltRounds);

      const mnemonic = encryptData(wallet.mnemonic);

      await new this.userModel({
        name: user.name,
        pin: hash,
        address: wallet.address,
        mnemonic: mnemonic,
        account: encryptData(wallet.account),
      }).save();

      const newUser = await this.userModel
        .findOne({
          address: wallet.address,
        })
        .exec();

      return { _id: newUser._id, mnemonic: wallet.mnemonic };
    } catch (e) {
      console.log(e);
      throw new ForbiddenException();
    }
  }

  async addPin(user: LoginUser): Promise<Jwt> {
    try {
      const account = await this.userModel.findById({
        _id: new Types.ObjectId(user._id),
      });

      if (!account) {
        throw new ForbiddenException();
      }

      const hash = await bcrypt.hashSync(user.pin, saltRounds);

      await this.userModel
        .findByIdAndUpdate(account._id, {
          pin: hash,
        })
        .exec();

      const token = this.jwtService.sign({
        sub: account._id,
      });

      return { token, address: account.address };
    } catch (e) {
      console.log(e);
      throw new ForbiddenException();
    }
  }
}
