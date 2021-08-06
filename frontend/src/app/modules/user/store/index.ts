import { ActionReducerMap } from '@ngrx/store';
import { RootState as State } from 'src/app/store';
import { AccountsEffects } from './accounts/accounts.effects';

import * as fromAccounts from './accounts/accounts.reducer';
import * as fromAccountDetails from './account-details/account-details.reducer';
import * as fromLabels from './labels/labels.reducer';
import * as fromRecords from './records/records.reducer';
import * as fromCagetories from './categories/categories.reducer';

import { AccountDetailsEffects } from './account-details/account-details.effects';
import { LabelsEffects } from './labels/labels.effects';
import { RecordsEffects } from './records/records.effects';
import { CategoriesEffects } from './categories/categories.effects';

export interface UserState {
  userAccounts: fromAccounts.AccountsState;
  accountDetails: fromAccountDetails.AccountDetailsState;
  labels: fromLabels.LabelsState;
  records: fromRecords.RecordsState;
  categories: fromCagetories.CategoriesState;
}

export interface RootState extends State {
  user: UserState;
}

export const reducers: ActionReducerMap<UserState> = {
  userAccounts: fromAccounts.reducer,
  accountDetails: fromAccountDetails.reducer,
  labels: fromLabels.reducer,
  records: fromRecords.reducer,
  categories: fromCagetories.reducer
};

export const effects = [AccountsEffects, AccountDetailsEffects, LabelsEffects, RecordsEffects, CategoriesEffects];
