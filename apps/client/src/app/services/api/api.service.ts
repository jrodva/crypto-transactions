import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { WSS_EVENTS } from '@libs/constants';
import { Account } from '@libs/interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private socket: Socket, private http: HttpClient) {}

  getAccounts(): Observable<Account[]> {
    const {
      API_URL: { BASE, ACCOUNTS },
    } = environment;

    return this.http.get<Account[]>([BASE, ACCOUNTS].join('/'));
  }

  getAccountWithUpdatedBalance(): Observable<{ _id: string; balance: { available: number; current: number } }> {
    return this.socket.fromEvent<{ _id: string; balance: { available: number; current: number } }>(WSS_EVENTS.ACCOUNT);
  }

  getBtcRate(): Observable<number> {
    return this.socket.fromEvent<number>(WSS_EVENTS.EXCHANGE_RATE);
  }
}
