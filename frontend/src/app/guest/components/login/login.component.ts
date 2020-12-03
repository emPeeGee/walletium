import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthenticationService } from 'src/app/core/services/authentication.service';
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

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar,
    private store: Store<RootState>
  ) {}

  ngOnInit(): void {}

  loginUser(): void {
    const credentials: Credentials = {
      ...this.loginForm.value
    };

    this.store.dispatch(login({ payload: credentials }));

    // (data: any) => {
    //   const token = data.token;
    //   localStorage.setItem('Token', token);
    //   this.router.navigate(['/']);
    // },
    // (err: HttpErrorResponse) => {
    //   console.log(err.error);
    //   if (err.error.msg) {
    //     this.snackBar.open(err.error.msg, 'Undo');
    //   } else {
    //     this.snackBar.open('Something Went Wrong!');
    //   }
    // }
  }
}
