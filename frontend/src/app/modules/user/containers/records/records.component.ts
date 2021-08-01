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
        image:
          'https://images.unsplash.com/photo-1627773327674-309942d1552f?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
      }
    },
    {
      id: 'bbb',
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
        image:
          'https://images.unsplash.com/photo-1627773327674-309942d1552f?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
      }
    },
    {
      id: 'bbcc',
      type: RecordType.INCOME,
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
        image:
          'https://images.unsplash.com/photo-1627773327674-309942d1552f?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
      }
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
