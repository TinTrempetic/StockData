import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { FinnhubService } from 'src/app/services';
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
    private finnhubService: FinnhubService,
    private authService: AuthenticationService,
    private stockDataService: StockDataService
  ) {}

  public getStockSuggestions(symbol: string): void {
    this.finnhubService
      .stockLookup(symbol)
      .pipe(tap((result) => this.updateSuggestions(result)))
      .subscribe();
  }

  private updateSuggestions(suggestions: StockLookupSelectItem[]): void {
    this._suggestions.next(suggestions);
  }

  public login(): void {
    this.authService.login();
  }

  public logout(): void {
    this.authService.logout();
  }

  public addStockToWatchlist(symbol: string) {
    this.stockDataService.addWatchlistItem(symbol).subscribe();
  }
}
