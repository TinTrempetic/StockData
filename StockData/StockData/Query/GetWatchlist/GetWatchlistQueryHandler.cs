﻿using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace StockData.Query.GetWatchlist
{
    public class GetWatchlistQueryHandler : IRequestHandler<GetWatchlistQuery, List<GetWatchlistQueryResponse>>
    {
        private readonly StockDataContext context;

        public GetWatchlistQueryHandler(StockDataContext context)
        {
            this.context = context;
        }

        public async Task<List<GetWatchlistQueryResponse>> Handle(GetWatchlistQuery request, CancellationToken cancellationToken)
        {
            var watchlist = await context.WatchlistItems
                .AsNoTracking()
                .Where(x => x.UserId == request.UserId)
                .Select(x => new GetWatchlistQueryResponse
                {
                    Id = x.Id,
                    Symbol = x.Symbol
                })
                .ToListAsync(cancellationToken);

            // TODO: Get current asset information from the finhub API

            return watchlist;
        }
    }
}
