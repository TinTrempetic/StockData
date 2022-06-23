import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication';
import { StockDataService } from 'src/app/services/stock-data.service.ts';
import { StockLookupSelectItem } from 'src/app/types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private _suggestions = new Subject<StockLookupSelectItem[]>();
  suggestions$ = this._suggestions.asObservable();

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
