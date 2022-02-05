export interface MarketNewsResponse {
  category: string;
  // Published time in UNIX timestamp
  datetime: number;
  headline: string;
  image: string;
  source: string;
  summary: string;
  url: string;
}

export interface MarketNews {
  category: string;
  dateTime: Date;
  headline: string;
  image: string;
  source: string;
  summary: string;
  url: string;
}
