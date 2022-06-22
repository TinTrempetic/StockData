using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using StockData.Services.FinnhubService;
using StockData.Command.ViewModels;
using StockData.Extensions;
using StockData.Models;

namespace StockData.Query.GetWatchlist
{
    public class GetWatchlistQueryHandler : IRequestHandler<GetWatchlistQuery, PagedResult<WatchlistViewModel>>
    {
        private readonly StockDataContext context;
        private readonly IFinnhubService service;

        public GetWatchlistQueryHandler(StockDataContext context, IFinnhubService service)
        {
            this.context = context;
            this.service = service;
        }

        public async Task<PagedResult<WatchlistViewModel>> Handle(GetWatchlistQuery request, CancellationToken cancellationToken)
        {
            //var pageCount = (double)result.RowCount / pageSize;

            var watchlist = new PagedResult<GetWatchlistQueryResponse>();

            if(request.SortOrder.Equals(1))
                watchlist = await context.WatchlistItems
                .AsNoTracking()
                .Where(x => x.UserId == request.UserId)
                .Select(x => new GetWatchlistQueryResponse
                {
                    Id = x.Id,
                    Symbol = x.Symbol
                })
                .OrderByDescending(x => x.Symbol)
                .GetPagedAsync(request.Page, request.PageSize, cancellationToken);
            else
                watchlist = await context.WatchlistItems
                .AsNoTracking()
                .Where(x => x.UserId == request.UserId)
                .Select(x => new GetWatchlistQueryResponse
                {
                    Id = x.Id,
                    Symbol = x.Symbol
                })
                .OrderBy(x => x.Symbol)
                .GetPagedAsync(request.Page, request.PageSize, cancellationToken);

            var tasks = new List<Task<WatchlistViewModel>>();

            foreach (var item in watchlist.Results)
            {
                var task = service.GetStockQuote(item.Id, item.Symbol, cancellationToken);

                tasks.Add(task);
            }

            await Task.WhenAll(tasks);

            var response = new List<WatchlistViewModel>();

            foreach(var resolvedTask in tasks)
            {
                response.Add(resolvedTask.Result);
            }

            var pagedResponse = new PagedResult<WatchlistViewModel>
            {
                CurrentPage = watchlist.CurrentPage,
                PageCount = watchlist.PageCount,
                PageSize = watchlist.PageSize,
                TotalRows = watchlist.TotalRows,
                Results = response
            };

            return pagedResponse;
        }
    }
}
