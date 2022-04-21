import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication';
import { StockDataService } from 'src/app/services/stock-data.service.ts';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  isAuth$ = this.authService.isAuthenticated();

  userData$ = this.authService.getUserData();

  constructor(
    private authService: AuthenticationService,
    private stockDataService: StockDataService
  ) {}

  ngOnInit(): void {
    this.userData$
      .pipe(tap((user) => this.stockDataService.setUser(user)))
      .subscribe();
  }
}
