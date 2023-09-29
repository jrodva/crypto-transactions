import { Route } from '@angular/router';
import { AccountsListComponent } from './components/accounts-list/accounts-list.component';
import { AccountDetailComponent } from './components/account-detail/account-detail.component';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'accounts',
    pathMatch: 'full',
  },
  {
    path: 'accounts',
    component: AccountsListComponent,
    title: 'Crypto Transactions',
    data: {
      breadcrumb: {
        currentLevel: 'Accounts',
        full: 'Home / Accounts',
      },
    },
    children: [
      {
        path: ':id',
        component: AccountDetailComponent,
        title: 'Crypto Transactions',
        data: {
          breadcrumb: {
            currentLevel: 'Details',
            full: 'Home / Accounts / Details',
          },
        },
      },
    ],
  },
];
