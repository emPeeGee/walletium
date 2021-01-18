import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, map, tap } from 'rxjs/operators';
import { LabelsService } from 'src/app/core/services/api/labels.service';
import { SnackBarService } from 'src/app/core/services/others/snack-bar.service';
import { NestError } from 'src/app/shared/models/nest-error.model';
import { Label } from '../../models/label.model';
import * as labelsActions from './labels.actions';

@Injectable()
export class LabelsEffects {
  constructor(
    private actions$: Actions,
    private labelsService: LabelsService,
    private snackBarService: SnackBarService
  ) {}

  loadAllLabelsByUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(labelsActions.loadAllUserLabels),
      switchMap(action =>
        this.labelsService.getAllByUser(action.userId).pipe(
          map((labels: Label[]) =>
            labelsActions.loadAllUserLabelsSuccess({ message: 'Labels are loaded with success', labels })
          ),
          catchError(({ error }: { error: NestError }) =>
            of(labelsActions.loadAllUserLabelsFail({ message: error.message }))
          )
        )
      )
    )
  );

  failAction$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          labelsActions.loadAllUserLabelsFail,
          labelsActions.loadLabelFail,
          labelsActions.createLabelFail,
          labelsActions.editLabelFail,
          labelsActions.deleteLabelFail
        ),
        tap(({ message }) => {
          this.snackBarService.showSnackBarNotification(message);
        })
      ),
    { dispatch: false }
  );
}
