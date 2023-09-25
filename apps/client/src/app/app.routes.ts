import { Route } from '@angular/router';
import { AccountsListComponent } from './components/accounts-list/accounts-list.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: AccountsListComponent,
    title: 'Crypto Transactions',
  },
];
