import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CloseType } from 'src/app/core/enums/close-type.enum';
import { OpenType } from 'src/app/core/enums/open-type.enum';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { AccountDialog } from '../../models/account-dialog.model';
import { Account } from '../../models/account.model';
import { RootState } from '../../store';
import * as accountDetailsActions from '../../store/account-details/account-details.actions';
import { selectAccount, selectAccountPending } from '../../store/account-details/account-details.selectors';
import { AccountSaveModalComponent } from '../account-save-modal/account-save-modal.component';

@Component({
  selector: 'wal-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit, OnDestroy {
  isPending$!: Observable<boolean>;
  account: Account | null = null;

  accountSubscription: Subscription | null = null;

  constructor(private store: Store<RootState>, private route: ActivatedRoute, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.readRoute();
    this.isPending$ = this.store.select(selectAccountPending);
    this.accountSubscription = this.store.select(selectAccount).subscribe(account => {
      this.account = account;
    });
  }

  ngOnDestroy(): void {
    this.accountSubscription?.unsubscribe();
  }

  readRoute(): void {
    this.route.paramMap.subscribe(params => {
      const accountId = params.get('accountId') ?? '';
      this.store.dispatch(accountDetailsActions.loadAccount({ accountId }));
    });
  }

  editAccount(): void {
    const accountDialog: AccountDialog = { type: OpenType.EDIT_DETAILS, account: this.account };
    this.dialog.open(AccountSaveModalComponent, {
      data: accountDialog
    });
  }

  deleteAccount(): void {
    const confirmDialog = this.dialog.open(ConfirmModalComponent);
    confirmDialog.afterClosed().subscribe(CLOSE_FLAG => {
      if (CLOSE_FLAG === CloseType.CONFIRM) {
        this.store.dispatch(accountDetailsActions.deleteAccount({ accountId: this.account?.id ?? '' }));
      }
    });
  }
}
