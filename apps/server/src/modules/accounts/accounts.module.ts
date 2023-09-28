import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Accounts, AccountsSchema } from './schema/accounts.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Accounts.name,
        schema: AccountsSchema,
      },
    ]),
  ],
  controllers: [AccountsController],
  providers: [AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}
