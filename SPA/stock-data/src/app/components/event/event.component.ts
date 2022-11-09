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
}
