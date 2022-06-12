using MediatR;
using StockData.Command.ViewModels;
using System.Collections.Generic;

namespace StockData.Query.GetWatchlist
{
    public class GetWatchlistQuery : IRequest<List<WatchlistViewModel>>
    {
        public string UserId { get; set; }
    }
}
