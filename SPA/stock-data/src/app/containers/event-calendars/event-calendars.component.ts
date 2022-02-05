import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EventType } from 'src/app/enums';

@Component({
  selector: 'event-calendars',
  templateUrl: './event-calendars.component.html',
  styleUrls: ['./event-calendars.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventCalendarsComponent implements OnInit {
  eventTypes = [
    { value: EventType.ipo, label: 'IPO' },
    { value: EventType.earnings, label: 'Earnings' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
