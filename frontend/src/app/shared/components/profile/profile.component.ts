import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RootState } from 'src/app/store';
import { selectUser } from 'src/app/store/authentication/authentication.selectors';
import { User } from '../../models/user.model';

@Component({
  selector: 'wal-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user$: Observable<User | null> | null = null;

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {
    this.user$ = this.store.select(selectUser);
  }
}
