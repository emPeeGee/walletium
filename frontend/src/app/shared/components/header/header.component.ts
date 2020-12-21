import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RootState } from 'src/app/store';
import { logout } from 'src/app/store/authentication/authentication.actions';
import { selectUser } from 'src/app/store/authentication/authentication.selectors';
import { User } from '../../models/user.model';

@Component({
  selector: 'wal-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isUserAuthenticated$!: Observable<User | null>;

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {
    this.isUserAuthenticated$ = this.store.select(selectUser);
  }

  onLogout(): void {
    this.store.dispatch(logout());
  }
}
