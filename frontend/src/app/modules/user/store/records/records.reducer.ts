import { Action, createReducer, on } from '@ngrx/store';
import { Record } from '../../models/record.model';
import * as recordsActions from './records.actions';

export interface RecordsState {
  pending: boolean;
  message: string;
  records: Record[];
}

const initialState: RecordsState = {
  pending: false,
  message: '',
  records: []
};

const recordsReducer = createReducer(
  initialState
  // on(recordsActions.loadAllAccountRecordsFail, (state, { message }) => ({
  //   ...state,
  //   pending: false,
  //   message
  // })),

  // on(recordsActions.loadAllAccountRecords, state => ({
  //   ...state,
  //   pending: true
  // })),
  // on(recordsActions.loadAllAccountRecordsSuccess, (state, { message, records }) => ({
  //   ...state,
  //   pending: false,
  //   accountRecords: records,
  //   message
  // }))
);

export function reducer(state: RecordsState | undefined, action: Action): RecordsState {
  return recordsReducer(state, action);
}
