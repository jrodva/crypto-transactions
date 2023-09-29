import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transactions, TransactionsSchema } from './schema/transactions.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Transactions.name,
        schema: TransactionsSchema,
      },
    ]),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
