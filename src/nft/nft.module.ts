import { Module } from '@nestjs/common';
import { NFTController } from './nft.controller';
import { NFTService } from './nft.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/models';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [NFTController],
  providers: [NFTService],
  exports: [NFTService],
})
export class NFTModule {}
