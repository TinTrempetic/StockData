using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using StockData.Services.FinnhubService;
using StockData.Command.ViewModels;

namespace StockData.Query.GetWatchlist
{
    public class GetWatchlistQueryHandler : IRequestHandler<GetWatchlistQuery, List<WatchlistViewModel>>
    {
        string userId = "google-oauth2|110051772755192088405";
        private readonly StockDataContext context;
        private readonly IFinnhubService service;

        public GetWatchlistQueryHandler(StockDataContext context, IFinnhubService service)
        {
            this.context = context;
            this.service = service;
        }

        public async Task<List<WatchlistViewModel>> Handle(GetWatchlistQuery request, CancellationToken cancellationToken)
        {
            var watchlist = await context.WatchlistItems
                .AsNoTracking()
                .Where(x => x.UserId == userId)
                .Select(x => new GetWatchlistQueryResponse
                {
                    Id = x.Id,
                    Symbol = x.Symbol
                })
                .ToListAsync(cancellationToken);

            var tasks = new List<Task<WatchlistViewModel>>();

            foreach (var item in watchlist)
            {
                var task = service.GetStockQuote(item.Symbol, cancellationToken);

                tasks.Add(task);
            }

            await Task.WhenAll(tasks);

            var response = new List<WatchlistViewModel>();

            foreach(var resolvedTask in tasks)
            {
                response.Add(resolvedTask.Result);
            }

            return response;
        }
    }
}
