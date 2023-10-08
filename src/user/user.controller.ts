import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AccessGuard } from '../auth/guards/access.guard';
import { RestoreWallet } from './classes';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AccessGuard)
  async getUser(@Req() req: Request) {
    return await this.userService.getUser(req);
  }

  @Post('delete')
  @UseGuards(AccessGuard)
  async deleteUser(@Req() req: Request) {
    return await this.userService.deleteUser(req);
  }

  @Post('restore')
  async restoreWallet(@Body() wallet: RestoreWallet) {
    return await this.userService.restoreWallet(wallet);
  }

  @Get('tokens')
  async getERC20Tokens(@Query() params) {
    return await this.userService.getERC20Tokens(params);
  }

  @Get('token')
  async getERCToken(@Req() req: Request, @Query() params) {
    return await this.userService.getERCToken(req, params);
  }
}
