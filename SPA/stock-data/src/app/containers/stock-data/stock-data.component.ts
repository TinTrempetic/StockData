import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, filter, takeUntil, tap } from 'rxjs';
import { SubscribableBase } from 'src/app/base/subscribable-base';
import { StockDataService } from 'src/app/services/stock-data';

@Component({
  selector: 'app-stock-data',
  templateUrl: './stock-data.component.html',
  styleUrls: ['./stock-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockDataComponent
  extends SubscribableBase
  implements OnInit, OnDestroy
{
  private _symbol = new BehaviorSubject(undefined);
  symbol$ = this._symbol.asObservable();

  constructor(
    private route: ActivatedRoute,
    private stockDataService: StockDataService
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        filter((x) => !!x['symbol']),
        tap((data) => {
          this._symbol.next(data['symbol']);
          this.stockDataService.displayBackButton(true);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  override ngOnDestroy(): void {
    this.destroy$.next();
    this.stockDataService.displayBackButton(false);
  }
}
