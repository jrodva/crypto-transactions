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
      updatedAccount = await this.accountsModel.updateOne(
        { name: updateAccountDto.name, category: updateAccountDto.category, tags: updateAccountDto.tags },
        { balance: updateAccountDto.balance },
        { new: true }
      );
    } catch (error) {
      throw new Error(error);
    }

    return updatedAccount;
  }
}
