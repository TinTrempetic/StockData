import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { WatchlistItem } from 'src/app/types';

@Component({
  selector: 'app-watchlist-table',
  templateUrl: './watchlist-table.component.html',
  styleUrls: ['./watchlist-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WatchlistTableComponent {
  @Input() isAuth: boolean;

  @Input() watchlistItems: WatchlistItem[];
}
