import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Account } from '../../models/account.model';
import { AccountSaveModalComponent } from '../account-save-modal/account-save-modal.component';

@Component({
  selector: 'wal-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss']
})
export class AccountCardComponent implements OnInit {
  @Input() account: Account | null = null;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  editAccount(type: string): void {
    this.dialog.open(AccountSaveModalComponent, {
      data: { type, account: this.account }
    });
  }
}
