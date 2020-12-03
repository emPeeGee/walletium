import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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
    email: new FormControl(''),
    phone_number: new FormControl(''),
    name: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {}

  createUser(): void {
    this.store.dispatch(signup({ payload: this.signupForm.value }));
  }
}
