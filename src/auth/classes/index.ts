import { IsJWT, IsString, Length } from 'class-validator';

export class RegisterUser {
  @IsString()
  name: string;
}

export class Registered {
  @IsString()
  _id: string;

  @IsString()
  mnemonic: string;
}

export class LoginUser {
  @IsString()
  _id: string;

  @Length(4)
  pin: string;
}

export class Jwt {
  @IsJWT()
  token: string;

  @IsString()
  address: string;
}

export class JwtPayload {
  @Length(42)
  sub: string;
}
