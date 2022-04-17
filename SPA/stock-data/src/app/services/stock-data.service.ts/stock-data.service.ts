import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StockDataService {
  private _backButtonVisible = new BehaviorSubject<boolean>(false);
  backButtonVisible$ = this._backButtonVisible.asObservable();

  constructor() {}

  public displayBackButton(isVisible: boolean) {
    this._backButtonVisible.next(isVisible);
  }
}
