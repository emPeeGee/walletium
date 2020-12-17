import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { RootState } from '../../store';
import { createAccount } from '../../store/accounts/accounts.actions';
import { selectCreateAccountError } from '../../store/accounts/accounts.selector';

@Component({
  selector: 'wal-account-add-modal',
  templateUrl: './account-add-modal.component.html',
  styleUrls: ['./account-add-modal.component.scss']
})
export class AccountAddModalComponent implements OnInit, OnDestroy {
  accountForm = new FormGroup({
    name: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
    currency: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required)
  });

  accountCreateErrorSubscription: Subscription | undefined;

  canExitModal = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AccountAddModalComponent>,
    private store: Store<RootState>,
    private tokenStorageService: TokenStorageService
  ) {}
  ngOnDestroy(): void {
    this.accountCreateErrorSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.accountCreateErrorSubscription = this.store.select(selectCreateAccountError).subscribe(error => {
      this.canExitModal = error ? false : true;
      console.log(this.canExitModal);
    });
  }

  createAccount(): void {
    this.store.dispatch(
      createAccount({
        account: {
          ...this.accountForm.value,
          userId: this.tokenStorageService.getUser()?._id
        }
      })
    );

    setTimeout(() => {
      this.checkToExitModal();
    }, 1000);
  }

  checkToExitModal(): void {
    if (this.canExitModal) {
      this.dialogRef.close();
    }
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
