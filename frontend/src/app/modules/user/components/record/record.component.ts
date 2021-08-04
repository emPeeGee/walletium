import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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

  public isEditable = false;

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
          category: [''],
          labels: ['']
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
}
