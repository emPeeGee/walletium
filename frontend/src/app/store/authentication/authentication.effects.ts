import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, tap, exhaustMap } from 'rxjs/operators';

import { AuthenticationService } from 'src/app/core/services/api/authentication.service';
import { NofiticationService } from 'src/app/core/services/others/notification.service';
import { TokenStorageService } from 'src/app/core/services/others/token-storage.service';
import { NestError } from 'src/app/shared/models/nest-error.model';
import * as authenticationActions from './authentication.actions';

@Injectable()
export class AuthenticationEffects {
  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private notificationService: NofiticationService
  ) {}

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authenticationActions.signup),
      exhaustMap(action =>
        this.authenticationService.createNewUser(action.payload).pipe(
          map(result => authenticationActions.signupSucces({ payload: result })),
          catchError(({ error }: { error: NestError }) =>
            of(authenticationActions.signupFail({ message: error.message }))
          )
        )
      )
    )
  );

  $signupSucces = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authenticationActions.signupSucces),
        tap(() => void this.router.navigate(['guest', 'login']))
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
          catchError(({ error }: { error: NestError }) =>
            of(authenticationActions.loginFail({ message: error.message }))
          )
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
          void this.router.navigate(['']);
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
        tap(action => {
          if (action.expired) {
            this.notificationService.default('Session is expired. You are logged out.');
          }
          this.tokenStorageService.logout();
          void this.router.navigate(['guest', 'login']);
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
          this.notificationService.error(message);
        })
      ),
    {
      dispatch: false
    }
  );
}
