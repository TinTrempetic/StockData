import { Injectable } from '@angular/core';
import { endpoints } from './finnhub.endpoints';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
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
import { CandleResolution, EventType } from 'src/app/enums';
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

  public getStockCandles(symbol: string, resolution: string): any {
    const route = endpoints.stockCandles
      .replace('{symbol}', symbol)
      .replace('{resolution}', resolution)
      .replace('{fromDate}', this.getCandlesFromDate(resolution))
      .replace('{toDate}', this.dateToUnixTimestamp(new Date()).toString())
      .replace('{token}', this.apiKey);

    return this.http.get<any>(route).pipe(tap((result) => console.log(result)));
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

  private getCandlesFromDate(resolution: string): string {
    const date = new Date();

    switch (resolution) {
      case CandleResolution.Minute: {
        date.setDate(date.getDate() - 1);
        return this.dateToUnixTimestamp(date).toString();
      }
      case CandleResolution.FiveMinutes: {
        date.setDate(date.getDate() - 5);
        return this.dateToUnixTimestamp(date).toString();
      }
      case CandleResolution.FifteenMinutes: {
        date.setDate(date.getDate() - 15);
        return this.dateToUnixTimestamp(date).toString();
      }
      case CandleResolution.ThirtyMinutes: {
        date.setDate(date.getDate() - 30);
        return this.dateToUnixTimestamp(date).toString();
      }
      case CandleResolution.Hour: {
        date.setDate(date.getDate() - 60);
        return this.dateToUnixTimestamp(date).toString();
      }
      case CandleResolution.Day: {
        date.setDate(date.getDate() - 1500);
        return this.dateToUnixTimestamp(date).toString();
      }
      default:
        return this.dateToUnixTimestamp(new Date()).toString();
    }
  }

  private dateToUnixTimestamp(date: Date): number {
    return Math.round(new Date(date).getTime() / 1000);
  }
}
