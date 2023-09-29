import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { BtcRateService } from './modules/btc-rate/btc-rate.service';
import { Logger } from '@nestjs/common';
import { WSS_EVENTS } from '@libs/constants';
import { AccountsService } from './modules/accounts/accounts.service';

const BALANCE_MS = 40000;
const EXCHANGE_RATE_MS = 30000;
const POSSIBLE_BALANCES_CHANGES = [0.5, 1, 1.5];
const RANDOM_MULTIPLIER = POSSIBLE_BALANCES_CHANGES[Math.floor(Math.random() * POSSIBLE_BALANCES_CHANGES.length)];

@WebSocketGateway(83, {
  autoConnect: true,
  cors: { origin: '*' },
  transports: ['websocket'],
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('AppGateway');
  @WebSocketServer() wss: Server;
  private exchangeRateInterval: NodeJS.Timeout;
  private accountsInterval: NodeJS.Timeout;

  constructor(private accountsService: AccountsService, private btcRateService: BtcRateService) {}

  afterInit() {
    this.logger.log('The connection is ready');
    this.sendExchangeRate();
  }

  handleConnection() {
    this.logger.log('New client connected');
  }

  handleDisconnect() {
    this.logger.log('New client disconnected');
    clearInterval(this.accountsInterval);
    clearInterval(this.exchangeRateInterval);
  }

  @SubscribeMessage(WSS_EVENTS.ACCOUNT)
  sendAccountWithNewBalance() {
    this.logger.log('Start sending account with new balance');
    this.accountsInterval = setInterval(async () => {
      try {
        const accounts = await this.accountsService.findAll();
        const selectedAccount = accounts[Math.floor(Math.random() * accounts.length)];
        const {
          balance: { available, current },
        } = selectedAccount;

        selectedAccount.balance.available = (RANDOM_MULTIPLIER * available).toFixed(8);
        selectedAccount.balance.current = (RANDOM_MULTIPLIER * current).toFixed(8);
        await this.accountsService.update(selectedAccount._id, selectedAccount);
        this.wss.emit(WSS_EVENTS.ACCOUNT, {
          _id: selectedAccount._id,
          balance: selectedAccount.balance,
        });
      } catch (error) {
        throw new Error(error);
      }
    }, BALANCE_MS);
  }

  private sendExchangeRate() {
    this.exchangeRateInterval = setInterval(() => {
      const rate = this.btcRateService.findAll();

      this.wss.emit(WSS_EVENTS.EXCHANGE_RATE, rate);
    }, EXCHANGE_RATE_MS);
  }
}
