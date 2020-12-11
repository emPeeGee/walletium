import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { matchPasswords } from 'src/app/shared/utils/validators.util';
import { RootState } from 'src/app/store';
import { signup } from 'src/app/store/authentication/authentication.actions';
import { selectAuthPending } from 'src/app/store/authentication/authentication.selectors';

@Component({
  selector: 'wal-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup(
    {
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      email: new FormControl('', Validators.required),
      phone_number: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]),
      confirmPassword: new FormControl('', [Validators.required])
    },
    { validators: matchPasswords('password', 'confirmPassword') }
  );

  isPending$!: Observable<boolean | null>;

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {
    this.isPending$ = this.store.select(selectAuthPending);
  }

  createUser(): void {
    this.store.dispatch(signup({ payload: this.signupForm.value }));
  }

  get username(): AbstractControl | null {
    return this.signupForm.get('username');
  }

  get email(): AbstractControl | null {
    return this.signupForm.get('email');
  }

  get phone_number(): AbstractControl | null {
    return this.signupForm.get('phone_number');
  }

  get password(): AbstractControl | null {
    return this.signupForm.get('password');
  }

  get confirmPassword(): AbstractControl | null {
    return this.signupForm.get('confirmPassword');
  }
}
