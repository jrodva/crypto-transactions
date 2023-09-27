import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private initialBreadcrumb: Map<string, string> = new Map<string, string>().set('full', '').set('currentLevel', '');
  private currentBreadcrumbSubject: BehaviorSubject<Map<string, string>> = new BehaviorSubject<Map<string, string>>(
    this.initialBreadcrumb
  );
  currentBreadcrumb$: Observable<Map<string, string>> = this.currentBreadcrumbSubject.asObservable();

  updateCurrentBreadcrumbSubject(breadcrumb: Map<string, string>): void {
    this.currentBreadcrumbSubject.next(breadcrumb);
  }
}
