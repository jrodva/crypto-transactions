import { Module } from '@nestjs/common';
import { BtcRateService } from './btc-rate.service';
import { BtcRateController } from './btc-rate.controller';

@Module({
  controllers: [BtcRateController],
  providers: [BtcRateService],
})
export class BtcRateModule {}
