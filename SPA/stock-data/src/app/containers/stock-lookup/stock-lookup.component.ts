import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Subject, tap } from 'rxjs';
import { FinnhubService } from 'src/app/services';
import { StockLookupSelectItem } from 'src/app/types';

@Component({
  selector: 'stock-lookup',
  templateUrl: './stock-lookup.component.html',
  styleUrls: ['./stock-lookup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockLookupComponent {
  private _clearLabelOnFocus: boolean;
  lookupText: string;

  private _suggestions = new Subject<StockLookupSelectItem[]>();
  suggestions$ = this._suggestions.asObservable();

  @Input() placeholder: string;

  @Input() changeRouteOnSelect: boolean;

  @Output() stockSelected = new EventEmitter<string>();

  constructor(private finnhubService: FinnhubService) {}

  public suggestionSelected(event: any): void {
    this._clearLabelOnFocus = true;

    this.stockSelected.emit(event.symbol);
  }

  public clearLabel(): void {
    if (!this._clearLabelOnFocus) return;

    this._clearLabelOnFocus = false;
    this.lookupText = undefined;
  }

  public getStockSuggestions(symbol: string): void {
    this.finnhubService
      .stockLookup(symbol)
      .pipe(tap((result) => this.updateSuggestions(result)))
      .subscribe();
  }

  private updateSuggestions(suggestions: StockLookupSelectItem[]): void {
    this._suggestions.next(suggestions);
  }
}
