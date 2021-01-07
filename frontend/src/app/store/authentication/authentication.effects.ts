import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, tap, exhaustMap } from 'rxjs/operators';

import { AuthenticationService } from 'src/app/core/services/api/authentication.service';
import { SnackBarService } from 'src/app/core/services/others/snack-bar.service';
import { TokenStorageService } from 'src/app/core/services/others/token-storage.service';
import * as authenticationActions from './authentication.actions';

@Injectable()
export class AuthenticationEffects {
  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private snackBarService: SnackBarService
  ) {}

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authenticationActions.signup),
      exhaustMap(action =>
        this.authenticationService.createNewUser(action.payload).pipe(
          map(result => authenticationActions.signupSucces({ payload: result })),
          catchError(error => of(authenticationActions.signupFail({ error, message: error.error.message })))
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
            return authenticationActions.loginSuccess({ payload: result });
          }),
          catchError(error => of(authenticationActions.loginFail({ message: error.error.message })))
        )
      )
    )
  );

  $loginSucces = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authenticationActions.loginSuccess),
        tap(({ payload }) => {
          this.tokenStorageService.setToken(payload.token);
          this.tokenStorageService.setUser(payload.user);
          this.router.navigate(['']);
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
          this.tokenStorageService.logout();
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
          this.snackBarService.showSnackBarNotification(message);
        })
      ),
    {
      dispatch: false
    }
  );
}
