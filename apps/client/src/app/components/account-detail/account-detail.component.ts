import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'crypto-transactions-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss'],
})
export class AccountDetailComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService, private route: ActivatedRoute) {}

  ngOnInit() {
    const breadcrumb = new Map<string, string>();

    breadcrumb.set('full', this.route.snapshot.data['breadcrumb']['full']);
    breadcrumb.set('currentLevel', this.route.snapshot.data['breadcrumb']['currentLevel']);
    this.breadcrumbService.updateCurrentBreadcrumbSubject(breadcrumb);
  }
}
