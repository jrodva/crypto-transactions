import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Accounts, AccountsDocument } from './schema/accounts.schema';
import { Model } from 'mongoose';
import { UpdateAccountDto } from './dto/update-account.dto';

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

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    let updatedAccount = null;

    try {
      updatedAccount = await this.accountsModel.updateOne({ _id: id }, updateAccountDto);
    } catch (error) {
      throw new Error(error);
    }

    return updatedAccount;
  }
}
