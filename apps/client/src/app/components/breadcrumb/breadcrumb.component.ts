import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'crypto-transactions-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  currentBreadcrumb$ = this.breadcrumbService.currentBreadcrumb$;

  constructor(private route: ActivatedRoute, private breadcrumbService: BreadcrumbService) {}
}
