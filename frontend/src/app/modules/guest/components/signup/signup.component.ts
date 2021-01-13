import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RootState } from 'src/app/store';
import { matchPasswords } from 'src/app/shared/utils/validators.util';
import { signup } from 'src/app/store/authentication/authentication.actions';
import { selectAuthPending } from 'src/app/store/authentication/authentication.selectors';
import { Signup } from 'src/app/shared/models/signup.model';

@Component({
  selector: 'wal-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup(
    {
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]),
      confirmPassword: new FormControl('', Validators.required)
    },
    { validators: matchPasswords('password', 'confirmPassword') }
  );

  isPending$!: Observable<boolean | null>;

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {
    this.isPending$ = this.store.select(selectAuthPending);
  }

  createUser(): void {
    this.store.dispatch(signup({ payload: this.signupForm.value as Signup }));
  }

  get username(): AbstractControl | null {
    return this.signupForm.get('username');
  }

  get email(): AbstractControl | null {
    return this.signupForm.get('email');
  }

  get phoneNumber(): AbstractControl | null {
    return this.signupForm.get('phoneNumber');
  }

  get password(): AbstractControl | null {
    return this.signupForm.get('password');
  }

  get confirmPassword(): AbstractControl | null {
    return this.signupForm.get('confirmPassword');
  }
}
