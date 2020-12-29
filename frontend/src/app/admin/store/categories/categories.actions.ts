import { createAction, props } from '@ngrx/store';
import { Category } from '../../models/category.model';

export const loadAllCategories = createAction('[ADMIN PANEL -> Categories] Load all categories');
export const loadAllCategoriesSuccess = createAction(
  '[ADMIN PANEL -> Categories] Load all categories success',
  props<{ categories: Category[] }>()
);
export const loadAllCategoriesFail = createAction(
  '[ADMIN PANEL -> Categories] Load all categories fail',
  props<{ message: string }>()
);

export const loadCategory = createAction('[ADMIN PANEL -> Categories] Load category');
export const loadCategorySuccess = createAction('[ADMIN PANEL -> Categories] Load category success');
export const loadCategoryFail = createAction('[ADMIN PANEL -> Categories] Load category fail');

export const createCategory = createAction(
  '[ADMIN PANEL -> Categories] Create category',
  props<{ category: FormData }>()
);
export const createCategorySuccess = createAction(
  '[ADMIN PANEL -> Categories] Create category success',
  props<{ message: string }>()
);
export const createCategoryFail = createAction(
  '[ADMIN PANEL -> Categories] Create category fail',
  props<{ message: string }>()
);

export const editCategory = createAction('[ADMIN PANEL -> Categories] Edit category');
export const editCategorySuccess = createAction('[ADMIN PANEL -> Categories] Edit category success');
export const editCategoryFail = createAction('[ADMIN PANEL -> Categories] Edit category fail');

export const deleteCategory = createAction(
  '[ADMIN PANEL -> Categories] Delete category',
  props<{ categoryId: string }>()
);
export const deleteCategorySuccess = createAction(
  '[ADMIN PANEL -> Categories] Delete category success',
  props<{ message: string }>()
);
export const deleteCategoryFail = createAction(
  '[ADMIN PANEL -> Categories] Delete category fail',
  props<{ message: string }>()
);
