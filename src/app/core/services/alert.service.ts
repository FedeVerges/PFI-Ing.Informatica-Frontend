import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarRef,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';

const horizontalPosition: MatSnackBarHorizontalPosition = 'end';
const verticalPosition: MatSnackBarVerticalPosition = 'top';
const duration = 1500;
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private DEFAULT_CONFIG: MatSnackBarConfig = {
    duration: duration,
    horizontalPosition: horizontalPosition,
    verticalPosition: verticalPosition,
    panelClass: ['green-snackbar']
  };

  constructor(private _snackBar: MatSnackBar) {}

  showAlertRef(message: string, actions?: string): MatSnackBarRef<any> {
    return this._snackBar.open(message, actions, this.DEFAULT_CONFIG);
  }

  showAlert(
    message: string,
    actions?: string,
    config?: MatSnackBarConfig
  ): void {
    this._snackBar.open(message, actions, {
      ...this.DEFAULT_CONFIG,
      ...config
    });
  }

  showErrorMessage(message: string) {
    this._snackBar.open(message, 'Aceptar', this.DEFAULT_CONFIG);
  }
}
