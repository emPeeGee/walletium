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
  on(accountDetailsActions.loadAccountFail, accountDetailsActions.editAccountFail, (state, { message }) => ({
    ...state,
    pending: false,
    error: message
  })),
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
  }))
);

export function reducer(state: AccountDetailsState | undefined, action: Action) {
  return accountDetailsReducer(state, action);
}
