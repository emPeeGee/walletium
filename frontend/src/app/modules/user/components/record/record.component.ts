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
  public pending = true;

  public isEdited = false;
  public isEditable = false;

  public accounts$: Observable<Account[]> | null = null;
  public categories$: Observable<Category[]> | null = null;

  public isNew = false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private initialRecordForm: any | null = null;
  private recordSubscription: Subscription | null = null;

  constructor(
    private notificationService: NofiticationService,
    private route: ActivatedRoute,
    private router: Router,
    private recordsService: RecordsService,
    private formBuilder: FormBuilder,
    private store: Store<RootState>
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id && id !== 'new') {
        this.recordSubscription = this.recordsService.getRecordById(id).subscribe(record => {
          this.record = record;

          this.recordForm = this.formBuilder.group({
            id: [{ value: record.id, disabled: !this.isEditable }],
            type: [{ value: record.type, disabled: !this.isEditable }],
            amount: [{ value: record.amount, disabled: !this.isEditable }],
            userChosenDate: [{ value: record.updatedDate, disabled: !this.isEditable }],
            accountId: [{ value: record.account.id, disabled: !this.isEditable }, Validators.required],
            payee: [{ value: record.payee, disabled: !this.isEditable }],
            note: [{ value: record.note, disabled: !this.isEditable }],
            place: [{ value: record.place, disabled: !this.isEditable }],
            categoryId: [{ value: record.category.id, disabled: !this.isEditable }, Validators.required],
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
        this.isNew = true;
        this.isEditable = true;
        this.recordForm = this.formBuilder.group({
          type: [{ value: '', disabled: !this.isEditable }, Validators.required],
          amount: [{ value: 0, disabled: !this.isEditable }, Validators.required],
          userChosenDate: [{ value: new Date().toISOString(), disabled: !this.isEditable }, Validators.required],
          accountId: [{ value: '', disabled: !this.isEditable }, Validators.required],
          payee: [{ value: '', disabled: !this.isEditable }],
          note: [{ value: '', disabled: !this.isEditable }],
          place: [{ value: '', disabled: !this.isEditable }],
          categoryId: [{ value: '', disabled: !this.isEditable }, Validators.required],
          labels: [{ value: '', disabled: !this.isEditable }]
        });

        this.pending = false;
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
}
