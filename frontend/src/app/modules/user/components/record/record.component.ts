import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { RecordsService } from 'src/app/core/services/api/records.service';
import { Record } from '../../models/record.model';

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private initialRecordForm: any | null = null;
  private recordSubscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private recordsService: RecordsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id: string = params.get('id') ?? '';

      this.recordSubscription = this.recordsService.getRecordById(id).subscribe(record => {
        this.record = record;

        this.recordForm = this.formBuilder.group({
          id: [{ value: record.id, disabled: !this.isEditable }],
          type: [{ value: record.type, disabled: !this.isEditable }],
          amount: [{ value: record.amount, disabled: !this.isEditable }],
          updatedDate: [{ value: record.updatedDate, disabled: !this.isEditable }],
          payee: [{ value: record.payee, disabled: !this.isEditable }],
          note: [{ value: record.note, disabled: !this.isEditable }],
          place: [{ value: record.place, disabled: !this.isEditable }],
          category: [{ value: '', disabled: !this.isEditable }],
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
}
