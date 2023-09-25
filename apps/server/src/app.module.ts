import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AccountsModule } from './modules/accounts/accounts.module';

@Module({
  controllers: [],
  imports: [MongooseModule.forRoot(process.env.DB_URI), AccountsModule],
  providers: [],
})
export class AppModule {}
