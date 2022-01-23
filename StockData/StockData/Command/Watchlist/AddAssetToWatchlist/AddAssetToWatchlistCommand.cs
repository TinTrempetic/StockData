using MediatR;
using StockData.Enums;

namespace StockData.Command.Watchlist.AddAssetToWatchlist
{
    public class AddAssetToWatchlistCommand : IRequest<int>
    {
        public string Symbol { get; set; }
    }
}
