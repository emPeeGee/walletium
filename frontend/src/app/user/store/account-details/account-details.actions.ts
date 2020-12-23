import { createAction, props } from '@ngrx/store';
import { Account } from '../../models/account.model';

export const loadAccount = createAction(
  '[USER -> ACCOUNT API] Load one account',
  props<{ accountId: string; userId: string }>()
);
export const loadAccountSuccess = createAction(
  '[USER -> ACCOUNT API] Load one account success',
  props<{ message: string; account: Account }>()
);

export const loadAccountFail = createAction(
  '[USER -> ACCOUNT API] Load one account fails',
  props<{ message: string }>()
);

export const editAccount = createAction(
  `[USER -> ACCOUNT API -> ACCOUNT DETAILS] Edit account`,
  props<{ account: Account }>()
);
export const editAccountSuccess = createAction(
  `[USER -> ACCOUNT API -> ACCOUNT DETAILS] Edit account success`,
  props<{ message: string; userId: string; accountId: string }>()
);
export const editAccountFail = createAction(
  `[USER -> ACCOUNT API -> ACCOUNT DETAILS] Edit account fail`,
  props<{ message: string }>()
);
