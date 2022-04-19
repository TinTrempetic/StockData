import { formatDate } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, switchMap } from 'rxjs';
import { CandleResolution } from 'src/app/enums';
import { FinnhubService } from 'src/app/services';
import { StockCandle } from 'src/app/types';

@Component({
  selector: 'app-candles',
  templateUrl: './candles.component.html',
  styleUrls: ['./candles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandlesComponent {
  private companySymbol: string;

  @Input() set symbol(input: string) {
    if (!input) return;

    this.companySymbol = input;

    this._symbol.next(input);
  }

  private _symbol = new BehaviorSubject<string>('');

  data$ = this._symbol.asObservable().pipe(
    filter((symbol) => !!symbol.length),
    switchMap((symbol) => this.getCandlesData(symbol)),
    filter((data) => !!data),
    map((data) => this.buildDataForChart(data))
  );

  resolution = CandleResolution.Minute;

  constructor(private finnhubService: FinnhubService) {}

  private getCandlesData(symbol: string): Observable<StockCandle> {
    return this.finnhubService.getStockCandles(symbol, this.resolution);
  }

  private buildDataForChart(input: StockCandle) {
    const length = input.timestamp.length;

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
    return formatDate(input, 'short', 'en-US');
  }
}
