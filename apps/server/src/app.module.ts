import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsModule } from './modules/accounts/accounts.module';
import { BtcRateModule } from './modules/btc-rate/btc-rate.module';
import { AppGateway } from './app.gateway';
import { TransactionsModule } from './modules/transactions/transactions.module';

@Module({
  imports: [AccountsModule, BtcRateModule, MongooseModule.forRoot(process.env.DB_URI), TransactionsModule],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
