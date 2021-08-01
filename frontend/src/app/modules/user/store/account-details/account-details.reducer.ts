import { Action, createReducer, on } from '@ngrx/store';
import { Account } from '../../models/account.model';
import { Record } from '../../models/record.model';
import * as accountDetailsActions from './account-details.actions';

export interface AccountDetailsState {
  account: Account | null;
  accountRecords: Record[];
  pending: boolean;
  error: string;
}

const initialState: AccountDetailsState = {
  account: null,
  accountRecords: [],
  pending: false,
  error: ''
};

const accountDetailsReducer = createReducer(
  initialState,
  on(
    accountDetailsActions.loadAccountFail,
    accountDetailsActions.loadAllAccountRecordsFail,
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
  on(accountDetailsActions.loadAllAccountRecords, state => ({
    ...state,
    pending: true
  })),
  on(accountDetailsActions.loadAllAccountRecordsSuccess, (state, { records }) => ({
    ...state,
    accountRecords: records,
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

export function reducer(state: AccountDetailsState | undefined, action: Action): AccountDetailsState {
  return accountDetailsReducer(state, action);
}
