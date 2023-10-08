import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { NFTService } from './nft.service';
import { NFT, Transfer } from './classes';
import { AccessGuard } from '../auth/guards/access.guard';

@Controller('nft')
@UseGuards(AccessGuard)
export class NFTController {
  constructor(private readonly nftService: NFTService) {}

  @Get()
  async getNFTs(@Query() params) {
    return await this.nftService.getNFTs(params);
  }

  @Post()
  async getOne(@Body() nft: NFT) {
    return await this.nftService.getOne(nft);
  }

  @Put()
  async transferNFT(@Req() req: Request, @Body() nft: Transfer) {
    return await this.nftService.transferNFT(req, nft);
  }
}
