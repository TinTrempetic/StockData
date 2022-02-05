import { isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  Form,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { filter, Subject, take, tap } from 'rxjs';
import { EventType } from 'src/app/enums';
import { FinnhubService } from 'src/app/services';
import { Earnings, Ipo } from 'src/app/types';

@Component({
  selector: 'event-calendars',
  templateUrl: './event-calendars.component.html',
  styleUrls: ['./event-calendars.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventCalendarsComponent implements OnInit {
  private _earnings = new Subject<Earnings[]>();
  earningsData$ = this._earnings.asObservable();

  private _ipo = new Subject<Ipo[]>();
  ipoData$ = this._ipo.asObservable();

  form: FormGroup;

  eventTypes = [
    { value: EventType.ipo, label: 'IPO' },
    { value: EventType.earnings, label: 'Earnings' },
  ];

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
        filter(() => this.form.valid),
        tap((value) => this.getEvents(value))
      )
      .subscribe();
  }

  private buildForm(): void {
    this.form = this.fb.group(
      {
        event: [, [Validators.required]],
        fromDate: [, [Validators.required]],
        toDate: [, [Validators.required]],
      },
      { validator: this.checkIfDatesAreInRangeValidator }
    );
  }

  private getEvents(value: any): void {
    if (this.form.invalid) return;

    const { event, fromDate, toDate } = value;

    this.finnhubService
      .getCalendarEvents(event, fromDate, toDate)
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

  private checkIfDatesAreInRangeValidator(control: AbstractControl): {
    customMessage: string;
  } {
    const fromDateControl = control.get('fromDate');
    const toDateControl = control.get('toDate');

    if (fromDateControl.untouched || toDateControl.untouched) return undefined;

    const fromDate = new Date(control.get('fromDate').value);
    const toDate = new Date(control.get('toDate').value);

    if (fromDate > toDate)
      return {
        customMessage: 'From date must be before To date!',
      };

    const fromDateWithAddedDays = new Date(
      fromDate.setDate(fromDate.getDay() + 8)
    );

    if (fromDateWithAddedDays < toDate)
      return {
        customMessage:
          'There can only be 7 or less days difference between 2 selected dates.',
      };

    return undefined;
  }
}
