import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@auth0/auth0-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { endpoints } from './stock-data.endpoints';

@Injectable({
  providedIn: 'root',
})
export class StockDataService {
  private userId: string;

  private _backButtonVisible = new BehaviorSubject<boolean>(false);
  backButtonVisible$ = this._backButtonVisible.asObservable();

  constructor(private http: HttpClient) {}

  public displayBackButton(isVisible: boolean) {
    this._backButtonVisible.next(isVisible);
  }

  public getWatchlistItems(): Observable<any> {
    return this.http.get<any>(endpoints.watchlist, {
      headers: this.getHeaders(),
    });
  }

  public setUser(user: User): void {
    this.userId = user.sub;
  }

  private getHeaders(): HttpHeaders {
    const headerDict = {
      'Content-Type': 'application/json',
      userId: this.userId,
    };

    return new HttpHeaders(headerDict);
  }
}
