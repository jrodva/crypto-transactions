import { Controller, Get } from '@nestjs/common';
import { BtcRateService } from './btc-rate.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('btc-rate')
@Controller('btc-rate')
export class BtcRateController {
  constructor(private readonly btcRateService: BtcRateService) {}

  @Get()
  findAll(): number {
    return this.btcRateService.findAll();
  }
}
