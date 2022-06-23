import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication';
import { PortfolioItem } from 'src/app/types';

@Component({
  selector: 'stock-portfolio',
  templateUrl: './stock-portfolio.component.html',
  styleUrls: ['./stock-portfolio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockPortfolioComponent implements OnInit {
  isAuth$ = this.authService.isAuthenticated();

  portfolioItems: PortfolioItem[] = [];

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {}

  /**
   * If the price increased, use the formula [(New Price - Old Price)/Old Price] and then multiply that number by 100.
   * If the price decreased, use the formula [(Old Price - New Price)/Old Price] and multiply that number by 100.
   */
  public getItemPriceChange(buyingPrice: number, currentPrice: number): string {
    if (buyingPrice > currentPrice) {
      const percentChange = ((buyingPrice - currentPrice) / buyingPrice) * 100;

      return percentChange.toString().concat('%');
    }

    if (buyingPrice < currentPrice) {
      const percentChange = ((currentPrice - buyingPrice) / buyingPrice) * 100;

      return percentChange.toString().concat('%');
    }

    return '0%';
  }

  public openPortfolioDialog(symbol: string): void {
    console.log(symbol);
  }
}
