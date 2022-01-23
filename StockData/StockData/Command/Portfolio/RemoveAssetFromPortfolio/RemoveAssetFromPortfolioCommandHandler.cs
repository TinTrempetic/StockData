using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace StockData.Command.Portfolio.RemoveAssetFromPortfolio
{
    public class RemoveAssetFromPortfolioCommandHandler : IRequestHandler<RemoveAssetFromPortfolioCommand, RemoveAssetFromPortfolioCommandResponse>
    {
        // TODO: Replace with IdentityUser
        Guid userId = Guid.Empty;
        private readonly StockDataContext context;
        public RemoveAssetFromPortfolioCommandHandler(StockDataContext context)
        {
            this.context = context;
        }

        public Task<RemoveAssetFromPortfolioCommandResponse> Handle(RemoveAssetFromPortfolioCommand request, CancellationToken cancellationToken)
        {
            throw new System.NotImplementedException();
        } 
    }
}
