import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, filter, tap } from 'rxjs';
import { StockDataService } from 'src/app/services/stock-data.service.ts';

@Component({
  selector: 'app-stock-data',
  templateUrl: './stock-data.component.html',
  styleUrls: ['./stock-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockDataComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private stockDataService: StockDataService
  ) {}

  private _symbol = new BehaviorSubject(undefined);
  symbol$ = this._symbol.asObservable();

  ngOnInit(): void {
    this.route.params
      .pipe(
        filter((x) => !!x['symbol']),
        tap((data) => {
          this._symbol.next(data['symbol']);
          this.stockDataService.displayBackButton(true);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.stockDataService.displayBackButton(false);
  }
}
