import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '..';

const selectUserState = createFeatureSelector<UserState>('user');
const selectUserAccountsState = createSelector(selectUserState, state => state.userAccounts);

export const selectAccounts = createSelector(selectUserAccountsState, state => state.accounts);
export const selectAccountsPending = createSelector(selectUserAccountsState, state => state.pending);
export const selectError = createSelector(selectUserAccountsState, state => state.error);
