import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable, Subject, take } from 'rxjs';
import { CandleResolution } from 'src/app/enums';
import { FinnhubService } from 'src/app/services';

@Component({
  selector: 'app-candles',
  templateUrl: './candles.component.html',
  styleUrls: ['./candles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandlesComponent implements OnInit {
  @Input() set symbol(input: string) {
    if (!input) return;

    this.getCandlesData(input);
  }

  private _symbol = new Subject();
  symbol$ = this._symbol.asObservable();

  resolution = CandleResolution.ThirtyMinutes;

  candlesData$: Observable<any>;

  constructor(private finnhubService: FinnhubService) {}

  ngOnInit(): void {}

  private getCandlesData(symbol: string): void {
    this.candlesData$ = this.finnhubService
      .getStockCandles(symbol, this.resolution)
      .pipe(take(1))
      .subscribe();
  }
}
