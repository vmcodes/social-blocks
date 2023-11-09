import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Payment } from './classes';
import { AccessGuard } from '../auth/guards/access.guard';

@Controller('transaction')
@UseGuards(AccessGuard)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  async getTransactions(@Query() params) {
    return await this.transactionService.getTransactions(params);
  }

  @Get('balance')
  async getBalance(@Query() params) {
    return await this.transactionService.getBalance(params);
  }

  @Post('gas')
  async estimateGasCost(@Req() req: Request, @Body() payment: Payment) {
    return await this.transactionService.estimateGasCost(req, payment);
  }

  @Post('tokens')
  async transferTokens(@Req() req: Request, @Body() payment: Payment) {
    return await this.transactionService.transferTokens(req, payment);
  }

  @Post('erc20')
  async transferERC20(@Req() req: Request, @Body() payment: Payment) {
    return await this.transactionService.transferERC20(req, payment);
  }
}
