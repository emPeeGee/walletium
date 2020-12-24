import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'wal-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  @Input() title = 'Are you sure you want to do this?';

  constructor(private dialogRef: MatDialogRef<ConfirmModalComponent>) {}

  ngOnInit(): void {}

  onConfirm(): void {
    this.dialogRef.close('CONFIRM');
  }

  onDeny(): void {
    this.dialogRef.close('DENY');
  }
}
