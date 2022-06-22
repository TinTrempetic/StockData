using MediatR;
using StockData.Enums;

namespace StockData.Command.Watchlist.AddAssetToWatchlist
{
    public class AddAssetToWatchlistCommand : IRequest<bool>
    {
        public string UserId { get; set; }
        public string Symbol { get; set; }
    }
}
