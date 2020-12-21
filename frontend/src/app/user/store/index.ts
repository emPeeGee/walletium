import { ActionReducerMap } from '@ngrx/store';
import { RootState as State } from 'src/app/store';
import { AccountsEffects } from './accounts/accounts.effects';

import * as fromAccounts from './accounts/accounts.reducer';

export interface UserState {
  userAccounts: fromAccounts.AccountsState;
}

export interface RootState extends State {
  user: UserState;
}

export const reducers: ActionReducerMap<UserState> = {
  userAccounts: fromAccounts.reducer
};

export const effects: any[] = [AccountsEffects];
