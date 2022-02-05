import { Injectable } from '@angular/core';
import { endpoints } from './finnhub.endpoints';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { StockLookupResponse, StockLookupSelectItem } from 'src/app/types';

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
}
