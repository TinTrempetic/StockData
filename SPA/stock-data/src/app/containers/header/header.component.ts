import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication';
import { StockDataService } from 'src/app/services/stock-data.service.ts';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  isAuth$ = this.authService.isAuthenticated();
  user$ = this.authService.getUserData();

  backButtonVisible$ = this.stockDataService.backButtonVisible$;

  constructor(
    private authService: AuthenticationService,
    private stockDataService: StockDataService
  ) {}

  public login(): void {
    this.authService.login();
  }

  public logout(): void {
    this.authService.logout();
  }
}
