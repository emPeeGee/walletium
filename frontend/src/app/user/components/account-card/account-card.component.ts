import { Component, Input, OnInit } from '@angular/core';
import { Account } from '../../models/account.model';

@Component({
  selector: 'wal-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss']
})
export class AccountCardComponent implements OnInit {
  @Input() account: Account | null = null;

  constructor() {}

  ngOnInit(): void {}
}
