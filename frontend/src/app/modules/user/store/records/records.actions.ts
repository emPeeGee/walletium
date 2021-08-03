import { createAction, props } from '@ngrx/store';
import { Record } from '../../models/record.model';

export const loadUserRecords = createAction('[USER -> RECORDS API] Load all user records');
export const loadUserRecordsSuccess = createAction(
  '[USER -> RECORDS API] Load all user records success',
  props<{ message: string; records: Record[] }>()
);
export const loadUserRecordsFail = createAction(
  '[USER -> RECORDS API] Load all user records fail',
  props<{ message: string }>()
);

export const loadRecord = createAction('[USER -> RECORDS API] Load record', props<{ id: string }>());
export const loadRecordSuccess = createAction(
  '[USER -> RECORDS API] Load record success',
  props<{ message: string; record: Record }>()
);
export const loadRecordFail = createAction('[USER -> RECORDS API] Load record fail', props<{ message: string }>());

export const createRecord = createAction('[USER -> RECORDS API] Create record', props<{ record: Record }>());
export const createRecordSuccess = createAction(
  '[USER -> RECORDS API] Create record success',
  props<{ message: string }>()
);
export const createRecordFail = createAction('[USER -> RECORDS API] Create record fail', props<{ message: string }>());
