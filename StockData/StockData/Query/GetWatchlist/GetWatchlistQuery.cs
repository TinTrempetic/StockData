using MediatR;
using StockData.Command.ViewModels;
using StockData.Models;
using System.Collections.Generic;

namespace StockData.Query.GetWatchlist
{
    public class GetWatchlistQuery : IRequest<PagedResult<WatchlistViewModel>>
    {
        public string UserId { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
        public string SortField {get;set;}
        public int SortOrder { get; set; }
    }
}
