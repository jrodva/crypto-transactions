import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from '../accounts/accounts.module';

@Module({
  controllers: [AppController],
  imports: [AccountsModule, MongooseModule.forRoot(process.env.DB_URI)],
  providers: [AppService],
})
export class AppModule {}
