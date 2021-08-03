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
          id: [record.id],
          type: [record.type],
          amount: [record.amount],
          updatedDate: [record.updatedDate],
          payee: [record.payee],
          note: [record.note],
          place: [record.place],
          category: [''],
          labels: ['']
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.recordSubscription?.unsubscribe();
  }
}
