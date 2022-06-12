namespace StockData.Command.ViewModels
{
    public class WatchlistViewModel
    {
        public string Symbol { get; set; }
        public float CurrentPrice { get; set; }
        public float Change { get; set; }
        public float PercentChange { get; set; }
        public float DayHighPrice { get; set; }
        public float DayLowPrice { get; set; }

    }
}
