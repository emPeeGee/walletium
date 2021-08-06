import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/core/models/category.model';

export const loadAllCategories = createAction('[USER -> CATEGORIES API] Load all categories');
export const loadAllCategoriesSuccess = createAction(
  '[USER -> CATEGORIES API] Load all categories success',
  props<{ categories: Category[] }>()
);
export const loadAllCategoriesFail = createAction(
  '[USER -> CATEGORIES API] Load all categories fails',
  props<{ message: string }>()
);
