import { createAction, props } from '@ngrx/store';
import { Label, SaveLabel } from '../../models/label.model';

export const loadAllUserLabels = createAction(
  '[USER -> LABELS API] Load all users labels',
  props<{ userId: string }>()
);
export const loadAllUserLabelsSuccess = createAction(
  '[USER -> LABELS API] Load all users labels success',
  props<{ message: string; labels: Label[] }>()
);
export const loadAllUserLabelsFail = createAction(
  '[USER -> LABELS API] Load all users labels fail',
  props<{ message: string }>()
);

export const loadLabel = createAction('[USER -> LABELS API] Load label', props<{ labelId: string }>());
export const loadLabelSuccess = createAction('[USER -> LABELS API] Load label success', props<{ message: string }>());
export const loadLabelFail = createAction('[USER -> LABELS API] Load label fail', props<{ message: string }>());

export const createLabel = createAction(
  '[USER -> LABELS API] Create label',
  props<{ label: SaveLabel; userId: string }>()
);
export const createLabelSuccess = createAction(
  '[USER -> LABELS API] Create label success',
  props<{ message: string; userId: string }>()
);
export const createLabelFail = createAction('[USER -> LABELS API] Create label fail', props<{ message: string }>());

export const editLabel = createAction('[USER -> LABELS API] Edit label', props<{ label: SaveLabel; userId: string }>());
export const editLabelSuccess = createAction(
  '[USER -> LABELS API] Edit label success',
  props<{ message: string; userId: string }>()
);
export const editLabelFail = createAction('[USER -> LABELS API] Edit label fail', props<{ message: string }>());

export const deleteLabel = createAction('[USER -> LABELS API] Delete label', props<{ id: string; userId: string }>());
export const deleteLabelSuccess = createAction(
  '[USER -> LABELS API] Delete label success',
  props<{ message: string; userId: string }>()
);
export const deleteLabelFail = createAction('[USER -> LABELS API] Delete label fail', props<{ message: string }>());
