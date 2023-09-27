import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { BtcRateService } from './services/btc-rate/btc-rate.service';

const CUSTOM_ICON_NAME = 'bitcoin';
const CUSTOM_ICON_URL = 'assets/icons/bitcoin.svg';

@Component({
  selector: 'crypto-transactions-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private btcRateService: BtcRateService
  ) {
    this.btcRateService.updateCurrentBtcRateWithDataFromApi();
    this.matIconRegistry.addSvgIcon(
      CUSTOM_ICON_NAME,
      this.domSanitizer.bypassSecurityTrustResourceUrl(CUSTOM_ICON_URL)
    );
  }
}
