using System;

namespace StockData.Query.GetPortfolio
{
    public class GetPortfolioQueryResponse
    {
        public int Id { get; set; }
        public string Symbol { get; set; }
        public DateTime DateBought { get; set; }
        public float Quantity { get; set; }
        public float AveragePrice { get; set; }
        public float CurrentPrice { get; set; }
    }
}
