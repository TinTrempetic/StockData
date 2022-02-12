import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay, filter, Subject, take, tap } from 'rxjs';
import { EventType } from 'src/app/enums';
import { FinnhubService } from 'src/app/services';
import { Earnings, Ipo } from 'src/app/types';

@Component({
  selector: 'events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsComponent implements OnInit {
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

  get eventTypeFormValue(): string {
    return this.form.get('event')?.value;
  }

  constructor(
    private fb: FormBuilder,
    private finnhubService: FinnhubService
  ) {}

  ngOnInit(): void {
    this.buildForm();

    this.form.valueChanges
      .pipe(
        delay(100),
        filter(() => this.form.valid),
        tap((value) => this.getEvents(value))
      )
      .subscribe();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      event: [, [Validators.required]],
      date: [, [Validators.required]],
    });
  }

  private getEvents(value: any): void {
    if (this.form.invalid) return;

    const { event, date } = value;

    this.finnhubService
      .getCalendarEvents(event, date)
      .pipe(
        tap((data) => this.assignDataToTheObserver(data)),
        take(1)
      )
      .subscribe();
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
