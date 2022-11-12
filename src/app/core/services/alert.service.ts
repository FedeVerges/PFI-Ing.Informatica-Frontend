import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private _snackBar: MatSnackBar) { }

  showAlertRef(message: string, actions?: string): MatSnackBarRef<any> {
    return this._snackBar.open(message, actions, {
      duration: 1000
    } as MatSnackBarConfig)
  }

  showAlert(message: string, actions?: string, config?: MatSnackBarConfig): void {
    this._snackBar.open(message, actions, config);
  }

  showErrorMessage(message: string) {
    this._snackBar.open(message, 'Aceptar');

  }

}
