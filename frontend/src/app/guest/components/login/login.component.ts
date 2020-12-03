import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Credentials } from 'src/app/shared/models/credentials.model';
import { RootState } from 'src/app/store';
import { login } from 'src/app/store/authentication/authentication.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {}

  loginUser(): void {
    const credentials: Credentials = {
      ...this.loginForm.value
    };

    this.store.dispatch(login({ payload: credentials }));
  }
}
