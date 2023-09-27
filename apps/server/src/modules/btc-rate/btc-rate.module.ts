import { Module } from '@nestjs/common';
import { BtcRateService } from './btc-rate.service';

@Module({
  providers: [BtcRateService],
  exports: [BtcRateService],
})
export class BtcRateModule {}
