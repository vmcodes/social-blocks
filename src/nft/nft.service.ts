import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Alchemy, NftOrdering } from 'alchemy-sdk';
import { NFT, Transfer } from './classes';
import { networkFilter } from '../utils/networkFilter';
import { sendERC1155 } from '../utils/sendERC1155';
import { sendERC721 } from '../utils/sendERC721';
import { User } from '../user/models';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { jwtPayload } from 'jwt-payloader';
import { rpcFilter } from '../utils/rpcFilter';

@Injectable()
export class NFTService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getNFTs(params) {
    try {
      const settings = networkFilter(params.network);

      const alchemy = new Alchemy(settings);

      const nfts = await alchemy.nft.getNftsForOwner(params.address, {
        orderBy: NftOrdering.TRANSFERTIME,
        // excludeFilters: [NftFilters.SPAM], // mainnet feature
        pageSize: params.amount,
      });

      return nfts.ownedNfts;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async getOne(nft: NFT) {
    try {
      const settings = networkFilter(nft.network);

      const alchemy = new Alchemy(settings);

      const token = await alchemy.nft.getNftMetadata(nft.contract, nft.token);
      const contract = await alchemy.nft.getContractMetadata(nft.contract);

      return { token, contract };
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async transferNFT(req: Request, nft: Transfer) {
    try {
      const payload = await jwtPayload(req);

      const sender = await this.userModel
        .findById(new Types.ObjectId(payload.sub))
        .exec();

      const network = rpcFilter(nft.network);

      if (nft.tokenType === 'ERC1155') {
        return await sendERC1155(
          sender.account,
          nft.receiver,
          nft.contract,
          nft.token,
          network,
        );
      } else if (nft.tokenType === 'ERC721') {
        return await sendERC721(
          sender.account,
          nft.receiver,
          nft.contract,
          nft.token,
          network,
        );
      }

      console.log(`invalid token: ${nft.tokenType}`);
      throw new InternalServerErrorException();
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
