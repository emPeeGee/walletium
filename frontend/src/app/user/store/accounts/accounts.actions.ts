import { createAction, props } from '@ngrx/store';
import { AccountsResult } from '../../models/account.model';

export const loadAllAccounts = createAction('[USER -> ACCOUNT API] Load all accounts', props<{ id: string }>());
export const loadAllAccountsSuccess = createAction(
  '[USER -> ACCOUNT API] Load all accounts success',
  props<AccountsResult>()
);
export const loadAllAccountsFail = createAction(
  '[USER -> ACCOUNT API] Load all accounts fail',
  props<{ message: string; error: Error }>()
);
