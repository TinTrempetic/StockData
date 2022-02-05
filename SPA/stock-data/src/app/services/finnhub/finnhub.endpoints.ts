export const endpoints = {
  symbolLookup:
    'https://finnhub.io/api/v1/search?q={symbol}&token={token}&isin=US',
  marketNews:
    'https://finnhub.io/api/v1/news?category={category}&token={token}',
  calendarEvents:
    'https://finnhub.io/api/v1/calendar/{eventType}?{params}&token={token}',
};
