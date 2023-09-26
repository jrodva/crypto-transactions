import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BtcRateService {
  constructor(private http: HttpClient) {}

  getBtcRate(): Observable<number> {
    const {
      API_URL: { BASE, BTC_RATE },
    } = environment;

    return this.http.get<number>([BASE, BTC_RATE].join('/'));
  }
}
