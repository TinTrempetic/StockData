import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { WatchlistItem } from 'src/app/types';

@Component({
  selector: 'stock-watchlist',
  templateUrl: './stock-watchlist.component.html',
  styleUrls: ['./stock-watchlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockWatchlistComponent implements OnInit {
  watchlistItems: WatchlistItem[] = [];

  constructor() {}

  ngOnInit(): void {}
}
