import { Action, createReducer, on } from '@ngrx/store';
import { Category } from '../../models/category.model';
import * as categoriesActions from './categories.actions';

export interface CategoriesState {
  categories: Category[];
  pending: boolean;
  error: string;
}

const initialState: CategoriesState = {
  categories: [],
  pending: false,
  error: ''
};

const categoriesReducer = createReducer(
  initialState,
  on(categoriesActions.loadAllCategories, state => ({
    ...state,
    pending: true
  })),
  on(categoriesActions.loadAllCategoriesSuccess, (state, { categories }) => ({
    ...state,
    pending: false,
    categories
  })),
  on(categoriesActions.loadAllCategoriesFail, (state, { error }) => ({
    ...state,
    pending: false,
    error: error.message
  }))
);

export function reducer(state: CategoriesState | undefined, action: Action) {
  return categoriesReducer(state, action);
}
