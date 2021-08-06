import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Category } from 'src/app/core/models/category.model';
import { RecordsService } from 'src/app/core/services/api/records.service';
import { RootState } from 'src/app/store';
import { Account } from '../../models/account.model';
import { Record, RecordPost } from '../../models/record.model';
import { NofiticationService } from 'src/app/core/services/others/notification.service';

import * as accountsSelectors from '../../store/accounts/accounts.selector';
import * as categoriesSelectors from '../../store/categories/categories.selector';

@Component({
  selector: 'wal-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit, OnDestroy {
  public record: Record | null = null;
  public recordForm: FormGroup | null = null;
  public isPending = true;
  public isEdited = false;
  public isEditable = false;
  public isNew = false;

  public accounts$: Observable<Account[]> | null = null;
  public categories$: Observable<Category[]> | null = null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private initialRecordForm: any | null = null;
  private recordSubscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store<RootState>,
    private notificationService: NofiticationService,
    private recordsService: RecordsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.isNew = id === 'new';

      if (id && !this.isNew) {
        this.recordSubscription = this.recordsService.getRecordById(id).subscribe(record => {
          this.record = record;

          this.initializeRecordForm(record);
          this.recordForm?.valueChanges
            .pipe(
              // FIXME: Is run on every form changes, maybe to fix
              filter(() => this.isEdited === false)
            )
            .subscribe(changes => {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              this.initialRecordForm = changes;
              this.isEdited = true;
            });
        });
      } else {
        this.isEditable = true;
        this.initializeRecordForm(null);
      }

      this.accounts$ = this.store.select(accountsSelectors.selectAllAccounts);
      this.categories$ = this.store.select(categoriesSelectors.selectAllCategories);
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
    const newRecord: RecordPost = { ...this.recordForm?.value } as RecordPost;

    this.recordsService.addRecord(newRecord).subscribe({
      next: () => {
        void this.router.navigate(['records']);
      },
      error: () => {
        this.notificationService.error('Something went wrong. Please verify your inputs.');
        this.toggleEditable();
      }
    });

    this.toggleEditable();
  }

  private initializeRecordForm(record: Record | null): void {
    this.recordForm = this.formBuilder.group({
      id: [{ value: record?.id, disabled: !this.isEditable }],
      type: [{ value: record?.type, disabled: !this.isEditable }],
      amount: [{ value: record?.amount, disabled: !this.isEditable }],
      userChosenDate: [{ value: record?.updatedDate ?? new Date().toISOString(), disabled: !this.isEditable }],
      accountId: [{ value: record?.account.id, disabled: !this.isEditable }, Validators.required],
      payee: [{ value: record?.payee, disabled: !this.isEditable }],
      note: [{ value: record?.note, disabled: !this.isEditable }],
      place: [{ value: record?.place, disabled: !this.isEditable }],
      categoryId: [{ value: record?.category.id, disabled: !this.isEditable }, Validators.required],
      labels: [{ value: '', disabled: !this.isEditable }]
    });

    const accountId = this.route.snapshot.queryParamMap.get('account');
    if (accountId) {
      this.recordForm.patchValue({ accountId });
    }

    this.isPending = false;
  }
}
