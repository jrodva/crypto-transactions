import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Account } from '@libs/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  constructor(private http: HttpClient) {}

  getAccounts(): Observable<Account[]> {
    const {
      API_URL: { BASE, ACCOUNTS },
    } = environment;

    return this.http.get<Account[]>([BASE, ACCOUNTS].join('/'));
  }
}
