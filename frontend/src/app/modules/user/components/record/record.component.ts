import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { RecordsService } from 'src/app/core/services/api/records.service';
import { RootState } from 'src/app/store';
import { Account } from '../../models/account.model';
import { Record } from '../../models/record.model';

import * as accountsSelectors from '../../store/accounts/accounts.selector';

@Component({
  selector: 'wal-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit, OnDestroy {
  public record: Record | null = null;
  public recordForm: FormGroup | null = null;
  public pending = true;

  public isEdited = false;
  public isEditable = false;

  public accounts$: Observable<Account[]> | null = null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private initialRecordForm: any | null = null;
  private recordSubscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private recordsService: RecordsService,
    private formBuilder: FormBuilder,
    private store: Store<RootState>
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id && id !== 'new') {
        console.log('here', id);

        this.recordSubscription = this.recordsService.getRecordById(id).subscribe(record => {
          this.record = record;

          this.recordForm = this.formBuilder.group({
            id: [{ value: record.id, disabled: !this.isEditable }],
            type: [{ value: record.type, disabled: !this.isEditable }],
            amount: [{ value: record.amount, disabled: !this.isEditable }],
            userChosenDate: [{ value: record.updatedDate, disabled: !this.isEditable }],
            account: [{ value: record.account.name, disabled: !this.isEditable }, Validators.required],
            payee: [{ value: record.payee, disabled: !this.isEditable }],
            note: [{ value: record.note, disabled: !this.isEditable }],
            place: [{ value: record.place, disabled: !this.isEditable }],
            category: [{ value: '', disabled: !this.isEditable }, Validators.required],
            labels: [{ value: '', disabled: !this.isEditable }]
          });

          this.recordForm.valueChanges
            .pipe(
              // FIXME: Is run on every form changes, maybe to fix
              filter(() => this.isEdited === false)
            )
            .subscribe(changes => {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              this.initialRecordForm = changes;
              this.isEdited = true;
            });

          this.pending = false;
        });
      } else {
        this.isEditable = true;
        this.recordForm = this.formBuilder.group({
          type: [{ value: '', disabled: !this.isEditable }, Validators.required],
          amount: [{ value: 0, disabled: !this.isEditable }, Validators.required],
          userChosenDate: [{ value: new Date().toISOString(), disabled: !this.isEditable }, Validators.required],
          account: [{ value: '', disabled: !this.isEditable }, Validators.required],
          payee: [{ value: '', disabled: !this.isEditable }],
          note: [{ value: '', disabled: !this.isEditable }],
          place: [{ value: '', disabled: !this.isEditable }],
          category: [{ value: '', disabled: !this.isEditable }, Validators.required],
          labels: [{ value: '', disabled: !this.isEditable }]
        });

        this.pending = false;
      }

      this.accounts$ = this.store.select(accountsSelectors.selectAllAccounts);
    });
  }

  ngOnDestroy(): void {
    this.recordSubscription?.unsubscribe();
  }

  public toggleEditable(): void {
    this.isEditable = !this.isEditable;

    if (this.isEditable) {
      this.recordForm?.enable();
    } else {
      this.recordForm?.disable();
    }
  }

  public discardChanges(): void {
    this.recordForm?.patchValue({ ...this.initialRecordForm });
    this.isEdited = false;
    this.isEditable = false;
  }

  public submitForm(): void {
    console.log('Form Submitted with value: ', this.recordForm?.value);
    this.toggleEditable();
  }
}
