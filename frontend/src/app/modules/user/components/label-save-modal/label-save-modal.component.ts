import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { OpenType } from 'src/app/core/enums/open-type.enum';
import { User } from 'src/app/shared/models/user.model';
import { selectUser } from 'src/app/store/authentication/authentication.selectors';
import { Label, SaveLabel, LabelDialog } from '../../models/label.model';
import { RootState } from '../../store';
import * as labelsAction from '../../store/labels/labels.actions';

@Component({
  selector: 'wal-label-save-modal',
  templateUrl: './label-save-modal.component.html',
  styleUrls: ['./label-save-modal.component.scss']
})
export class LabelSaveModalComponent implements OnInit {
  public labelForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    color: new FormControl('#ffffff', { validators: [Validators.required] })
  });

  private type: OpenType | undefined;
  private label: Label | null = null;
  private currentUser: User | null = null;

  private labelSavedSubscription: Subscription | undefined;
  private currentUserSubscription: Subscription | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: LabelDialog,
    private dialogRef: MatDialogRef<LabelSaveModalComponent>,
    private store: Store<RootState>,
    private actions$: Actions
  ) {}

  ngOnInit(): void {
    this.type = this.data.type;
    this.label = this.data.label;
    if (this.label) {
      this.labelForm.patchValue({
        name: this.label.name,
        color: this.label.color
      });
    }

    this.checkForSaveSuccess();
    this.currentUserSubscription = this.store.select(selectUser).subscribe(user => {
      this.currentUser = user;
    });
  }

  public saveLabel(): void {
    let label: SaveLabel = {
      ...(this.labelForm.value as { name: string; color: string }),
      userId: this.currentUser!.id
    };

    if (this.type === OpenType.ADD) {
      this.store.dispatch(labelsAction.createLabel({ label, userId: this.currentUser!.id }));
    } else if (this.type === OpenType.EDIT) {
      label = {
        ...label,
        id: this.label?.id
      };
      this.store.dispatch(labelsAction.editLabel({ label, userId: this.currentUser!.id }));
    }
  }

  public cancelDialog(): void {
    this.dialogRef.close();
  }

  private checkForSaveSuccess(): void {
    this.labelSavedSubscription = this.actions$
      .pipe(
        ofType(labelsAction.createLabelSuccess, labelsAction.editLabelSuccess),
        tap(() => this.dialogRef.close())
      )
      .subscribe();
  }

  get name(): AbstractControl | null {
    return this.labelForm.get('name');
  }

  get color(): AbstractControl | null {
    return this.labelForm.get('color');
  }
}
