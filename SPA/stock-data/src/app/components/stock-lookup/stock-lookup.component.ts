import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'stock-lookup',
  templateUrl: './stock-lookup.component.html',
  styleUrls: ['./stock-lookup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockLookupComponent {
  @Input() set suggestions(input: any) {
    console.log(input);
  }

  @Output() stockLookupChanged = new EventEmitter<string>();
  @Output() stockSelected = new EventEmitter<any>();

  public getFilteredStocks(symbol: string): void {
    this.stockLookupChanged.emit(symbol);
  }

  public suggestionSelected(event: any): void {
    console.log(event);
    // this.stockSelected.emit(event);
  }
}
