import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GroupedRecords } from '../../models/record.model';
import { RootState } from '../../store';

import * as recordsSelectors from '../../store/records/records.selectors';
import * as recordsActions from '../../store/records/records.actions';

@Component({
  selector: 'wal-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {
  public pending$!: Observable<boolean>; // FIXME: TO use
  public groupedRecords$!: Observable<GroupedRecords>;

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {
    this.pending$ = this.store.select(recordsSelectors.selectRecordsPending);
    this.groupedRecords$ = this.store.select(recordsSelectors.groupedRecords);

    this.fetchRecords();
  }

  private fetchRecords(): void {
    this.store.dispatch(recordsActions.loadUserRecords());
  }
}
