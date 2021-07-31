import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { RootState } from 'src/app/store';
import { logout } from 'src/app/store/authentication/authentication.actions';
import { selectUser } from 'src/app/store/authentication/authentication.selectors';
import { User } from '../../../core/models/user.model';
import { Roles } from '../../../core/enums/roles.enum';

@Component({
  selector: 'wal-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public roles = Roles;
  public isSnowEnabled = false;
  public user: User | null = null;

  private userSubscription: Subscription = new Subscription();

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {
    this.userSubscription = this.store.select(selectUser).subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  public onLogout(): void {
    this.store.dispatch(logout({ expired: false }));
  }
}
