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
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class FinnhubService {
  // TODO: get this from database
  private apiKey = 'c7bfc4qad3ia366ft1k0';

  // TODO: move datePipe to utilities
  constructor(private http: HttpClient, private datePipe: DatePipe) {}

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
    date
  ): Observable<Earnings[] | Ipo[]> {
    const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');

    const params = `from=${formattedDate}&to=${formattedDate}`;

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

  public getStockCandles(
    symbol: string,
    resolution: number,
    fromDate: Date,
    toDate: Date
  ): any {
    const formattedFromDate = this.datePipe.transform(fromDate, 'yyyy-MM-dd');

    const formattedtoDate = this.datePipe.transform(toDate, 'yyyy-MM-dd');

    const route = endpoints.symbolLookup
      .replace('{symbol}', symbol)
      .replace('{resolution}', resolution.toString())
      .replace('{fromDate}', formattedFromDate)
      .replace('{toDate}', formattedtoDate)
      .replace('{token}', this.apiKey);
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
