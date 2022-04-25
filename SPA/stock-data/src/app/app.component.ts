import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { AuthenticationService } from './services/authentication';
import { StockDataService } from './services/stock-data.service.ts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  isLoading$ = this.authService.isLoading();

  constructor(
    private authService: AuthenticationService,
    private stockDataService: StockDataService
  ) {}
  ngOnInit(): void {
    this.authService
      .getUserData()
      .pipe(tap((user) => this.stockDataService.setUser(user)))
      .subscribe();
  }
}
