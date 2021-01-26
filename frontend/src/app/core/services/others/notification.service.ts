import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NofiticationService {
  constructor(private snackBar: MatSnackBar) {}

  public default(message: string): void {
    this.show(message, {
      duration: 4000,
      panelClass: ['default-notification', 'notification']
    });
  }

  public info(message = 'Something went wrong'): void {
    this.show(message, {
      duration: 3000,
      panelClass: ['info-notification', 'notification']
    });
  }

  public success(message: string): void {
    this.show(message, {
      duration: 4000,
      panelClass: ['success-notification', 'notification']
    });
  }

  public warning(message: string): void {
    this.show(message, {
      duration: 5000,
      panelClass: ['warning-notification', 'notification']
    });
  }

  public error(message: string, duration = 4000): void {
    this.show(message, {
      duration,
      panelClass: ['error-notification', 'notification']
    });
  }

  private show(message: string, configuration: MatSnackBarConfig, action = 'Ok') {
    this.snackBar.open(message, action, configuration);
  }
}
