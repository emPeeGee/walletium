import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { expandAnimation } from 'src/app/shared/animations/expand.animation';
import { Record } from '../../models/record.model';

@Component({
  selector: 'wal-record-card',
  templateUrl: './record-card.component.html',
  styleUrls: ['./record-card.component.scss'],
  animations: [expandAnimation]
})
export class RecordCardComponent implements OnInit {
  @Input() record: Record | null = null;

  public isExpanded = false;

  constructor() {}

  ngOnInit(): void {}

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }
}
