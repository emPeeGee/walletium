import { createAction, props } from '@ngrx/store';
import { Account } from '../../models/account.model';

export const loadAllAccounts = createAction(
  '[USER -> ACCOUNT API] Load all accounts',
  props<{ id: string | undefined }>()
);
export const loadAllAccountsSuccess = createAction(
  '[USER -> ACCOUNT API] Load all accounts success',
  props<{ accounts: Account[] }>()
);
export const loadAllAccountsFail = createAction(
  '[USER -> ACCOUNT API] Load all accounts fail',
  props<{ message: string }>()
);

export const createAccount = createAction('[USER -> ACCOUNT API] Create account', props<{ account: Account }>());
export const createAccountSuccess = createAction(
  '[USER -> ACCOUNT API] Create account succes',
  props<{ message: string; userId?: string }>()
);
export const createAccountFail = createAction(
  '[USER -> ACCOUNT API] Create account fail',
  props<{ message: string }>()
);

export const editAccount = createAction(`[USER -> ACCOUNT API] Edit account`, props<{ account: Account }>());
export const editAccountSuccess = createAction(
  `[USER -> ACCOUNT API] Edit account success`,
  props<{ message: string; userId?: string }>()
);
export const editAccountFail = createAction(`[USER -> ACCOUNT API] Edit account fail`, props<{ message: string }>());
