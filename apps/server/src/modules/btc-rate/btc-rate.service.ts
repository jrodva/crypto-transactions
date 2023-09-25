import { Injectable } from '@nestjs/common';

const BTC_BASE_PRICE = 5000;
const BTC_PRICE_RANGE = 7000;

@Injectable()
export class BtcRateService {
  findAll(): number {
    return +(BTC_BASE_PRICE + Math.random() * BTC_PRICE_RANGE).toFixed(2);
  }
}
