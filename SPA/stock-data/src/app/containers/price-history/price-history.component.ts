import { formatDate } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  Observable,
  switchMap,
} from 'rxjs';
import { CandleResolution } from 'src/app/enums';
import { FinnhubService } from 'src/app/services';
import { StockCandle } from 'src/app/types';

@Component({
  selector: 'app-price-history',
  templateUrl: './price-history.component.html',
  styleUrls: ['./price-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceHistoryComponent {
  private companySymbol: string;

  @Input() set symbol(input: string) {
    if (!input) return;

    this.companySymbol = input;

    this._symbol.next(input);
  }

  private _symbol = new BehaviorSubject<string>('');
  symbol$ = this._symbol.asObservable();

  private _resolution = new BehaviorSubject<string>(
    CandleResolution.FiveMinutes
  );
  resolution$ = this._resolution.asObservable();

  data$ = combineLatest([this.symbol$, this.resolution$]).pipe(
    map(([symbol, resolution]) => {
      return { symbol, resolution };
    }),
    filter((data) => !!data.symbol.length),
    switchMap((data) =>
      this.getCandlesData(
        data.symbol,
        data.resolution || CandleResolution.Minute
      )
    ),
    filter((data) => !!data),
    map((data) => this.buildDataForChart(data))
  );

  resolutionOptions = [
    { value: CandleResolution.FiveMinutes, label: '5 Minutes' },
    { value: CandleResolution.FifteenMinutes, label: '15 Minutes' },
    { value: CandleResolution.ThirtyMinutes, label: '30 Minutes' },
    { value: CandleResolution.Hour, label: '1 Hour' },
    { value: CandleResolution.Day, label: 'Day' },
  ];

  constructor(private finnhubService: FinnhubService) {}

  public resolutionChanged(resolution: string): void {
    this._resolution.next(resolution);
  }

  private getCandlesData(
    symbol: string,
    resolution: string
  ): Observable<StockCandle> {
    return this.finnhubService.getStockCandles(symbol, resolution);
  }

  private buildDataForChart(input: StockCandle) {
    const length = input.timestamp?.length;

    let labels: string[] = [];
    let data: number[] = [];

    // Get last 50 items from the array
    for (let index = length - 50; index < length; index++) {
      const date = new Date(input.timestamp[index] * 1000);
      const label = this.formatLabel(date);

      labels.push(label);

      data.push(input.openPrices[index]);
    }

    const datasets = this.getDataset(data);

    return { labels, datasets };
  }

  private getDataset(data: number[]) {
    return [
      {
        label: this.companySymbol,
        data,
        fill: false,
        borderColor: '#42A5F5',
        tension: 0.4,
      },
    ];
  }

  private formatLabel(input: Date): string {
    return formatDate(input, 'medium', 'en-US');
  }
}
