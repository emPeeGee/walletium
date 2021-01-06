import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OpenType } from 'src/app/core/enums/open-type.enum';
import { Account } from '../../models/account.model';
import { AccountSaveModalComponent } from '../account-save-modal/account-save-modal.component';

@Component({
  selector: 'wal-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss']
})
export class AccountCardComponent implements OnInit {
  @Input() account: Account | null = null;

  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {}

  editAccount(): void {
    this.dialog.open(AccountSaveModalComponent, {
      data: { type: OpenType.EDIT, account: this.account }
    });
  }

  selectAccount(): void {
    console.log(this.account);

    this.router.navigate(['accounts', 'details', this.account?.id, this.account?.userId]);
  }
}
