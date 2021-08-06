import { Action, createReducer, on } from '@ngrx/store';
import { Category } from 'src/app/core/models/category.model';
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
    categories,
    pending: false
  })),

  on(categoriesActions.loadAllCategoriesFail, (state, { message }) => ({
    ...state,
    error: message,
    pending: false
  }))
);

export function reducer(state: CategoriesState | undefined, action: Action): CategoriesState {
  return categoriesReducer(state, action);
}
