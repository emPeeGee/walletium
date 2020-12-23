import { Action, createReducer, on } from '@ngrx/store';

import * as accountsActions from './accounts.actions';
import { Account } from '../../models/account.model';

export interface AccountsState {
  accounts: Account[];
  pending: boolean;
  error: string;
}

const initialState: AccountsState = {
  accounts: [],
  pending: false,
  error: ''
};

const accountsReducer = createReducer(
  initialState,

  on(
    accountsActions.loadAllAccountsFail,
    accountsActions.createAccountFail,
    accountsActions.editAccountFail,
    (state, { message }) => ({
      ...state,
      pending: false,
      error: message
    })
  ),

  on(accountsActions.loadAllAccounts, state => ({
    ...state,
    pending: true
  })),
  on(accountsActions.loadAllAccountsSuccess, (state, { accounts }) => ({
    ...state,
    pending: false,
    accounts
  })),

  on(accountsActions.createAccount, state => ({
    ...state,
    pending: true
  })),
  on(accountsActions.createAccountSuccess, state => ({
    ...state,
    pending: false
  })),

  on(accountsActions.editAccount, state => ({
    ...state,
    pending: true
  })),
  on(accountsActions.editAccountSuccess, state => ({
    ...state,
    pending: false
  }))
);

export function reducer(state: AccountsState | undefined, action: Action) {
  return accountsReducer(state, action);
}
