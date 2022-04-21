import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { User } from '@auth0/auth0-angular';
import { StockDataService } from 'src/app/services/stock-data.service.ts';
import { WatchlistItem } from 'src/app/types';

@Component({
  selector: 'stock-watchlist',
  templateUrl: './stock-watchlist.component.html',
  styleUrls: ['./stock-watchlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockWatchlistComponent implements OnInit {
  @Input() isAuth: boolean;
  @Input() user: User;

  watchlistItems: WatchlistItem[] = [];

  constructor(private stockDataService: StockDataService) {}

  ngOnInit(): void {
    this.stockDataService.getWatchlistItems().subscribe();
  }
}
