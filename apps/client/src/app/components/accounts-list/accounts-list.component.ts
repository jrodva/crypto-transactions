import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { AccountsService } from '../../services/accounts/accounts.service';
import { MatTableDataSource } from '@angular/material/table';
import { Account } from '@libs/interfaces';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { MatSort, Sort } from '@angular/material/sort';
import { BtcRateService } from '../../services/btc-rate/btc-rate.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { Socket } from 'ngx-socket-io';
import { WSS_EVENTS } from '@libs/constants';

const ASCENDENT_DIRECTION = 'asc';

@Component({
  selector: 'crypto-transactions-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss'],
})
export class AccountsListComponent implements OnInit, AfterViewInit, OnDestroy {
  dataSource: MatTableDataSource<Account> = new MatTableDataSource<Account>([]);
  accounts$: Observable<Account[]> = this.accountsService.accounts$;
  btcRate$: Observable<number> = this.btcRateService.currentBtcRate$;
  randomBalanceAccount$ = this.accountsService.randomBalanceAccount$;
  randomBalanceAccountSubscription: Subscription;
  displayedColumns: string[] = ['name', 'category', 'tags', 'current-balance', 'available-balance'];
  isHigherBalance = false;
  isLowerBalance = false;
  selectedRowIndex = -1;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private accountsService: AccountsService,
    private btcRateService: BtcRateService,
    private breadcrumbService: BreadcrumbService,
    private route: ActivatedRoute,
    private socket: Socket
  ) {}

  ngOnInit() {
    const breadcrumb = new Map<string, string>();

    breadcrumb.set('full', this.route.snapshot.data['breadcrumb']['full']);
    breadcrumb.set('currentLevel', this.route.snapshot.data['breadcrumb']['currentLevel']);
    this.breadcrumbService.updateCurrentBreadcrumbSubject(breadcrumb);
    this.accounts$.pipe(take(2)).subscribe((accounts) => {
      if (accounts.length) {
        this.dataSource.data = accounts;
        this.socket.emit(WSS_EVENTS.ACCOUNT);
        this.accountsService.updateBalanceAccountWithRandomDataFromApi();
      }
    });
    this.randomBalanceAccountSubscription = this.randomBalanceAccount$.subscribe(
      ({ accountIndex, isHigher, isLower }) => {
        this.selectedRowIndex = accountIndex;
        this.isHigherBalance = isHigher;
        this.isLowerBalance = isLower;
      }
    );
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
      const isAsc = sort.direction === ASCENDENT_DIRECTION;

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
    this.randomBalanceAccountSubscription.unsubscribe();
  }
}
