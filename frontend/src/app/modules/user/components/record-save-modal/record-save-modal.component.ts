import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TokenStorageService } from 'src/app/core/services/others/token-storage.service';
import { RootState } from 'src/app/store';
import { RecordDialog } from '../../models/record.model';

@Component({
  selector: 'wal-record-save-modal',
  templateUrl: './record-save-modal.component.html',
  styleUrls: ['./record-save-modal.component.scss']
})
export class RecordSaveModalComponent implements OnInit {
  public recordForm: FormGroup = new FormGroup({});

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: RecordDialog,
    private dialogRef: MatDialogRef<RecordSaveModalComponent>,
    private store: Store<RootState>,
    private tokenStorageService: TokenStorageService,
    private actions$: Actions
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  public saveRecord(): void {}

  public cancelDialog(): void {
    this.dialogRef.close();
  }

  public log(): void {
    console.log(this.recordForm);
  }

  private initializeForm(): void {
    this.recordForm = new FormGroup({
      type: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required), 
      userChosenDate: new FormControl('', Validators.required),
      payee: new FormControl(''),
      note: new FormControl(''),
      place: new FormControl(''),
      account: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      labels: new FormControl([], Validators.required)
    });
  }
}
