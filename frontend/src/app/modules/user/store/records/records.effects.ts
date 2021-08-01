import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { RecordsService } from 'src/app/core/services/api/records.service';
import { NofiticationService } from 'src/app/core/services/others/notification.service';
import { NestError } from 'src/app/core/models/nest-error.model';
import { Record } from '../../models/record.model';
import * as recordsActions from './records.actions';

@Injectable()
export class RecordsEffects {
  constructor(
    private actions$: Actions,
    private recordsService: RecordsService,
    private notificationService: NofiticationService
  ) {}

  // public loadAllAccountRecords$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(recordsActions.loadAllAccountRecords),
  //     switchMap(action =>
  //       this.recordsService.getAllByAccount(action.accountId).pipe(
  //         map((records: Record[]) =>
  //           recordsActions.loadAllAccountRecordsSuccess({
  //             message: 'All Account Records were loaded with success',
  //             records
  //           })
  //         ),
  //         catchError(({ error }: { error: NestError }) =>
  //           of(recordsActions.loadAllAccountRecordsFail({ message: error.message }))
  //         )
  //       )
  //     )
  //   )
  // );

  // failAction$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(recordsActions.loadAllAccountRecordsFail),
  //       tap(({ message }) => {
  //         this.notificationService.error(message);
  //       })
  //     ),
  //   { dispatch: false }
  // );
}
