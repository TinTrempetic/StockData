export const endpoints = {
  symbolLookup:
    'https://finnhub.io/api/v1/search?q={symbol}&token={token}&isin=US',
  marketNews:
    'https://finnhub.io/api/v1/news?category={category}&token={token}',
  calendarEvents:
    'https://finnhub.io/api/v1/calendar/{eventType}?{params}&token={token}',
  stockCandles:
    'https://finnhub.io/api/v1/stock/candle?symbol={symbol}&resolution={resolution}&from={fromDate}&to={toDate}&token={token}',
  companyNews:
    'https://finnhub.io/api/v1/company-news?symbol=AAPL&from={fromDate}&to={toDate}&token={token}',
  recommendationTrends:
    'https://finnhub.io/api/v1/stock/recommendation?symbol={symbol}&token={token}',
  companyProfile:
    'https://finnhub.io/api/v1/stock/profile2?symbol={symbol}&token={token}',
  basicFinancials:
    'https://finnhub.io/api/v1/stock/metric?symbol={symbol}&metric=all&token={token}',
};
