import { Component, Input } from '@angular/core';

@Component({
  selector: 'crypto-transactions-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() btcRate: number | null = null;
}
