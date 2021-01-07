import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  showSnackBarNotification(message: string): void {
    this.snackBar.open(message ?? 'Something Went Wrong!', 'Ok');
  }
}
