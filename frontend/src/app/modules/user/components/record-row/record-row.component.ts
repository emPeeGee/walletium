import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { expandAnimation } from 'src/app/shared/animations/expand.animation';
import { Record } from '../../models/record.model';

@Component({
  selector: 'wal-record-row',
  templateUrl: './record-row.component.html',
  styleUrls: ['./record-row.component.scss'],
  animations: [expandAnimation]
})
export class RecordRowComponent implements OnInit {
  @Input() public record: Record | null = null;
  @Input() public isExpandable = true;

  public isExpanded = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  public toggleExpand(): void {
    if (this.isExpandable) {
      this.isExpanded = !this.isExpanded;
    } else {
      this.navigateToRecord();
    }
  }

  public navigateToRecord(): void {
    void this.router.navigate(['records', this.record?.id]);
  }
}
