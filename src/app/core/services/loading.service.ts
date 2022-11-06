import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, Subject } from 'rxjs';

@Injectable()
export class LoadingService {
  private _amountSpinners = 0; // Cantidad de spinners, depende de la cantidad de peticiones.
  private loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this.loading.asObservable();

  public get amountSpinners() {
    return this._amountSpinners;
  }

  public set amountSpinners(value) {
    this._amountSpinners = value;
  }

  public addSpinners() {
    this._amountSpinners++;
  }

  public removeSpinners() {
    if (this._amountSpinners > 0) {
      this._amountSpinners--;
    }
  }

  constructor() { }

  enableShowSpinner() {
    this.addSpinners();
    if (this.amountSpinners === 1) {
      this.loading.next(true);
    }
  }

  disableShowSpinner() {
    this.removeSpinners();
    if (this.amountSpinners === 0) {
      this.loading.next(false);
    }
  }

}

