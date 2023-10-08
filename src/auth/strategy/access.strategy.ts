import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../classes';
import { ACCESS_SECRET } from '../../constants';

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: ACCESS_SECRET,
      ignoreExpiration: true,
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
