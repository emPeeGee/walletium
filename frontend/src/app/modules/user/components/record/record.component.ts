import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Category } from 'src/app/core/models/category.model';
import { RecordsService } from 'src/app/core/services/api/records.service';
import { RootState } from 'src/app/store';
import { Account } from '../../models/account.model';
import { Record, RecordPostPut } from '../../models/record.model';
import { Label } from '../../models/label.model';
import { NofiticationService } from 'src/app/core/services/others/notification.service';

import * as accountsSelectors from '../../store/accounts/accounts.selector';
import * as categoriesSelectors from '../../store/categories/categories.selector';
import * as labelsSelectors from '../../store/labels/labels.selectors';
import { MatChip } from '@angular/material/chips';

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
  public labels$: Observable<Label[]> | null = null;

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
    this.accounts$ = this.store.select(accountsSelectors.selectAllAccounts);
    this.categories$ = this.store.select(categoriesSelectors.selectAllCategories);
    this.labels$ = this.store.select(labelsSelectors.selectAllLabels);

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
    this.toggleEditable();
    this.isEdited = false;
  }

  public submitForm(): void {
    const recordToSend: RecordPostPut = { ...this.recordForm?.value } as RecordPostPut;

    if (JSON.stringify(this.initialRecordForm) === JSON.stringify(recordToSend)) {
      this.notificationService.info('There is nothing to save.');
      return;
    }

    if (this.isNew) {
      this.recordsService.create(recordToSend).subscribe({
        next: () => {
          void this.router.navigate(['records']);
        },
        error: () => {
          this.notificationService.error('Something went wrong. Please verify your inputs.');
          this.toggleEditable();
        }
      });
    } else {
      this.recordsService.update(recordToSend).subscribe({
        next: () => {
          void this.router.navigate(['records']);
        },
        error: error => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          this.notificationService.error(error.error.message);
          this.toggleEditable();
        }
      });
    }

    this.toggleEditable();
  }
  private initializeRecordForm(record: Record | null): void {
    this.recordForm = this.formBuilder.group({
      id: [{ value: record?.id, disabled: !this.isEditable }],
      type: [{ value: record?.type, disabled: !this.isEditable }, Validators.required],
      amount: [{ value: record?.amount, disabled: !this.isEditable }, Validators.required],
      categoryId: [{ value: record?.category.id, disabled: !this.isEditable }, Validators.required],
      userChosenDate: [
        { value: record?.updatedDate ?? new Date().toISOString(), disabled: !this.isEditable },
        Validators.required
      ],
      accountId: [{ value: record?.account.id, disabled: !this.isEditable }, Validators.required],
      payee: [{ value: record?.payee, disabled: !this.isEditable }],
      note: [{ value: record?.note, disabled: !this.isEditable }],
      place: [{ value: record?.place, disabled: !this.isEditable }],
      labels: [{ value: record?.labels?.map(label => label.id) ?? [], disabled: !this.isEditable }]
    });

    const accountId = this.route.snapshot.queryParamMap.get('account');
    if (accountId) {
      this.recordForm.patchValue({ accountId });
    }

    this.isPending = false;
  }

  public toggleChip(chip: MatChip, labelId: string): void {
    if (!this.isEditable) {
      return;
    }

    chip.toggleSelected();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const currentLabels = this.labels?.value as Array<string>;

    if (currentLabels.includes(labelId)) {
      const filteredLabels = currentLabels.filter(label => label !== labelId);
      this.recordForm?.controls.labels.setValue([...filteredLabels]);
    } else {
      this.recordForm?.controls.labels.setValue([...currentLabels, labelId]);
    }
  }

  get type(): AbstractControl | null {
    return this.recordForm!.get('type');
  }

  get labels(): AbstractControl | null {
    return this.recordForm!.get('labels');
  }

  get labelsJSON(): string {
    return JSON.stringify(this.recordForm?.value);
  }
}
