import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarketNews } from 'src/app/types';

@Component({
  selector: 'app-market-news-item',
  templateUrl: './market-news-item.component.html',
  styleUrls: ['./market-news-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketNewsItemComponent {
  @Input() item: MarketNews;
}
