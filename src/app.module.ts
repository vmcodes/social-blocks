import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MONGO_DB_URI } from './constants';
import { NFTModule } from './nft/nft.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    NFTModule,
    TransactionModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: MONGO_DB_URI,
        useNewUrlParser: true,
      }),
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
