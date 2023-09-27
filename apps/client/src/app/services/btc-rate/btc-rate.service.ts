import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class BtcRateService {
  private currentBtcRateSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  currentBtcRate$: Observable<number> = this.currentBtcRateSubject.asObservable();

  constructor(private apiService: ApiService) {}

  private updateCurrentBtcRate(rate: number): void {
    this.currentBtcRateSubject.next(rate);
  }

  updateCurrentBtcRateWithDataFromApi(): void {
    this.apiService.getBtcRate().subscribe((rate) => {
      this.updateCurrentBtcRate(rate);
    });
  }
}
