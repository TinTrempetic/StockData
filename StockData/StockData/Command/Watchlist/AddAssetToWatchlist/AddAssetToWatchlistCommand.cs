using StockData.Enums;

namespace StockData.Command.Watchlist.AddAssetToWatchlist
{
    public class AddAssetToWatchlistCommand
    {
        public string Symbol { get; set; }
        public AssetType AssetType { get; set; }
    }
}
