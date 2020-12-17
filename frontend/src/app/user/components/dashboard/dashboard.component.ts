import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { selectUser } from 'src/app/store/authentication/authentication.selectors';
import { Account } from '../../models/account.model';
import { RootState, UserState } from '../../store';
import * as accountsActions from '../../store/accounts/accounts.actions';
import * as accountsSelectors from '../../store/accounts/accounts.selector';
import { AccountAddModalComponent } from '../account-add-modal/account-add-modal.component';

@Component({
  selector: 'wal-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  isPending$!: Observable<boolean>;
  allAccounts$!: Observable<Account[]>;

  private currentUser$ = this.store.select(selectUser);
  private currentUserSubscription: Subscription | null = null;

  constructor(private store: Store<RootState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.isPending$ = this.store.select(accountsSelectors.selectAccountsPending);
    this.allAccounts$ = this.store.select(accountsSelectors.selectAllAccounts);

    this.fetchAccounts();
  }

  addAccount(): void {
    const accountDialogRef = this.dialog.open(AccountAddModalComponent);
    accountDialogRef.afterClosed().subscribe(() => {
      this.currentUserSubscription?.unsubscribe();
      this.fetchAccounts();
    });
  }

  fetchAccounts(): void {
    this.currentUserSubscription = this.currentUser$.subscribe(userData => {
      if (userData) {
        this.store.dispatch(accountsActions.loadAllAccounts({ id: userData._id }));
      }
    });
  }

  ngOnDestroy(): void {
    this.currentUserSubscription?.unsubscribe();
  }
}
