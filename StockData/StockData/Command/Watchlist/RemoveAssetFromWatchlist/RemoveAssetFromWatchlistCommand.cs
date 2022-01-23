using MediatR;

namespace StockData.Command.Watchlist.RemoveAssetFromWatchlist
{
    public class RemoveAssetFromWatchlistCommand : IRequest<int>
    {
        public int Id { get; set; }
    }
}
