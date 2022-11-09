import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay, filter, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { SubscribableBase } from 'src/app/base/subscribable-base';
import { EventType } from 'src/app/enums';
import { FinnhubService } from 'src/app/services';
import { Earnings, Ipo } from 'src/app/types';

@Component({
  selector: 'events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsComponent extends SubscribableBase implements OnInit {
  ipoMinDate = this.addDaysToDate(-180);
  ipoMaxDate = this.addDaysToDate(0);
  earningsMinDate = this.addDaysToDate(-30);
  earningsMaxDate = this.addDaysToDate(30);

  form: FormGroup;

  eventTypes = [
    { value: EventType.ipo, label: 'Past IPOs' },
    { value: EventType.earnings, label: 'Earnings' },
  ];

  private _earnings = new Subject<Earnings[]>();
  earningsData$ = this._earnings.asObservable();

  private _ipo = new Subject<Ipo[]>();
  ipoData$ = this._ipo.asObservable();

  private _loadCalendarEventsAction = new Subject<any>();
  loadCalendarEventsAction$ = this._loadCalendarEventsAction
    .asObservable()
    .pipe(
      switchMap(({ event, date }) => {
        return this.finnhubService.getCalendarEvents(event, date);
      }),
      tap((data) => this.assignDataToTheObserver(data)),
      takeUntil(this.destroy$)
    );

  get eventTypeFormValue(): string {
    return this.form.get('event')?.value;
  }

  constructor(private fb: FormBuilder, private finnhubService: FinnhubService) {
    super();
  }

  ngOnInit(): void {
    this.buildForm();

    this.loadCalendarEventsAction$.subscribe();

    this.form.valueChanges
      .pipe(
        delay(100),
        filter(() => this.form.valid),
        tap((value) => this._loadCalendarEventsAction.next(value)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      event: [, [Validators.required]],
      date: [, [Validators.required]],
    });
  }

  private assignDataToTheObserver(data: any): void {
    if (this.eventTypeFormValue === EventType.ipo) this._ipo.next(data);
    if (this.eventTypeFormValue === EventType.earnings)
      this._earnings.next(data);
  }

  private addDaysToDate(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }

  public dropdownValueChanged(): void {
    this.form.get('date').reset();
  }
}
