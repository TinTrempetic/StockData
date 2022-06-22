using System.Collections.Generic;

namespace StockData.Models
{
    public class PagedResult<T>
    {
        public int CurrentPage { get; set; }

        public int PageCount { get; set; }

        public int PageSize { get; set; }

        public int TotalRows { get; set; }
        public IList<T> Results { get; set; }

        public PagedResult()
        {
            Results = new List<T>();
        }
    }
}
