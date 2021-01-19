import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { OpenType } from 'src/app/core/enums/open-type.enum';
import { User } from 'src/app/shared/models/user.model';
import { selectUser } from 'src/app/store/authentication/authentication.selectors';
import { Account, AccountDialog } from '../../models/account.model';
import { RootState } from '../../store';
import * as accountsActions from '../../store/accounts/accounts.actions';
import * as accountsSelectors from '../../store/accounts/accounts.selector';
import { AccountSaveModalComponent } from '../account-save-modal/account-save-modal.component';

@Component({
  selector: 'wal-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  isPending$!: Observable<boolean>;
  allAccounts$!: Observable<Account[]>;

  private currentUser: User | null = null;
  private currentUserSubscription: Subscription | null = null;

  constructor(private store: Store<RootState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.currentUserSubscription = this.store.select(selectUser).subscribe(user => {
      this.currentUser = user;
    });

    this.isPending$ = this.store.select(accountsSelectors.selectAccountsPending);
    this.allAccounts$ = this.store.select(accountsSelectors.selectAllAccounts);

    this.fetchAccounts();
  }

  addAccount(): void {
    const accountDialog: AccountDialog = { type: OpenType.ADD, account: null };
    this.dialog.open(AccountSaveModalComponent, {
      data: accountDialog
    });
  }

  fetchAccounts(): void {
    this.store.dispatch(accountsActions.loadAllAccounts({ id: this.currentUser?.id }));
  }

  ngOnDestroy(): void {
    this.currentUserSubscription?.unsubscribe();
  }
}
