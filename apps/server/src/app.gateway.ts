import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { BtcRateService } from './modules/btc-rate/btc-rate.service';
import { Logger } from '@nestjs/common';

const REQUEST_INTERVAL = 30000;

@WebSocketGateway(83, {
  cors: { origin: '*' },
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('AppGateway');
  @WebSocketServer() wss: Server;
  private exchangeRateInterval: NodeJS.Timeout;

  constructor(private btcRateService: BtcRateService) {}

  afterInit() {
    this.logger.log('The connection is ready');
    this.sendExchangeRate();
  }

  handleConnection() {
    this.logger.log('New client connected');
  }

  handleDisconnect() {
    this.logger.log('New client disconnected');
    clearInterval(this.exchangeRateInterval);
  }

  sendExchangeRate() {
    this.exchangeRateInterval = setInterval(() => {
      const rate = this.btcRateService.findAll();

      this.wss.emit('exchange-rate', rate);
    }, REQUEST_INTERVAL);
  }
}
