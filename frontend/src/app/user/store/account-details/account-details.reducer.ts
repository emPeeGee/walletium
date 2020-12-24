import { Action, createReducer, on } from '@ngrx/store';
import { Account } from '../../models/account.model';
import * as accountDetailsActions from './account-details.actions';

export interface AccountDetailsState {
  account: Account | null;
  pending: boolean;
  error: string;
}

const initialState: AccountDetailsState = {
  account: null,
  pending: false,
  error: ''
};

const accountDetailsReducer = createReducer(
  initialState,
  on(
    accountDetailsActions.loadAccountFail,
    accountDetailsActions.editAccountFail,
    accountDetailsActions.deleteAccountFail,
    (state, { message }) => ({
      ...state,
      pending: false,
      error: message
    })
  ),
  on(accountDetailsActions.loadAccount, state => ({
    ...state,
    pending: true
  })),
  on(accountDetailsActions.loadAccountSuccess, (state, { account }) => ({
    ...state,
    account,
    pending: false
  })),
  on(accountDetailsActions.editAccount, state => ({
    ...state,
    pending: true
  })),
  on(accountDetailsActions.editAccountSuccess, state => ({
    ...state,
    pending: false
  })),
  on(accountDetailsActions.deleteAccount, state => ({
    ...state,
    pending: true
  })),
  on(accountDetailsActions.deleteAccountSuccess, state => ({
    ...state,
    pending: false,
    account: null
  }))
);

export function reducer(state: AccountDetailsState | undefined, action: Action) {
  return accountDetailsReducer(state, action);
}
