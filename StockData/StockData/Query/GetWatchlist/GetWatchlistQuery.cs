using MediatR;
using System.Collections.Generic;

namespace StockData.Query.GetWatchlist
{
    public class GetWatchlistQuery : IRequest<List<GetWatchlistQueryResponse>>
    {

    }
}
