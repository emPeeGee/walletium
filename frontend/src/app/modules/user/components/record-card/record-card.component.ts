import { Component, Input, OnInit } from '@angular/core';
import { Record } from '../../models/record.model';

@Component({
  selector: 'wal-record-card',
  templateUrl: './record-card.component.html',
  styleUrls: ['./record-card.component.scss']
})
export class RecordCardComponent implements OnInit {
  @Input() record: Record | null = null;

  constructor() {}

  ngOnInit(): void {}
}
