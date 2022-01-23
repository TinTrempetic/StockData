using StockData.Enums;

namespace StockData.Query.GetPortfolio
{
    public class GetPortfolioQueryResponse
    {
        public int Id { get; set; }
        public string Symbol { get; set; }
        public AssetType AssetType { get; set; }
        public float Quantity { get; set; }
        public float Price { get; set; }
    }
}
