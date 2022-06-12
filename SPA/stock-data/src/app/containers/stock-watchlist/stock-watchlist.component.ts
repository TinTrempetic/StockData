import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, filter, map, Subject, switchMap, tap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication';
import { StockDataService } from 'src/app/services/stock-data.service.ts';

@Component({
  selector: 'stock-watchlist',
  templateUrl: './stock-watchlist.component.html',
  styleUrls: ['./stock-watchlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockWatchlistComponent {
  isAuth$ = this.authService
    .isAuthenticated()
    .pipe(tap((x) => this._getWatchlistItemsAction.next(x)));

  userData$ = this.authService.getUserData();

  _getWatchlistItemsAction = new Subject<boolean>();
  getWatchlistItemsAction$ = this._getWatchlistItemsAction.asObservable();

  watchlistItems$ = combineLatest([
    this.getWatchlistItemsAction$,
    this.userData$,
  ]).pipe(
    map(([getWatchlistItemsAction, userData]) => {
      return { userData };
    }),
    filter((data) => !!data),
    switchMap((data) => this.stockDataService.getWatchlist(data.userData.sub))
  );

  constructor(
    private authService: AuthenticationService,
    private stockDataService: StockDataService
  ) {}
}
