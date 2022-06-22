import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
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

  @Input() suggestions: StockLookupSelectItem[];

  @Input() placeholder: string;

  @Output() stockLookupChanged = new EventEmitter<string>();

  @Output() stockSelected = new EventEmitter<string>();

  public getFilteredStocks(symbol: string): void {
    this.stockLookupChanged.emit(symbol);
  }

  public suggestionSelected(event: any): void {
    this._clearLabelOnFocus = true;

    this.stockSelected.emit(event.symbol);
  }

  public clearLabel(): void {
    if (!this._clearLabelOnFocus) return;

    this._clearLabelOnFocus = false;
    this.lookupText = undefined;
  }
}
