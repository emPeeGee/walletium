import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { RootState } from 'src/app/store';
import { signup } from 'src/app/store/authentication/authentication.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone_number: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {}

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
}
