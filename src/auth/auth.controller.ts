import { Body, Controller, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Jwt, LoginUser, RegisterUser, Registered } from './classes';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() user: LoginUser): Promise<Jwt> {
    return await this.authService.login(user);
  }

  @Put('signup')
  async register(@Body() user: RegisterUser): Promise<Registered> {
    return await this.authService.register(user);
  }

  @Put('pin')
  async addPin(@Body() user: LoginUser): Promise<Jwt> {
    return await this.authService.addPin(user);
  }
}
