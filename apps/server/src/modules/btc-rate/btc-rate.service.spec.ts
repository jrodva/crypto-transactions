import { Test, TestingModule } from '@nestjs/testing';
import { BtcRateService } from './btc-rate.service';

describe('BtcRateService', () => {
  let service: BtcRateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BtcRateService],
    }).compile();

    service = module.get<BtcRateService>(BtcRateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
