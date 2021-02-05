import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'wal-datetimepicker',
  templateUrl: './datetimepicker.component.html',
  styleUrls: ['./datetimepicker.component.scss']
})
export class DatetimepickerComponent implements OnInit {
  @Input() label = 'Date';
  @Input() value = '';
  @Output() update: EventEmitter<string> = new EventEmitter<string>();

  date: Date = new Date();
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  month: number = 0;
  year: number = 0;
  days: number[];
  result: string;
  showCalendar: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  public onShowCalendar(e: Event): void {
    e.stopPropagation();
    this.showCalendar = true;
  }

  public onCloseCalendar(e: Event): void {
    if (this.showCalendar) {
      this.showCalendar = false;
      this.update.emit(this.result);
    }

    return;
  }
}
