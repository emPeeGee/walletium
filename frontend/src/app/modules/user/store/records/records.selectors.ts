import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '..';

const selectUserState = createFeatureSelector<UserState>('user');
const selectUserRecordsState = createSelector(selectUserState, state => state.records);

export const selectAllAccountRecords = createSelector(selectUserRecordsState, state => state.accountRecords);
export const selectRecordsPending = createSelector(selectUserRecordsState, state => state.pending);
export const selectMessage = createSelector(selectUserRecordsState, state => state.message);
