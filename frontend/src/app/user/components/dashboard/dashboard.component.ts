import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { selectUser } from 'src/app/store/authentication/authentication.selectors';
import { Account } from '../../models/account.model';
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

  private currentUser: any;
  private currentUserSubscription: Subscription | null = null;

  constructor(private store: Store<RootState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.currentUserSubscription = this.store.select(selectUser).subscribe(userData => {
      this.currentUser = userData;
    });

    this.isPending$ = this.store.select(accountsSelectors.selectAccountsPending);
    this.allAccounts$ = this.store.select(accountsSelectors.selectAllAccounts);

    this.fetchAccounts();
  }

  addAccount(type: string): void {
    const accountDialogRef = this.dialog.open(AccountSaveModalComponent, {
      data: { type, account: null }
    });

    accountDialogRef.afterClosed().subscribe(flag => {
      if (flag === 'success') {
        this.fetchAccounts();
      }
    });
  }

  fetchAccounts(): void {
    this.store.dispatch(accountsActions.loadAllAccounts({ id: this.currentUser._id }));
  }

  ngOnDestroy(): void {
    this.currentUserSubscription?.unsubscribe();
  }
}
