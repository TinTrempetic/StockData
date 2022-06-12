import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WatchlistItem } from 'src/app/types';
import { AuthenticationService } from '../authentication';
import { endpoints } from './stock-data.endpoints';

@Injectable({
  providedIn: 'root',
})
export class StockDataService {
  private _backButtonVisible = new BehaviorSubject<boolean>(false);
  backButtonVisible$ = this._backButtonVisible.asObservable();

  userId = this.authService.userId;

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient
  ) {}

  public displayBackButton(isVisible: boolean) {
    this._backButtonVisible.next(isVisible);
  }

  public getWatchlist(userId: string): Observable<WatchlistItem[]> {
    const route = endpoints.watchlist;

    return this.http.get<WatchlistItem[]>(route, {
      params: {
        userId,
      },
    });

    // return response.pipe(
    //   map((response: WatchlistItem) => {
    //     const results = response.result?.filter(
    //       (x) => !x.symbol.includes('.')
    //     );

    //     return results.map((result) => {
    //       return {
    //         label: result.description,
    //         symbol: result.symbol,
    //       } as StockLookupSelectItem;
    //     });
    //   })
    // );
  }
}
