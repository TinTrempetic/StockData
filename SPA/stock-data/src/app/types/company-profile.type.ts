export interface CompanyProfile {
  /**
   * Country of company's headquarter.
   */
  country: string;

  /**
   * Currency used in company filings.
   */
  currency: string;

  /**
   * Listed exchange.
   */
  exchange: string;

  /**
   * Finnhub industry classification.
   */
  finnhubIndustry: string;

  /**
   * IPO date.
   */
  ipo: string;

  /**
   * Logo image.
   */
  logo: string;

  /**
   * Market Capitalization.
   */
  marketCapitalization: number;

  /**
   * Company name.
   */
  name: string;

  /**
   * Number of oustanding shares.
   */
  shareOutstanding: number;

  /**
   * Company symbol/ticker as used on the listed exchange.
   */
  ticker: string;

  /**
   * Company website.
   */
  weburl: string;
}
