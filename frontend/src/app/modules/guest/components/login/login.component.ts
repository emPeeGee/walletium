import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Credentials } from 'src/app/shared/models/credentials.model';
import { RootState } from 'src/app/store';
import { login } from 'src/app/store/authentication/authentication.actions';
import { selectAuthPending } from 'src/app/store/authentication/authentication.selectors';

@Component({
  selector: 'wal-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  public isPending$!: Observable<boolean | null>;

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {
    this.isPending$ = this.store.select(selectAuthPending);
  }

  public loginUser(): void {
    const credentials: Credentials = {
      ...(this.loginForm.value as Credentials)
    };

    this.store.dispatch(login({ payload: credentials }));
  }

  public get email(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  public get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }
}
