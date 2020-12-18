import { Action, createReducer, on } from '@ngrx/store';

import * as accountsActions from './accounts.actions';
import { Account } from '../../models/account.model';

export interface AccountsState {
  accounts: Account[];
  pending: boolean;
  error: string;
  createAccountError: string;
}

const initialState: AccountsState = {
  accounts: [],
  pending: false,
  error: '',
  createAccountError: ''
};

const accountsReducer = createReducer(
  initialState,

  on(accountsActions.loadAllAccountsFail, (state, { message }) => ({
    ...state,
    error: message,
    pending: false
  })),
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
  on(accountsActions.createAccountSuccess, (state, { account }) => ({
    ...state,
    pending: false,
    createAccountError: ''
  })),
  on(accountsActions.createAccountFail, accountsActions.editAccountFails, (state, { message }) => ({
    ...state,
    pending: false,
    createAccountError: message
  })),
  on(accountsActions.editAccount, state => ({
    ...state,
    pending: true
  })),
  on(accountsActions.editAccountSuccess, state => ({
    ...state,
    pending: false,
    createAccountError: ''
  }))
);

export function reducer(state: AccountsState | undefined, action: Action) {
  return accountsReducer(state, action);
}
