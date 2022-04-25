using MediatR;

namespace StockData.Command.Watchlist.AddAssetToWatchlist
{
    public class AddAssetToWatchlistCommand : IRequest<int>
    {
        public string UserId { get; set; }
        public string Symbol { get; set; }
    }
}
