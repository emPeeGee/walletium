import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { selectUser } from 'src/app/store/authentication/authentication.selectors';
import { RootState } from '../../store';

import * as accountsActions from '../../store/accounts/accounts.actions';
import * as labelsActions from '../../store/labels/labels.actions';
// import * as categoryActions from '../../store/accounts/accounts.actions';

@Component({
  selector: 'wal-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit, OnDestroy {
  private currentUser: User | null = null;
  private currentUserSubscription: Subscription | null = null;

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {
    this.currentUserSubscription = this.store.select(selectUser).subscribe(user => {
      this.currentUser = user;

      this.fetchNecessaryData();
    });
  }

  ngOnDestroy(): void {
    this.currentUserSubscription?.unsubscribe();
  }

  private fetchNecessaryData(): void {
    this.store.dispatch(accountsActions.loadAllAccounts({ id: this.currentUser?.id }));
    this.store.dispatch(labelsActions.loadAllUserLabels({ userId: this.currentUser?.id ?? '' }));
  }
}
