import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { SubscribableBase } from 'src/app/base/subscribable-base';
import { FinnhubService } from 'src/app/services';
import { MarketNews } from 'src/app/types';

@Component({
  selector: 'market-news',
  templateUrl: './market-news.component.html',
  styleUrls: ['./market-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketNewsComponent extends SubscribableBase implements OnInit {
  private _news = new Subject<MarketNews[]>();
  news$ = this._news.asObservable();

  private _loadNewsAction = new Subject<void>();
  loadNewsAction$ = this._loadNewsAction.asObservable().pipe(
    switchMap(() => this.finnhubService.getMarketNews()),
    tap((response) => this._news.next(response)),
    takeUntil(this.destroy$)
  );

  constructor(private finnhubService: FinnhubService) {
    super();
  }

  ngOnInit(): void {
    this.loadNewsAction$.subscribe();
    this._loadNewsAction.next();
  }
}
