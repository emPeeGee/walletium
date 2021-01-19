import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OpenType } from 'src/app/core/enums/open-type.enum';
import { Account, AccountDialog } from '../../models/account.model';
import { AccountSaveModalComponent } from '../account-save-modal/account-save-modal.component';

@Component({
  selector: 'wal-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss']
})
export class AccountCardComponent {
  @Input() account: Account | null = null;

  constructor(private dialog: MatDialog, private router: Router) {}

  editAccount(): void {
    const accountDialog: AccountDialog = { type: OpenType.EDIT, account: this.account };
    this.dialog.open(AccountSaveModalComponent, {
      data: accountDialog
    });
  }

  selectAccount(): void {
    void this.router.navigate(['accounts', 'details', this.account?.id]);
  }
}
