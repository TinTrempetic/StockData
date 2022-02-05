import { Injectable } from '@angular/core';
import { endpoints } from './finnhub.endpoints';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  Earnings,
  EarningsCalendarResponse,
  Ipo,
  IpoCalendarResponse,
  MarketNews,
  MarketNewsResponse,
  StockLookupResponse,
  StockLookupSelectItem,
} from 'src/app/types';
import { EventType } from 'src/app/enums';

@Injectable({
  providedIn: 'root',
})
export class FinnhubService {
  // TODO: get this from database
  private apiKey = 'c7bfc4qad3ia366ft1k0';

  constructor(private http: HttpClient) {}

  public stockLookup(symbol: string): Observable<StockLookupSelectItem[]> {
    const route = endpoints.symbolLookup
      .replace('{symbol}', symbol)
      .replace('{token}', this.apiKey);

    const response = this.http.get<StockLookupResponse>(route);

    return response.pipe(
      map((response: StockLookupResponse) => {
        const results = response.result?.filter((x) => !x.symbol.includes('.'));

        return results.map((result) => {
          return {
            label: result.description,
            symbol: result.symbol,
          } as StockLookupSelectItem;
        });
      })
    );
  }

  public getMarketNews(): Observable<MarketNews[]> {
    const route = endpoints.marketNews
      .replace('{category}', 'general')
      .replace('{token}', this.apiKey);

    const response = this.http.get<MarketNewsResponse[]>(route);

    return response.pipe(
      map((response: MarketNewsResponse[]) => {
        return response.map((item) => {
          const dateTime = new Date(item.datetime * 1000);

          return {
            ...item,
            dateTime,
          } as MarketNews;
        });
      })
    );
  }

  public getCalendarEvents(
    eventType: string,
    fromDate: Date,
    toDate: Date
  ): Observable<Earnings[] | Ipo[]> {
    const from = fromDate?.toDateString();
    const to = toDate.toDateString();

    const params = `from=${from}&to=${to}`;

    const route = endpoints.calendarEvents
      .replace('{eventType}', eventType)
      .replace('{params}', params)
      .replace('{token}', this.apiKey);

    switch (eventType) {
      case EventType.ipo: {
        return this.getIpoCalendar(route);
      }
      default:
      case EventType.earnings: {
        return this.getEarningsCalendar(route);
      }
    }
  }

  private getIpoCalendar(route: string): Observable<Ipo[]> {
    return this.http
      .get<IpoCalendarResponse>(route)
      .pipe(map((result) => result.ipoCalendar));
  }

  private getEarningsCalendar(route: string): Observable<Earnings[]> {
    return this.http
      .get<EarningsCalendarResponse>(route)
      .pipe(map((result) => result.earningsCalendar));
  }
}
