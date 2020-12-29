import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import * as categoriesActions from './categories.actions';

@Injectable()
export class CategoriesEffects {
  constructor(
    private actions$: Actions,
    private categoriesService: CategoriesService,
    private snackBarService: SnackBarService
  ) {}

  loadAllCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoriesActions.loadAllCategories),
      switchMap(action =>
        this.categoriesService.getAll().pipe(
          map(result => categoriesActions.loadAllCategoriesSuccess({ categories: result.data })),
          catchError(error => of(categoriesActions.loadAllCategoriesFail({ message: error.error.message })))
        )
      )
    )
  );

  createCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoriesActions.createCategory),
      switchMap(action =>
        this.categoriesService.create(action.category).pipe(
          map(result => categoriesActions.createCategorySuccess({ message: result.message })),
          catchError(error => of(categoriesActions.createCategoryFail({ message: error.error.message })))
        )
      )
    )
  );

  deleteCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoriesActions.deleteCategory),
      switchMap(action =>
        this.categoriesService.delete(action.categoryId).pipe(
          map(result => categoriesActions.deleteCategorySuccess({ message: result.message })),
          catchError(error => of(categoriesActions.deleteCategoryFail({ message: error.error.message })))
        )
      )
    )
  );

  updateCategoriesWhenSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoriesActions.createCategorySuccess, categoriesActions.deleteCategorySuccess),
      map(action => categoriesActions.loadAllCategories())
    )
  );

  failActions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          categoriesActions.loadAllCategoriesFail,
          categoriesActions.createCategoryFail,
          categoriesActions.deleteCategoryFail
        ),
        tap(({ message }) => this.snackBarService.showSimpleMessage(message))
      ),
    { dispatch: false }
  );
}
