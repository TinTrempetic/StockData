import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { SubscribableBase } from 'src/app/base/subscribable-base';
import { FinnhubService } from 'src/app/services';
import { StockLookupSelectItem } from 'src/app/types';

@Component({
  selector: 'stock-lookup',
  templateUrl: './stock-lookup.component.html',
  styleUrls: ['./stock-lookup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockLookupComponent extends SubscribableBase implements OnInit {
  private _clearLabelOnFocus: boolean;
  lookupText: string;

  private _suggestions = new Subject<StockLookupSelectItem[]>();
  suggestions$ = this._suggestions.asObservable();

  private _loadSuggestionsAction = new Subject<string>();
  loadSuggestionsAction$ = this._loadSuggestionsAction.asObservable().pipe(
    switchMap((symbol) => this.finnhubService.stockLookup(symbol)),
    tap((result) => this.updateSuggestions(result)),
    takeUntil(this.destroy$)
  );

  @Input() placeholder: string;

  @Input() changeRouteOnSelect: boolean;

  @Output() stockSelected = new EventEmitter<string>();

  constructor(private finnhubService: FinnhubService) {
    super();
  }

  ngOnInit(): void {
    this.loadSuggestionsAction$.subscribe();
  }

  public suggestionSelected(event: any): void {
    this._clearLabelOnFocus = true;

    this.stockSelected.emit(event.symbol);
  }

  public getStockSuggestions(symbol: string): void {
    this._loadSuggestionsAction.next(symbol);
  }

  public clearLabel(): void {
    if (!this._clearLabelOnFocus) return;

    this._clearLabelOnFocus = false;
    this.lookupText = undefined;
  }

  private updateSuggestions(suggestions: StockLookupSelectItem[]): void {
    this._suggestions.next(suggestions);
  }
}
