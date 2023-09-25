import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AccountsModule } from './modules/accounts/accounts.module';
import { BtcRateModule } from './modules/btc-rate/btc-rate.module';

@Module({
  controllers: [],
  imports: [MongooseModule.forRoot(process.env.DB_URI), AccountsModule, BtcRateModule],
  providers: [],
})
export class AppModule {}
