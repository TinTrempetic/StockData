import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { filter, Observable, Subject, tap } from 'rxjs';
import { FinnhubService } from 'src/app/services';
import { StockLookupSelectItem } from 'src/app/types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private _suggestions = new Subject<any>();
  suggestions$ = this._suggestions.asObservable();

  constructor(private finnhubService: FinnhubService) {}

  public getStockSuggestions(symbol: any): void {
    this.finnhubService
      .stockLookup(symbol)
      .pipe(tap((result) => this.updateSuggestions(result)))
      .subscribe();
  }

  public stockSelected(event: any): void {
    console.log('stock selected: ', event);
  }

  private updateSuggestions(suggestions: any) {
    this._suggestions.next(suggestions);
  }
}
