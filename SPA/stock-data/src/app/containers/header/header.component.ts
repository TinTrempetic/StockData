import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { FinnhubService } from 'src/app/services';
import { AuthenticationService } from 'src/app/services/authentication';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private _suggestions = new Subject<any>();
  suggestions$ = this._suggestions.asObservable();

  isAuth$ = this.authService.isAuthenticated();

  constructor(
    private finnhubService: FinnhubService,
    private authService: AuthenticationService
  ) {}

  public getStockSuggestions(symbol: any): void {
    this.finnhubService
      .stockLookup(symbol)
      .pipe(tap((result) => this.updateSuggestions(result)))
      .subscribe();
  }

  public stockSelected(event: any): void {
    console.log('stock selected: ', event);
  }

  private updateSuggestions(suggestions: any) {
    this._suggestions.next(suggestions);
  }

  login(): void {
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
  }
}
