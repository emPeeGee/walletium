import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { AccountsService } from 'src/app/core/services/api/accounts.service';
import { NofiticationService } from 'src/app/core/services/others/notification.service';
import { NestError } from 'src/app/core/models/nest-error.model';
import * as accountsActions from './accounts.actions';
import { Account, AccountWithUser } from '../../models/account.model';

@Injectable()
export class AccountsEffects {
  constructor(
    private actions$: Actions,
    private accountsService: AccountsService,
    private notificationService: NofiticationService
  ) {}

  loadAllAccountsByUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(accountsActions.loadAllAccounts),
      switchMap(action =>
        this.accountsService.getAllByUser(action.id!).pipe(
          map(accountWithUser => {
            const accounts: Account[] = accountWithUser.map((account: AccountWithUser) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { user, ...accountWithoutUser } = account;

              return {
                ...accountWithoutUser,
                userId: account.user.id
              };
            });

            return accountsActions.loadAllAccountsSuccess({ accounts });
          }),
          catchError(({ error }: { error: NestError }) => {
            return of(accountsActions.loadAllAccountsFail({ message: error.message }));
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
          map(() =>
            accountsActions.createAccountSuccess({
              message: 'Account was created with success',
              userId: action.account.userId
            })
          ),
          catchError(({ error }: { error: NestError }) =>
            of(accountsActions.createAccountFail({ message: error.message }))
          )
        );
      })
    )
  );

  editAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(accountsActions.editAccount),
      exhaustMap(action =>
        this.accountsService.update(action.account).pipe(
          map(() =>
            accountsActions.editAccountSuccess({
              message: 'Account was updated with success',
              userId: action.account.userId
            })
          ),
          catchError(({ error }: { error: NestError }) =>
            of(accountsActions.editAccountFail({ message: error.message }))
          )
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
        tap(({ message }) => this.notificationService.error(message))
      ),
    { dispatch: false }
  );
}
