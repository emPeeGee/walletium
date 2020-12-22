import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountSaveModalComponent } from '../account-save-modal/account-save-modal.component';

@Component({
  selector: 'wal-account-add-card',
  templateUrl: './account-add-card.component.html',
  styleUrls: ['./account-add-card.component.scss']
})
export class AccountAddCardComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  addAccount(): void {
    this.dialog.open(AccountSaveModalComponent, {
      data: { type: 'add', account: null }
    });
  }
}
