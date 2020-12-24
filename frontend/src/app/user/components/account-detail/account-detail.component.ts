import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
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

  constructor(
    private store: Store<RootState>,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

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
      const userId = params.get('userId') ?? '';

      this.store.dispatch(accountDetailsActions.loadAccount({ accountId, userId }));
    });
  }

  backToPreviousPage(): void {
    const { redirect } = window.history.state;

    console.log(redirect);

    this.router.navigateByUrl(redirect || '/accounts');
  }

  editAccount(): void {
    this.dialog.open(AccountSaveModalComponent, {
      data: { type: 'edit-details', account: this.account }
    });
  }

  deleteAccount(): void {
    const confirmDialog = this.dialog.open(ConfirmModalComponent);
    confirmDialog.afterClosed().subscribe(CLOSE_FLAG => {
      if (CLOSE_FLAG === 'CONFIRM') {
        this.store.dispatch(accountDetailsActions.deleteAccount({ accountId: this.account?._id ?? '' }));
      }
    });
  }
}
