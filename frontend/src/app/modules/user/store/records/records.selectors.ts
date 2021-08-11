import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as moment from 'moment';

import { UserState } from '..';
import { GroupedRecords } from '../../models/record.model';

const selectUserState = createFeatureSelector<UserState>('user');
const selectUserRecordsState = createSelector(selectUserState, state => state.records);

export const selectRecords = createSelector(selectUserRecordsState, state => state.records);
export const selectRecordsPending = createSelector(selectUserRecordsState, state => state.pending);
export const selectMessage = createSelector(selectUserRecordsState, state => state.message);

export const groupedRecords = createSelector(selectUserRecordsState, state =>
  state.records.reduce((acc, record) => {
    const recordDate = moment(record.userChosenDate);
    const recordDateFormated: string = recordDate.format('D MMMM YYYY');

    if (!acc[recordDateFormated]) {
      acc[recordDateFormated] = [record];
    } else {
      acc[recordDateFormated].push(record);
    }

    return acc;
  }, {} as GroupedRecords)
);
