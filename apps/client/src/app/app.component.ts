import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { BtcRateService } from './services/btc-rate/btc-rate.service';

@Component({
  selector: 'crypto-transactions-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  btcRate$ = this.btcRateService.getBtcRate();

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private btcRateService: BtcRateService
  ) {
    this.matIconRegistry.addSvgIcon(
      'bitcoin',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/bitcoin.svg')
    );
  }
}
