import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '..';

const selectUserState = createFeatureSelector<UserState>('user');
const selectCategoriesState = createSelector(selectUserState, state => state.categories);

export const selectAllCategories = createSelector(selectCategoriesState, state => state.categories);
export const selectCategoriesPending = createSelector(selectCategoriesState, state => state.pending);
export const selectError = createSelector(selectCategoriesState, state => state.error);
