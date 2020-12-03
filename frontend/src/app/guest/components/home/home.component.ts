import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { RootState } from 'src/app/store';
import { logout } from 'src/app/store/authentication/authentication.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {}

  logout(): void {
    this.store.dispatch(logout());
  }
}
