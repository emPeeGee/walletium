/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';

interface Day {
  value: moment.Moment;
  active: boolean;
  disabled: boolean;
  selected: boolean;
}

interface Week {
  days: Day[];
}

@Component({
  selector: 'wal-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DatetimePickerComponent
    }
  ]
})
export class DatetimePickerComponent implements OnInit, ControlValueAccessor {
  @Input() initialDate: string | null = null;

  // FORM API
  public touched = false;
  public disabled = false;

  public isOpen = false;
  public isDateSelected = false;
  public calendar: Week[] = [];
  public date: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());

  ngOnInit(): void {
    this.date.subscribe(this.generate.bind(this));

    this.date.next(moment(this.initialDate ?? undefined));
  }

  public toggleDatetimePicker(): void {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
    }
  }

  public selectDate(date: moment.Moment): void {
    if (!this.disabled) {
      const value = this.date.value.set({ date: date.date(), month: date.month() });
      this.date.next(value);
      this.onChange(value);
      this.isDateSelected = true;
    }
  }

  public nextMonth(): void {
    if (!this.disabled) {
      const value = this.date.value.add(1, 'month');
      this.date.next(value);
      this.onChange(value);
    }
  }

  public previuosMonth(): void {
    if (!this.disabled) {
      const value = this.date.value.subtract(1, 'month');
      this.date.next(value);
      this.onChange(value);
    }
  }

  public nextTime(unit: number, timeUnit: 'hour' | 'minute'): void {
    if (!this.disabled) {
      const value = this.date.value.add(unit, timeUnit);
      this.date.next(value);
      this.onChange(value);
    }
  }

  public selectTime(): void {
    this.isOpen = !this.isOpen;
  }

  public backToDatepicker(): void {
    this.isDateSelected = false;
  }

  private generate(now: moment.Moment): void {
    const startDay = now.clone().startOf('month').startOf('week').isoWeekday(1);
    const endDay = now.clone().endOf('month').endOf('week').isoWeekday(1);

    const date = startDay.clone().subtract(1, 'day');

    const calendar = [];

    while (date.isBefore(endDay, 'day')) {
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            const value = date.add(1, 'day').clone();
            const active = moment().isSame(value, 'date');
            const disabled = !now.isSame(value, 'month');
            const selected = now.isSame(value, 'date');

            return { value, active, disabled, selected };
          })
      });
    }

    this.calendar = calendar;
  }

  // FORM API
  private onChange = (date: moment.Moment): void => {};
  private onTouched = (): void => {};

  public writeValue(date: string): void {
    console.log(date);

    this.date.next(moment(date));
  }

  public registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  public registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  public markAsTouched(): void {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }
}
