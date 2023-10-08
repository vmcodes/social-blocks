import {
  Body,
  Controller,
  Get,
  Put,
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

  @Put('tokens')
  async transferTokens(@Req() req: Request, @Body() payment: Payment) {
    return await this.transactionService.transferTokens(req, payment);
  }
}
