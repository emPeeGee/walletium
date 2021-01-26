import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, map, tap, exhaustMap } from 'rxjs/operators';
import { LabelsService } from 'src/app/core/services/api/labels.service';
import { NofiticationService } from 'src/app/core/services/others/notification.service';
import { NestError } from 'src/app/shared/models/nest-error.model';
import { Label } from '../../models/label.model';
import * as labelsActions from './labels.actions';

@Injectable()
export class LabelsEffects {
  constructor(
    private actions$: Actions,
    private labelsService: LabelsService,
    private notificationService: NofiticationService
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

  createLabel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(labelsActions.createLabel),
      exhaustMap(action =>
        this.labelsService.create(action.label).pipe(
          map(() => labelsActions.createLabelSuccess({ message: 'Label created with success', userId: action.userId })),
          catchError(({ error }: { error: NestError }) =>
            of(labelsActions.loadAllUserLabelsFail({ message: error.message }))
          )
        )
      )
    )
  );

  editLabel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(labelsActions.editLabel),
      exhaustMap(action =>
        this.labelsService.update(action.label).pipe(
          map(() => labelsActions.editLabelSuccess({ message: 'Label updated with success', userId: action.userId })),
          catchError(({ error }: { error: NestError }) =>
            of(labelsActions.loadAllUserLabelsFail({ message: error.message }))
          )
        )
      )
    )
  );

  deleteLabel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(labelsActions.deleteLabel),
      switchMap(action =>
        this.labelsService.delete(action.id).pipe(
          map(() =>
            labelsActions.deleteLabelSuccess({ message: 'Label was successful deleted', userId: action.userId })
          ),
          catchError(({ error }: { error: NestError }) => of(labelsActions.deleteLabelFail({ message: error.message })))
        )
      )
    )
  );

  saveLabelSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(labelsActions.createLabelSuccess, labelsActions.editLabelSuccess, labelsActions.deleteLabelSuccess),
      tap(({ message }) => {
        this.notificationService.success(message);
      }),
      map(action => labelsActions.loadAllUserLabels({ userId: action.userId }))
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
          this.notificationService.error(message);
        })
      ),
    { dispatch: false }
  );
}
