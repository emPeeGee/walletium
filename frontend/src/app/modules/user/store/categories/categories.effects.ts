import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { NestError } from 'src/app/core/models/nest-error.model';
import { CategoriesService } from 'src/app/core/services/api/categories.service';
import * as categoriesActions from './categories.actions';

@Injectable()
export class CategoriesEffects {
  constructor(private actions$: Actions, private categoriesService: CategoriesService) {}

  loadAllCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoriesActions.loadAllCategories),
      switchMap(() =>
        this.categoriesService.getAll().pipe(
          map(categories => {
            return categoriesActions.loadAllCategoriesSuccess({ categories });
          }),
          catchError(({ error }: { error: NestError }) => {
            return of(categoriesActions.loadAllCategoriesFail({ message: error.message }));
          })
        )
      )
    )
  );
}
