export interface EarningsCalendarResponse {
  earningsCalendar: Earnings[];
}

export interface Earnings {
  date: Date;
  epsActual: number;
  epsEstimate: number;
  hour: string;
  quarter: number;
  revenueActual: number;
  revenueEstimate: number;
  symbol: string;
  year: number;
}
