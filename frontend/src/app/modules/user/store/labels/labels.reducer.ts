import { Action, createReducer, on } from '@ngrx/store';
import { Label } from '../../models/label.model';
import * as labelsActions from './labels.actions';

export interface LabelsState {
  pending: boolean;
  message: string;
  labels: Label[];
}

const initialState: LabelsState = {
  pending: false,
  message: '',
  labels: []
};

const labelsReducer = createReducer(
  initialState,
  on(
    labelsActions.loadAllUserLabelsFail,
    labelsActions.loadLabelFail,
    labelsActions.createLabelFail,
    labelsActions.editLabelFail,
    labelsActions.deleteLabelFail,
    (state, { message }) => ({
      ...state,
      pending: false,
      message
    })
  ),

  on(labelsActions.loadAllUserLabels, state => ({
    ...state,
    pending: true
  })),
  on(labelsActions.loadAllUserLabelsSuccess, (state, { message, labels }) => ({
    ...state,
    pending: false,
    message,
    labels
  })),

  on(labelsActions.loadLabel, state => ({
    ...state,
    pending: true
  })),
  on(labelsActions.loadLabelSuccess, (state, { message }) => ({
    ...state,
    pending: false,
    message
  })),

  on(labelsActions.createLabel, state => ({
    ...state,
    pending: true
  })),
  on(labelsActions.createLabelSuccess, (state, { message }) => ({
    ...state,
    pending: false,
    message
  })),

  on(labelsActions.editLabel, state => ({
    ...state,
    pending: true
  })),
  on(labelsActions.editLabelSuccess, (state, { message }) => ({
    ...state,
    pending: false,
    message
  })),

  on(labelsActions.deleteLabel, state => ({
    ...state,
    pending: true
  })),
  on(labelsActions.deleteLabelSuccess, (state, { message }) => ({
    ...state,
    pending: false,
    message
  }))
);

export function reducer(state: LabelsState | undefined, action: Action): LabelsState {
  return labelsReducer(state, action);
}
