import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CloseType } from 'src/app/core/enums/close-type.enum';

@Component({
  selector: 'wal-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {
  @Input() title = 'Are you sure you want to do this?';

  constructor(private dialogRef: MatDialogRef<ConfirmModalComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(CloseType.CONFIRM);
  }

  onDeny(): void {
    this.dialogRef.close(CloseType.DENY);
  }
}
