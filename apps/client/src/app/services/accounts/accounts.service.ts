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
  private randomBalanceAccountSubject: BehaviorSubject<{ accountIndex: number; isHigher: boolean; isLower: boolean }> =
    new BehaviorSubject<{ accountIndex: number; isHigher: boolean; isLower: boolean }>({
      accountIndex: -1,
      isHigher: false,
      isLower: false,
    });
  randomBalanceAccount$: Observable<{ accountIndex: number; isHigher: boolean; isLower: boolean }> =
    this.randomBalanceAccountSubject.asObservable();

  constructor(private apiService: ApiService) {}

  private updateAccounts(accounts: Account[]): void {
    this.accountsSubject.next(accounts);
  }

  private updateRandomBalanceAccount(randomBalanceAccount: {
    accountIndex: number;
    isHigher: boolean;
    isLower: boolean;
  }) {
    this.randomBalanceAccountSubject.next(randomBalanceAccount);
  }

  updateBalanceAccountWithRandomDataFromApi(): void {
    this.apiService.getAccountWithUpdatedBalance().subscribe(({ _id, balance }) => {
      const accounts = this.accountsSubject.getValue();
      const accountIndex = accounts.findIndex((account) => account._id === _id);
      const isHigher = balance.current > accounts[accountIndex].balance.current;
      const isLower = balance.current < accounts[accountIndex].balance.current;

      accounts[accountIndex].balance = balance;
      this.updateRandomBalanceAccount({ accountIndex, isHigher, isLower });
      this.updateAccounts(accounts);
    });
  }

  updateAccountsWithDataFromApi(): void {
    this.apiService.getAccounts().subscribe((accounts) => {
      this.updateAccounts(accounts);
    });
  }
}
