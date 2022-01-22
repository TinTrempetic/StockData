using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace StockData.Services.FinnhubService
{
    public interface IFinnhubService
    {
        Task<T> SendRequestToFinnhub<T>(string route, HttpMethod httpMethod, CancellationToken cancellationToken);
    }
}
