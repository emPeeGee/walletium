import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { AccountsService } from 'src/app/core/services/accounts.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import * as accountDetailsActions from './account-details.actions';

@Injectable()
export class AccountDetailsEffects {
  constructor(
    private actions$: Actions,
    private snackBarService: SnackBarService,
    private accountsService: AccountsService
  ) {}

  loadAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(accountDetailsActions.loadAccount),
      switchMap(action =>
        this.accountsService.get(action.accountId, action.userId).pipe(
          map(result => accountDetailsActions.loadAccountSuccess({ message: result.message, account: result.data })),
          catchError(error => of(accountDetailsActions.loadAccountFail({ message: error.message })))
        )
      )
    )
  );

  editAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(accountDetailsActions.editAccount),
      exhaustMap(action =>
        this.accountsService.update(action.account).pipe(
          map(result =>
            accountDetailsActions.editAccountSuccess({
              message: result.message,
              userId: action.account.userId,
              accountId: action.account._id
            })
          ),
          catchError(error => of(accountDetailsActions.editAccountFail({ message: error.error.message })))
        )
      )
    )
  );

  editAccountSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(accountDetailsActions.editAccountSuccess),
      tap(res => console.log(res)),
      map(action => accountDetailsActions.loadAccount({ userId: action.userId, accountId: action.accountId }))
    )
  );

  failActions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(accountDetailsActions.loadAccountFail),
        tap(({ message }) => this.snackBarService.showSimpleMessage(message))
      ),
    { dispatch: false }
  );
}
