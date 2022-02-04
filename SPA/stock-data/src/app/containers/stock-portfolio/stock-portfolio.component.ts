import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'stock-portfolio',
  templateUrl: './stock-portfolio.component.html',
  styleUrls: ['./stock-portfolio.component.scss']
})
export class StockPortfolioComponent implements OnInit {

  portfolioItems: any;

  constructor() { }

  ngOnInit(): void {
  }

}
