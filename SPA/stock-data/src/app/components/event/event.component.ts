import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Earnings, Ipo } from 'src/app/types';

@Component({
  selector: 'event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventComponent {
  @Input() ipo: Ipo;
  @Input() earning: Earnings;

  public getEarningsTime(time: string): string {
    switch (time) {
      case 'bmo':
        return 'Before market open';
      case 'amc':
        return 'After market close';
      case 'dmh':
        return 'During market hours';
      default:
        return 'Unknown';
    }
  }
}
