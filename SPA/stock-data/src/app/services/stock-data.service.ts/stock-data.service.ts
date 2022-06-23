import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LazyLoadTableData, PagedResult, WatchlistItem } from 'src/app/types';
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

  public addItemToWatchlist(
    userId: string,
    symbol: string
  ): Observable<boolean> {
    const route = endpoints.addToWatchlist;

    return this.http.post<boolean>(route, {
      userId,
      symbol,
    });
  }

  public getWatchlist(
    userId: string,
    tableData: LazyLoadTableData
  ): Observable<PagedResult<WatchlistItem>> {
    const route = endpoints.getWatchlist;

    return this.http.post<PagedResult<WatchlistItem>>(route, {
      userId,
      ...tableData,
    });
  }

  public deleteItem(id: number): Observable<void> {
    const route = endpoints.removeFromWatchlist.concat(`/${id}`);

    return this.http.delete<void>(route);
  }
}
