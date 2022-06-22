import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  Subject,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication';
import { StockDataService } from 'src/app/services/stock-data.service.ts';
import { LazyLoadTableData, WatchlistItem } from 'src/app/types';

@Component({
  selector: 'stock-watchlist',
  templateUrl: './stock-watchlist.component.html',
  styleUrls: ['./stock-watchlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockWatchlistComponent implements OnInit {
  isAuth$ = this.authService.isAuthenticated();
  userData$ = this.authService.getUserData();

  private _watchlistItems = new Subject<WatchlistItem[]>();
  watchlistItems$ = this._watchlistItems.asObservable();

  private _tableData = new Subject<LazyLoadTableData>();
  tableData$ = this._tableData.asObservable();

  private _reloadDataAction = new BehaviorSubject<void>(null);
  reloadDataAction$ = this._reloadDataAction.asObservable();

  private _loading = new BehaviorSubject<boolean>(false);
  loading$ = this._loading.asObservable();

  totalRows: number;

  constructor(
    private authService: AuthenticationService,
    private stockDataService: StockDataService
  ) {}

  ngOnInit(): void {
    combineLatest([this.userData$, this.tableData$, this.reloadDataAction$])
      .pipe(
        map(([userData, tableData]) => {
          return { userData, tableData };
        }),
        filter((data) => !!data.userData && !!data.tableData),
        tap(() => this._loading.next(true)),
        switchMap((data) =>
          this.stockDataService.getWatchlist(data.userData.sub, data.tableData)
        ),
        tap((response) => {
          this.totalRows = response.totalRows;
          this._watchlistItems.next(response.results);

          this._loading.next(false);
        })
      )
      .subscribe();
  }

  public loadItems(event: any): void {
    const data = {
      page: event.first / event.rows + 1,
      pageSize: event.rows,
      sortField: 'Symbol',
      sortOrder: event.sortOrder,
    };

    this._tableData.next(data);
  }

  public getChangeColor(change: number): string {
    if (change > 0) return 'green';

    return 'red';
  }

  public deleteItem(id: number): void {
    this.stockDataService
      .deleteItem(id)
      .pipe(
        take(1),
        tap(() => this._reloadDataAction.next())
      )
      .subscribe();
  }
}
