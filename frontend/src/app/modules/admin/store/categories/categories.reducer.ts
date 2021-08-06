import { Action, createReducer, on } from '@ngrx/store';
import { Category } from '../../../../core/models/category.model';
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

  on(categoriesActions.createCategory, state => ({
    ...state,
    pending: true
  })),
  on(categoriesActions.createCategorySuccess, state => ({
    ...state,
    pending: false
  })),

  on(categoriesActions.deleteCategory, state => ({
    ...state,
    pending: true
  })),
  on(categoriesActions.deleteCategorySuccess, state => ({
    ...state,
    pending: false
  })),

  on(categoriesActions.editCategory, state => ({
    ...state,
    pending: true
  })),
  on(categoriesActions.editCategorySuccess, state => ({
    ...state,
    pending: false
  })),

  on(
    categoriesActions.loadAllCategoriesFail,
    categoriesActions.createCategoryFail,
    categoriesActions.deleteCategoryFail,
    categoriesActions.editCategoryFail,
    (state, { message }) => ({
      ...state,
      pending: false,
      message
    })
  )
);

export function reducer(state: CategoriesState | undefined, action: Action): CategoriesState {
  return categoriesReducer(state, action);
}
