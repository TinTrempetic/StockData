import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject, filter, Observable, switchMap } from 'rxjs';
import { FinnhubService } from 'src/app/services';
import { MarketNews } from 'src/app/types';

@Component({
  selector: 'app-company-news',
  templateUrl: './company-news.component.html',
  styleUrls: ['./company-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyNewsComponent {
  @Input() set symbol(input: string) {
    if (!input.length) return;

    this._data.next(input);
  }

  _data = new BehaviorSubject<string>(undefined);
  news$ = this._data.asObservable().pipe(
    filter((x) => !!x?.length),
    switchMap((symbol) => this.getCompanyNewsData(symbol))
  );

  constructor(private finnhubService: FinnhubService) {}

  private getCompanyNewsData(symbol: string): Observable<MarketNews[]> {
    return this.finnhubService.getCompanyNews(symbol);
  }
}
