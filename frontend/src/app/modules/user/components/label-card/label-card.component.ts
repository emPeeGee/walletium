import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { CloseType } from 'src/app/core/enums/close-type.enum';
import { OpenType } from 'src/app/core/enums/open-type.enum';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { Label, LabelDialog } from '../../models/label.model';
import { RootState } from '../../store';
import { LabelSaveModalComponent } from '../label-save-modal/label-save-modal.component';
import * as labelsActions from '../../store/labels/labels.actions';

@Component({
  selector: 'wal-label-card',
  templateUrl: './label-card.component.html',
  styleUrls: ['./label-card.component.scss']
})
export class LabelCardComponent {
  @Input() public label: Label | undefined;
  @Input() public userId = '';

  constructor(private store: Store<RootState>, private dialog: MatDialog) {}

  public onEdit(): void {
    const labelDialog: LabelDialog = { type: OpenType.EDIT, label: this.label! };
    this.dialog.open(LabelSaveModalComponent, {
      data: labelDialog
    });
  }

  public onDelete(): void {
    const confirmDialog = this.dialog.open(ConfirmModalComponent);
    confirmDialog.afterClosed().subscribe(CLOSE_FLAG => {
      if (CLOSE_FLAG === CloseType.CONFIRM) {
        this.store.dispatch(labelsActions.deleteLabel({ id: this.label?.id ?? '', userId: this.userId }));
      }
    });
  }
}
