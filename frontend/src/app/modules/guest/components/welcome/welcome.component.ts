import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import { logout } from 'src/app/store/authentication/authentication.actions';

@Component({
  selector: 'wal-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  constructor(private store: Store<RootState>) {}

  logout(): void {
    this.store.dispatch(logout());
  }
}
