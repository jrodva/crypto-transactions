import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Account } from '@libs/interfaces';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private accountsSubject: BehaviorSubject<Account[]> = new BehaviorSubject<Account[]>([]);
  accounts$: Observable<Account[]> = this.accountsSubject.asObservable();

  constructor(private apiService: ApiService) {}

  private updateAccounts(accounts: Account[]): void {
    this.accountsSubject.next(accounts);
  }

  updateAccountsWithDataFromApi(): void {
    this.apiService.getAccounts().subscribe((accounts) => {
      this.updateAccounts(accounts);
    });
  }
}
