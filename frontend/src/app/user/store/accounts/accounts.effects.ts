import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, delay, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { AccountsService } from 'src/app/core/services/accounts.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { Account } from '../../models/account.model';
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
        this.accountsService.getAllByUser(action.id ?? '').pipe(
          map(accounts => {
            accounts.data = accounts.data.map((account: any) => {
              const { user, ...acc } = account;

              return {
                ...acc,
                userId: account.user
              };
            });

            return accountsActions.loadAllAccountsSuccess({ accounts: accounts.data });
          }),
          catchError(error => {
            return of(accountsActions.loadAllAccountsFail({ error, message: 'Loading all accounts fail' }));
          })
        )
      )
    )
  );

  createAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(accountsActions.createAccount),
      exhaustMap(action => {
        return this.accountsService.create(action.account).pipe(
          map(result =>
            accountsActions.createAccountSuccess({ message: result.message, userId: action.account.userId })
          ),
          catchError(error => of(accountsActions.createAccountFail({ error, message: error.error.message })))
        );
      })
    )
  );

  editAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(accountsActions.editAccount),
      exhaustMap(action =>
        this.accountsService.update(action.account).pipe(
          map(result => accountsActions.editAccountSuccess({ message: result.message, userId: action.account.userId })),
          catchError(error => of(accountsActions.editAccountFail({ message: error.error.message })))
        )
      )
    )
  );

  saveAccountSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(accountsActions.createAccountSuccess, accountsActions.editAccountSuccess),
      map(action => accountsActions.loadAllAccounts({ id: action.userId }))
    )
  );

  failActions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(accountsActions.loadAllAccountsFail, accountsActions.createAccountFail, accountsActions.editAccountFail),
        tap(({ message }) => this.snackBarService.showSimpleMessage(message))
      ),
    { dispatch: false }
  );
}