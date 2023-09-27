import { Route } from '@angular/router';
import { AccountsListComponent } from './components/accounts-list/accounts-list.component';

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
  },
];
