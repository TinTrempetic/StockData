import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject, filter, switchMap } from 'rxjs';
import { FinnhubService } from 'src/app/services';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyProfileComponent {
  @Input() set symbol(input: string) {
    if (!input.length) return;

    this._data.next(input);
  }

  _data = new BehaviorSubject<string>(undefined);

  data$ = this._data.asObservable().pipe(
    filter((x) => !!x?.length),
    switchMap((symbol) => this.finnhubService.getCompanyProfile(symbol))
  );

  constructor(private finnhubService: FinnhubService) {}
}
