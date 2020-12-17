import { createAction, props } from '@ngrx/store';
import { AccountsResult, Account } from '../../models/account.model';

export const loadAllAccounts = createAction('[USER -> ACCOUNT API] Load all accounts', props<{ id: string }>());
export const loadAllAccountsSuccess = createAction(
  '[USER -> ACCOUNT API] Load all accounts success',
  props<AccountsResult>()
);
export const loadAllAccountsFail = createAction(
  '[USER -> ACCOUNT API] Load all accounts fail',
  props<{ message: string; error: Error }>()
);

export const createAccount = createAction('[USER -> ACCOUNT API] Create account', props<{ account: Account }>());
export const createAccountSuccess = createAction(
  '[USER -> ACCOUNT API] Create account succes',
  props<{ message: string; account: Account }>()
);
export const createAccountFail = createAction(
  '[USER -> ACCOUNT API] Create account fail',
  props<{ message: string; error: Error }>()
);
