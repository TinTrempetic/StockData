import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject, filter, switchMap } from 'rxjs';
import { FinnhubService } from 'src/app/services';

@Component({
  selector: 'app-recommendation-trends',
  templateUrl: './recommendation-trends.component.html',
  styleUrls: ['./recommendation-trends.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendationTrendsComponent {
  @Input() set symbol(input: string) {
    if (!input.length) return;

    this._data.next(input);
  }

  _data = new BehaviorSubject<string>(undefined);
  data$ = this._data.asObservable().pipe(
    filter((x) => !!x?.length),
    switchMap((symbol) => this.finnhubService.getRecommendationTrends(symbol))
  );

  constructor(private finnhubService: FinnhubService) {}
}
