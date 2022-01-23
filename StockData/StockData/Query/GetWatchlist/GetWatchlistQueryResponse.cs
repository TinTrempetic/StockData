using StockData.Enums;

namespace StockData.Query.GetWatchlist
{
    public class GetWatchlistQueryResponse
    {
        public int Id { get; set; }
        public string Symbol { get; set; }
        public AssetType AssetType { get; set; }
    }
}
