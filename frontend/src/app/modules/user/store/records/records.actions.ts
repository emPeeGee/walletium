import { createAction, props } from '@ngrx/store';
import { Record } from '../../models/record.model';

// export const loadAllAccountRecords = createAction(
//   '[USER -> RECORDS API] Load all user account records',
//   props<{ accountId: string }>()
// );
// export const loadAllAccountRecordsSuccess = createAction(
//   '[USER -> RECORDS API] Load all user account records success',
//   props<{ message: string; records: Record[] }>()
// );
// export const loadAllAccountRecordsFail = createAction(
//   '[USER -> RECORDS API] Load all user account records fail',
//   props<{ message: string }>()
// );

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
