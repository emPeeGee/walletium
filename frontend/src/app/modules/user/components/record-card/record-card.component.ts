import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { expandAnimation } from 'src/app/shared/animations/expand.animation';
import { Record } from '../../models/record.model';

@Component({
  selector: 'wal-record-card',
  templateUrl: './record-card.component.html',
  styleUrls: ['./record-card.component.scss'],
  animations: [expandAnimation]
})
export class RecordCardComponent implements OnInit {
  @Input() public record: Record | null = null;
  @Input() public isExpandable = true;

  public isExpanded = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  toggleExpand(): void {
    if (this.isExpandable) {
      this.isExpanded = !this.isExpanded;
    } else {
      void this.router.navigate(['records', this.record?.id]);
    }
  }
}
