import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Accounts, AccountsDocument } from './schema/accounts.schema';
import { Model } from 'mongoose';

@Injectable()
export class AccountsService {
  constructor(@InjectModel(Accounts.name) private accountsModel: Model<AccountsDocument>) {}

  async findAll() {
    let accounts = [];

    try {
      accounts = await this.accountsModel.find({});
    } catch (error) {
      throw new Error(error);
    }

    return accounts;
  }
}
