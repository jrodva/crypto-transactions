import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transactions, TransactionsDocument } from './schema/transactions.schema';
import { Transaction } from '@libs/interfaces';

@Injectable()
export class TransactionsService {
  constructor(@InjectModel(Transactions.name) private transactionsModel: Model<TransactionsDocument>) {}

  async getTransactionsByIds(ids: string[]): Promise<Transaction[]> {
    let transactions = [];

    try {
      transactions = await this.transactionsModel.find({ _id: { $in: ids } });
    } catch (error) {
      throw new Error(error);
    }

    return transactions;
  }
}
