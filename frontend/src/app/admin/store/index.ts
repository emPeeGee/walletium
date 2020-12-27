import { ActionReducerMap } from '@ngrx/store';
import { RootState as State } from 'src/app/store';
import { CategoriesEffects } from './categories/categories.effects';
import * as fromCategories from './categories/categories.reducer';

export interface AdminState {
  categoriesState: fromCategories.CategoriesState;
}

export interface RootState extends State {
  admin: AdminState;
}

export const reducers: ActionReducerMap<AdminState> = {
  categoriesState: fromCategories.reducer
};

export const effects: any[] = [CategoriesEffects];
