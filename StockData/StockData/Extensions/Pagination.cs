using Microsoft.EntityFrameworkCore;
using StockData.Models;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace StockData.Extensions
{
    public static class Pagination
    {
        public static async Task<PagedResult<T>> GetPagedAsync<T>(this IQueryable<T> query, int page, int pageSize, CancellationToken cancellationToken = default)
        {
            var result = new PagedResult<T>
            {
                CurrentPage = page,
                PageSize = pageSize,
                TotalRows = await query.CountAsync(cancellationToken)
            };

            var pageCount = (double)result.TotalRows / pageSize;
            result.PageCount = (int)Math.Ceiling(pageCount);

            var skip = (page - 1) * pageSize;
            result.Results = await query.Skip(skip).Take(pageSize).ToListAsync(cancellationToken);

            return result;
        }
    }
}
