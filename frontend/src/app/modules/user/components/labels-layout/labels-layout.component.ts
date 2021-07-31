import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { OpenType } from 'src/app/core/enums/open-type.enum';
import { User } from 'src/app/core/models/user.model';
import { selectUser } from 'src/app/store/authentication/authentication.selectors';
import { Label, LabelDialog } from '../../models/label.model';
import { RootState } from '../../store';
import * as labelsActions from '../../store/labels/labels.actions';
import { selectAllLabels, selectLabelsPending } from '../../store/labels/labels.selectors';
import { LabelSaveModalComponent } from '../label-save-modal/label-save-modal.component';

@Component({
  selector: 'wal-labels-layout',
  templateUrl: './labels-layout.component.html',
  styleUrls: ['./labels-layout.component.scss']
})
export class LabelsLayoutComponent implements OnInit, OnDestroy {
  public isPending$!: Observable<boolean>;
  public labels$: Observable<Label[]> | null = null;

  private currentUser: User | null = null;
  private currentUserSubscription: Subscription | null = null;

  constructor(private store: Store<RootState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.currentUserSubscription = this.store.select(selectUser).subscribe(user => {
      this.currentUser = user;
    });

    this.store.dispatch(labelsActions.loadAllUserLabels({ userId: this.currentUser?.id ?? '' }));
    this.isPending$ = this.store.select(selectLabelsPending);
    this.labels$ = this.store.select(selectAllLabels);
  }

  ngOnDestroy(): void {
    this.currentUserSubscription?.unsubscribe();
  }

  addLabel(): void {
    const labelDialog: LabelDialog = { type: OpenType.ADD, label: null };
    this.dialog.open(LabelSaveModalComponent, {
      data: labelDialog
    });
  }
}
