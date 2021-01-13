import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '..';

const selectUserState = createFeatureSelector<UserState>('user');
const selectAccountDetailsState = createSelector(selectUserState, state => state.accountDetails);

export const selectAccount = createSelector(selectAccountDetailsState, state => state.account);
export const selectAccountPending = createSelector(selectAccountDetailsState, state => state.pending);
export const selectError = createSelector(selectAccountDetailsState, state => state.error);
