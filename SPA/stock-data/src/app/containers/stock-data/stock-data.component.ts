import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

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
    const symbol = this.route.snapshot.params['symbol'];

    this._symbol.next(symbol);
  }
}
