import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, filter, tap } from 'rxjs';

@Component({
  selector: 'app-stock-data',
  templateUrl: './stock-data.component.html',
  styleUrls: ['./stock-data.component.scss'],
})
export class StockDataComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  private _symbol = new BehaviorSubject(undefined);
  symbol$ = this._symbol.asObservable();

  ngOnInit(): void {
    this.route.params
      .pipe(
        filter((x) => !!x['symbol']),
        tap((data) => this._symbol.next(data['symbol']))
      )
      .subscribe();
  }
}
