import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication';
import { WatchlistItem } from 'src/app/types';

@Component({
  selector: 'stock-watchlist',
  templateUrl: './stock-watchlist.component.html',
  styleUrls: ['./stock-watchlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockWatchlistComponent implements OnInit {
  isAuth$ = this.authService.isAuthenticated();

  watchlistItems: WatchlistItem[] = [];

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {}
}
