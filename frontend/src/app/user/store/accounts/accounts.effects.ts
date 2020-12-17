import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AccountsService } from 'src/app/core/services/accounts.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import * as accountsActions from './accounts.actions';

@Injectable()
export class AccountsEffects {
  constructor(
    private actions$: Actions,
    private accountsService: AccountsService,
    private snackBarService: SnackBarService
  ) {}

  loadAllAccountsByUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(accountsActions.loadAllAccounts),
      switchMap(action =>
        this.accountsService.getAllByUser(action.id).pipe(
          map(accounts => accountsActions.loadAllAccountsSuccess({ accounts: accounts.data })),
          catchError(error => {
            return of(accountsActions.loadAllAccountsFail({ error, message: 'Loading all accounts fail' }));
          })
        )
      )
    )
  );

  failActions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(accountsActions.loadAllAccountsFail),
        tap(({ message }) => this.snackBarService.showSimpleMessage(message))
      ),
    { dispatch: false }
  );
}
