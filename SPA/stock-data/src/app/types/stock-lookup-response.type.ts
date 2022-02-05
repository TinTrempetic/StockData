export interface StockLookupResponse {
  count: number;
  result: StockLookupResponseResult[];
}

export interface StockLookupResponseResult {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}

export interface StockLookupSelectItem {
  symbol: string;
  label: string;
}
