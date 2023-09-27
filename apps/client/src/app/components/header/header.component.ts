import { Component } from '@angular/core';
import { BtcRateService } from '../../services/btc-rate/btc-rate.service';

@Component({
  selector: 'crypto-transactions-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  btcRate$ = this.btcRateService.currentBtcRate$;

  constructor(private btcRateService: BtcRateService) {}
}
