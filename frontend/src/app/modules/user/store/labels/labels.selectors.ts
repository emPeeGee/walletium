import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '..';

const selectUserState = createFeatureSelector<UserState>('user');
const selectUserAccountsState = createSelector(selectUserState, state => state.labels);

export const selectAllLabels = createSelector(selectUserAccountsState, state => state.labels);
export const selectLabelsPending = createSelector(selectUserAccountsState, state => state.pending);
export const selectMessage = createSelector(selectUserAccountsState, state => state.message);
