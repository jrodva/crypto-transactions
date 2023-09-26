import { Component, OnDestroy, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AccountsService } from '../../services/accounts/accounts.service';
import { MatTableDataSource } from '@angular/material/table';
import { Account } from '@libs/interfaces';
import { Observable, Subscription } from 'rxjs';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'crypto-transactions-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss'],
})
export class AccountsListComponent implements OnInit, OnDestroy, AfterViewInit {
  dataSource: MatTableDataSource<Account> = new MatTableDataSource();
  accounts$: Observable<Account[]> = this.accountsService.getAccounts();
  accountsSubscription: Subscription;
  displayedColumns: string[] = ['name', 'category', 'tags', 'current-balance', 'available-balance'];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private accountsService: AccountsService) {}

  ngOnInit() {
    this.accountsSubscription = this.accounts$.subscribe((accounts) => {
      this.dataSource.data = accounts;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  private compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sortData(sort: Sort): number | void {
    const data = [...this.dataSource.data];

    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';

      switch (sort.active) {
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'category':
          return this.compare(a.category, b.category, isAsc);
        case 'tags':
          return this.compare(a.tags.length, b.tags.length, isAsc);
        case 'current-balance':
          return this.compare(a.balance.current, b.balance.current, isAsc);
        case 'available-balance':
          return this.compare(a.balance.available, b.balance.available, isAsc);
        default:
          return 0;
      }
    });
  }

  ngOnDestroy() {
    this.accountsSubscription.unsubscribe();
  }
}
