namespace StockData.Enums
{
    public class FinnhubEndpoints
    {
        /// <summary>
        /// Replace {0} with the symbol of the stock
        /// Replace {token} with the API key
        /// </summary>
        public const string StockQuote = "https://finnhub.io/api/v1/quote?symbol={0}&token={token}";
    }
}
