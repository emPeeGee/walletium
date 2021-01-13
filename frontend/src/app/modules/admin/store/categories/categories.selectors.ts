import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdminState } from '..';

const selectAdminState = createFeatureSelector<AdminState>('admin');
const selectCategoriesState = createSelector(selectAdminState, state => state.categoriesState);

export const selectAllCategories = createSelector(selectCategoriesState, state => state.categories);
export const selectCategoriesPending = createSelector(selectCategoriesState, state => state.pending);
export const selectError = createSelector(selectCategoriesState, state => state.error);
