import { Component, OnInit } from '@angular/core';
import { FinnhubService } from 'src/app/services';

@Component({
  selector: 'app-candles',
  templateUrl: './candles.component.html',
  styleUrls: ['./candles.component.scss'],
})
export class CandlesComponent implements OnInit {
  constructor(private finnhubService: FinnhubService) {}

  ngOnInit(): void {
    this.finnhubService
      .getStockCandles('AAPL', 1, new Date('2022-4-14'), new Date('2022-4-15'))
      .subscribe();
  }
}
