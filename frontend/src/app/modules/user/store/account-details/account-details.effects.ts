import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { AccountsService } from 'src/app/core/services/api/accounts.service';
import { NavigationService } from 'src/app/core/services/others/navigation.service';
import { SnackBarService } from 'src/app/core/services/others/snack-bar.service';
import { NestError } from 'src/app/shared/models/nest-error.model';
import * as accountDetailsActions from './account-details.actions';

@Injectable()
export class AccountDetailsEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private navigation: NavigationService,
    private snackBarService: SnackBarService,
    private accountsService: AccountsService
  ) {}

  loadAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(accountDetailsActions.loadAccount),
      switchMap(action =>
        this.accountsService.get(action.accountId).pipe(
          map(result =>
            accountDetailsActions.loadAccountSuccess({ message: 'Account is fetched with success', account: result })
          ),
          catchError(({ error }: { error: NestError }) =>
            of(accountDetailsActions.loadAccountFail({ message: error.message }))
          )
        )
      )
    )
  );

  editAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(accountDetailsActions.editAccount),
      exhaustMap(action =>
        this.accountsService.update(action.account).pipe(
          map(() =>
            accountDetailsActions.editAccountSuccess({
              message: 'Account was edited with success',
              userId: action.account.userId,
              accountId: action.account.id
            })
          ),
          catchError(({ error }: { error: NestError }) =>
            of(accountDetailsActions.editAccountFail({ message: error.message }))
          )
        )
      )
    )
  );

  editAccountSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(accountDetailsActions.editAccountSuccess),
      map(action => accountDetailsActions.loadAccount({ userId: action.userId, accountId: action.accountId }))
    )
  );

  deleteAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(accountDetailsActions.deleteAccount),
      switchMap(action =>
        this.accountsService.delete(action.accountId).pipe(
          tap(res => console.log(res)),

          map(() => accountDetailsActions.deleteAccountSuccess({ message: 'Account was successful deleted' })),
          catchError(({ error }: { error: NestError }) =>
            of(accountDetailsActions.deleteAccountFail({ message: error.message }))
          )
        )
      )
    )
  );

  deleteAccountSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(accountDetailsActions.deleteAccountSuccess),
        tap(({ message }) => {
          this.snackBarService.showSnackBarNotification(message);
          this.navigation.back();
        })
      ),
    { dispatch: false }
  );

  failActions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(accountDetailsActions.loadAccountFail, accountDetailsActions.deleteAccountFail),
        tap(({ message }) => {
          this.snackBarService.showSnackBarNotification(message);
        })
      ),
    { dispatch: false }
  );
}