import { Test, TestingModule } from '@nestjs/testing';
import { BtcRateController } from './btc-rate.controller';
import { BtcRateService } from './btc-rate.service';

describe('BtcRateController', () => {
  let controller: BtcRateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BtcRateController],
      providers: [BtcRateService],
    }).compile();

    controller = module.get<BtcRateController>(BtcRateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
