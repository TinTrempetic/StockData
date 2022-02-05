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
  lookupText: string;

  @Input() suggestions: StockLookupSelectItem[];

  @Output() stockLookupChanged = new EventEmitter<string>();
  @Output() stockSelected = new EventEmitter<any>();

  public getFilteredStocks(symbol: string): void {
    this.stockLookupChanged.emit(symbol);
  }

  public suggestionSelected(event: any): void {
    this.lookupText = null;
    this.stockSelected.emit(event);
  }
}
