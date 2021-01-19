import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OpenType } from 'src/app/core/enums/open-type.enum';
import { AccountDialog } from '../../models/account.model';
import { AccountSaveModalComponent } from '../account-save-modal/account-save-modal.component';

@Component({
  selector: 'wal-account-add-card',
  templateUrl: './account-add-card.component.html',
  styleUrls: ['./account-add-card.component.scss']
})
export class AccountAddCardComponent {
  constructor(private dialog: MatDialog) {}

  addAccount(): void {
    const accountDialog: AccountDialog = { type: OpenType.ADD, account: null };
    this.dialog.open(AccountSaveModalComponent, {
      data: accountDialog
    });
  }
}
