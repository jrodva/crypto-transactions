import { Controller, Body, Post } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionIdsDTO } from './dto/transaction-ids.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('getByIds')
  async getTransactionsByIds(@Body() idsDto: TransactionIdsDTO) {
    return await this.transactionsService.getTransactionsByIds(idsDto.ids);
  }
}
