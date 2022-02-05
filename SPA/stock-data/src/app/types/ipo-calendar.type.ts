export interface IpoCalendarResponse {
  ipoCalendar: Ipo[];
}

export interface Ipo {
  date: Date;
  exchange: string;
  name: string;
  numberOfShares: number;
  price: string;
  status: string;
  symbol: string;
  totalSharesValue: number;
}
