import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { WSS_EVENTS } from '@libs/constants';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private socket: Socket) {}

  getBtcRate(): Observable<number> {
    return this.socket.fromEvent<number>(WSS_EVENTS.EXCHANGE_RATE);
  }
}
