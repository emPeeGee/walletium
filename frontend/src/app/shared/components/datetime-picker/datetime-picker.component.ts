import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./datetime-picker.component.scss']
})
export class DatetimePickerComponent implements OnInit {
  public isOpen = false;
  public calendar: Week[] = [];
  public date: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());

  ngOnInit(): void {
    this.date.subscribe(this.generate.bind(this));
  }

  public toggleDatetimePicker(): void {
    this.isOpen = !this.isOpen;
  }

  public selectDate(date: moment.Moment): void {
    const value = this.date.value.set({ date: date.date(), month: date.month() });
    this.date.next(value);
  }

  public nextMonth(): void {
    const value = this.date.value.add(1, 'month');
    this.date.next(value);
  }

  public previuosMonth(): void {
    const value = this.date.value.subtract(1, 'month');
    this.date.next(value);
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
}
