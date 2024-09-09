import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar) { }

  config: MatSnackBarConfig = {
    duration: 15000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  }


  success(msg: string) {
    this.config['panelClass'] = ['notification', 'success'];
    this.snackBar.open(msg, 'Fluid', this.config);
  }

  warn(msg: string) {
    this.config['panelClass'] = ['notification', 'warn'];
    this.snackBar.open(msg, 'Fluid', this.config);
  }

  error(msg: string) {
    this.config['panelClass'] = ['notification', 'error'];
    this.snackBar.open(msg, 'Fluid', this.config);
  }

}
