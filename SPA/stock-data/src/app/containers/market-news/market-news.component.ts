import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { FinnhubService } from 'src/app/services';
import { MarketNews } from 'src/app/types';

@Component({
  selector: 'market-news',
  templateUrl: './market-news.component.html',
  styleUrls: ['./market-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketNewsComponent implements OnInit {
  private _news = new Subject<MarketNews[]>();
  news$ = this._news.asObservable();

  constructor(private finnhubService: FinnhubService) {}

  ngOnInit(): void {
    this.finnhubService
      .getMarketNews()
      .pipe(tap((result) => this._news.next(result)))
      .subscribe();
  }
}
