import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OpenType } from 'src/app/core/enums/open-type.enum';
import { Account, AccountDialog } from '../../models/account.model';
import { RootState } from '../../store';
import * as accountsSelectors from '../../store/accounts/accounts.selector';
import { AccountSaveModalComponent } from '../account-save-modal/account-save-modal.component';

@Component({
  selector: 'wal-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isPending$!: Observable<boolean>;
  allAccounts$!: Observable<Account[]>;

  constructor(private store: Store<RootState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.isPending$ = this.store.select(accountsSelectors.selectAccountsPending);
    this.allAccounts$ = this.store.select(accountsSelectors.selectAllAccounts);
  }

  addAccount(): void {
    const accountDialog: AccountDialog = { type: OpenType.ADD, account: null };
    this.dialog.open(AccountSaveModalComponent, {
      data: accountDialog
    });
  }
}
