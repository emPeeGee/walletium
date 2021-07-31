import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { CategoriesService } from 'src/app/core/services/api/categories.service';
import { NofiticationService } from 'src/app/core/services/others/notification.service';
import { NestError } from 'src/app/core/models/nest-error.model';
import * as categoriesActions from './categories.actions';

@Injectable()
export class CategoriesEffects {
  constructor(
    private actions$: Actions,
    private categoriesService: CategoriesService,
    private notificationService: NofiticationService
  ) {}

  loadAllCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoriesActions.loadAllCategories),
      switchMap(() =>
        this.categoriesService.getAll().pipe(
          map(categories => categoriesActions.loadAllCategoriesSuccess({ categories })),
          catchError(({ error }: { error: NestError }) =>
            of(categoriesActions.loadAllCategoriesFail({ message: error.message }))
          )
        )
      )
    )
  );

  createCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoriesActions.createCategory),
      switchMap(action =>
        this.categoriesService.create(action.category).pipe(
          map(() => categoriesActions.createCategorySuccess({ message: 'Category created with success' })),
          catchError(({ error }: { error: NestError }) => {
            return of(categoriesActions.createCategoryFail({ message: error.message }));
          })
        )
      )
    )
  );

  deleteCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoriesActions.deleteCategory),
      switchMap(action =>
        this.categoriesService.delete(action.categoryId).pipe(
          map(() => categoriesActions.deleteCategorySuccess({ message: 'Category deleted with success' })),
          catchError(({ error }: { error: NestError }) => {
            return of(categoriesActions.deleteCategoryFail({ message: error.message }));
          })
        )
      )
    )
  );

  editCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoriesActions.editCategory),
      switchMap(action =>
        this.categoriesService.update(action.category).pipe(
          map(() => categoriesActions.editCategorySuccess({ message: 'Category edited with success' })),
          catchError(({ error }: { error: NestError }) => {
            return of(categoriesActions.editCategoryFail({ message: error.message }));
          })
        )
      )
    )
  );

  loadCategoriesWhenSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        categoriesActions.createCategorySuccess,
        categoriesActions.deleteCategorySuccess,
        categoriesActions.editCategorySuccess
      ),
      map(() => categoriesActions.loadAllCategories())
    )
  );

  failActions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          categoriesActions.loadAllCategoriesFail,
          categoriesActions.createCategoryFail,
          categoriesActions.deleteCategoryFail,
          categoriesActions.editCategoryFail
        ),
        tap(({ message }) => this.notificationService.error(message))
      ),
    { dispatch: false }
  );
}
