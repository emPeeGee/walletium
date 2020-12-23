import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Account } from '../../models/account.model';
import { RootState } from 'src/app/store';
import { selectUser } from 'src/app/store/authentication/authentication.selectors';
import { AccountSaveModalComponent } from '../account-save-modal/account-save-modal.component';
import * as accountsSelectors from '../../store/accounts/accounts.selector';
import * as accountsActions from '../../store/accounts/accounts.actions';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'wal-accounts-layout',
  templateUrl: './accounts-layout.component.html',
  styleUrls: ['./accounts-layout.component.scss']
})
export class AccountsLayoutComponent implements OnInit, OnDestroy {
  isPending$!: Observable<boolean>;

  displayedColumns: string[] = ['name', 'currency', 'amount', 'color'];
  dataSource: MatTableDataSource<Account> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  private currentUser: any;
  private currentUserSubscription: Subscription | null = null;

  constructor(private store: Store<RootState>, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.currentUserSubscription = this.store.select(selectUser).subscribe(userData => {
      this.currentUser = userData;
    });

    this.isPending$ = this.store.select(accountsSelectors.selectAccountsPending);
    this.store.select(accountsSelectors.selectAllAccounts).subscribe(accounts => {
      this.dataSource = new MatTableDataSource(accounts);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.fetchAccounts();
  }
  ngOnDestroy(): void {
    this.currentUserSubscription?.unsubscribe();
  }

  addAccount(type: string): void {
    this.dialog.open(AccountSaveModalComponent, {
      data: { type, account: null }
    });
  }

  fetchAccounts(): void {
    this.store.dispatch(accountsActions.loadAllAccounts({ id: this.currentUser._id }));
  }

  applyFilter(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();

    if (this.dataSource?.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectAccount(account: Account): void {
    this.router.navigate(['accounts', 'details', account._id, account.userId]);
  }
}
