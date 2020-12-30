import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Account } from '../../models/account.model';
import { RootState } from '../../store';
import * as accountDetailsActions from '../../store/account-details/account-details.actions';
import * as accountsActions from '../../store/accounts/accounts.actions';
import { tap } from 'rxjs/operators';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { OpenType } from 'src/app/core/enums/open-type.enum';

@Component({
  selector: 'wal-account-save-modal',
  templateUrl: './account-save-modal.component.html',
  styleUrls: ['./account-save-modal.component.scss']
})
export class AccountSaveModalComponent implements OnInit, OnDestroy {
  accountForm = new FormGroup({
    name: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
    currency: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required)
  });
  accountCreatedSubscription: Subscription | null = null;
  type: OpenType | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AccountSaveModalComponent>,
    private store: Store<RootState>,
    private tokenStorageService: TokenStorageService,
    private actions$: Actions
  ) {}

  ngOnInit(): void {
    this.type = this.data.type;
    this.checkForSaveSuccess();

    if (this.data.account) {
      this.accountForm.patchValue(this.data.account);
    }
  }

  ngOnDestroy(): void {
    this.accountCreatedSubscription?.unsubscribe();
  }

  saveAccount(): void {
    const account: Account = {
      _id: this.data?.account?._id,
      ...this.accountForm.value,
      userId: this.tokenStorageService.getUser()?._id
    };

    if (this.type === OpenType.ADD) {
      this.store.dispatch(accountsActions.createAccount({ account }));
    } else if (this.type === OpenType.EDIT) {
      this.store.dispatch(accountsActions.editAccount({ account }));
    } else if (this.type === OpenType.EDIT_DETAILS) {
      this.store.dispatch(accountDetailsActions.editAccount({ account }));
    }
  }

  cancelDialog(): void {
    this.dialogRef.close();
  }

  private checkForSaveSuccess(): void {
    this.accountCreatedSubscription = this.actions$
      .pipe(
        ofType(
          accountsActions.createAccountSuccess,
          accountsActions.editAccountSuccess,
          accountDetailsActions.editAccountSuccess
        ),
        tap(() => this.dialogRef.close())
      )
      .subscribe();
  }

  get name(): AbstractControl | null {
    return this.accountForm.get('name');
  }

  get color(): AbstractControl | null {
    return this.accountForm.get('color');
  }

  get currency(): AbstractControl | null {
    return this.accountForm.get('currency');
  }

  get amount(): AbstractControl | null {
    return this.accountForm.get('amount');
  }
}
