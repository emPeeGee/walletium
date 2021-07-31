import { Component, OnInit } from '@angular/core';
import { Record, RecordType } from '../../models/record.model';

@Component({
  selector: 'wal-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {
  public records: Record[] = [
    {
      id: 'aaa',
      type: RecordType.EXPENSE,
      amount: 100,
      userChosenDate: new Date().toISOString(),
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
      account: {
        name: 'aaa',
        currency: 'aaa',
        color: 'aaa'
      },
      category: {
        name: 'Category',
        image: 'img'
      }
    },
    {
      id: 'aaa',
      type: RecordType.EXPENSE,
      amount: 100,
      userChosenDate: new Date().toISOString(),
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
      account: {
        name: 'aaa',
        currency: 'aaa',
        color: 'aaa'
      },
      category: {
        name: 'Category',
        image: 'img'
      }
    },
    {
      id: 'aaa',
      type: RecordType.EXPENSE,
      amount: 100,
      userChosenDate: new Date().toISOString(),
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
      account: {
        name: 'aaa',
        currency: 'aaa',
        color: 'aaa'
      },
      category: {
        name: 'Category',
        image: 'img'
      }
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
