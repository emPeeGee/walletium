import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { of } from 'rxjs';
import { map, catchError, tap, exhaustMap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { AuthenticationService } from 'src/app/core/services/authentication.service';
import * as authenticationActions from './authentication.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthenticationEffects {
  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authenticationActions.signup),
      exhaustMap(action =>
        this.authenticationService.createNewUser(action.payload).pipe(
          map(result => authenticationActions.signupSucces({ payload: result })),
          catchError(error => of(authenticationActions.signupFail({ error, message: 'An error occured on signup' })))
        )
      )
    )
  );

  $signupSucces = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authenticationActions.signupSucces),
        tap(action => this.router.navigate(['guest', 'login']))
      ),
    { dispatch: false }
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authenticationActions.login),
      exhaustMap(action =>
        this.authenticationService.userLogin(action.payload).pipe(
          map(result => {
            console.log(result);
            return authenticationActions.loginSuccess({ payload: result });
          }),
          catchError(error => of(authenticationActions.loginFail({ message: 'An error occured on login' })))
        )
      )
    )
  );

  $loginSucces = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authenticationActions.loginSuccess),
        tap(({ payload }) => {
          localStorage.setItem('user', JSON.stringify(payload.user));
          localStorage.setItem('token', JSON.stringify(payload.token));
          this.router.navigate(['guest']);
        })
      ),
    {
      dispatch: false
    }
  );

  $logout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authenticationActions.logout),
        tap(() => {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          this.router.navigate(['guest', 'login']);
        })
      ),
    {
      dispatch: false
    }
  );

  failActions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authenticationActions.signupFail, authenticationActions.loginFail),
        tap(({ message }) => {
          if (message) {
            this.snackBar.open(message, 'Ok');
          } else {
            this.snackBar.open('Something Went Wrong!');
          }
        })
      ),
    {
      dispatch: false
    }
  );
}
