import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  showSimpleMessage(message: string): void {
    if (message) {
      this.snackBar.open(message, 'Ok');
    } else {
      this.snackBar.open('Something Went Wrong!');
    }
  }
}
