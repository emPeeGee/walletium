import { createAction, props } from '@ngrx/store';
import { Category } from '../../models/category.model';

export const loadAllCategories = createAction('[ADMIN PANEL -> Categories] Load all categories');
export const loadAllCategoriesSuccess = createAction(
  '[ADMIN PANEL -> Categories] Load all categories success',
  props<{ categories: Category[] }>()
);
export const loadAllCategoriesFail = createAction(
  '[ADMIN PANEL -> Categories] Load all categories fail',
  props<{ error: Error }>()
);

export const loadCategory = createAction('[ADMIN PANEL -> Categories] Load category');
export const loadCategorySuccess = createAction('[ADMIN PANEL -> Categories] Load category success');
export const loadCategoryFail = createAction('[ADMIN PANEL -> Categories] Load category fail');

export const createCategory = createAction('[ADMIN PANEL -> Categories] Create category');
export const createCategorySuccess = createAction('[ADMIN PANEL -> Categories] Create category success');
export const createCategoryFail = createAction('[ADMIN PANEL -> Categories] Create category fail');

export const editCategory = createAction('[ADMIN PANEL -> Categories] Edit category');
export const editCategorySuccess = createAction('[ADMIN PANEL -> Categories] Edit category success');
export const editCategoryFail = createAction('[ADMIN PANEL -> Categories] Edit category fail');

export const deleteCategory = createAction('[ADMIN PANEL -> Categories] Delete category');
export const deleteCategorySuccess = createAction('[ADMIN PANEL -> Categories] Delete category success');
export const deleteCategoryFail = createAction('[ADMIN PANEL -> Categories] Delete category fail');
