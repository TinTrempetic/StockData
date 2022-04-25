namespace StockData.Query.GetWatchlist
{
    public class GetWatchlistQueryResponse
    {
        public int Id { get; set; }
        public string Symbol { get; set; }
        public float Price { get; set; }
        public float Change { get; set; }
        public float DayHighPrice { get; set; }
        public float DayLowPrice { get; set; }
    }
}
