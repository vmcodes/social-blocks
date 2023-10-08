import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessStrategy } from './strategy/access.strategy';
import { ACCESS_SECRET } from '../constants';
import { User, UserSchema } from '../user/models';

@Module({
  imports: [
    JwtModule.register({
      secret: ACCESS_SECRET,
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessStrategy],
  exports: [AuthService],
})
export class AuthModule {}
