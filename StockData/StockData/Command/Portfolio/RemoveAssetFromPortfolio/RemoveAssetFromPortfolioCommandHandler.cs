using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace StockData.Command.Portfolio.RemoveAssetFromPortfolio
{
    public class RemoveAssetFromPortfolioCommandHandler : IRequestHandler<RemoveAssetFromPortfolioCommand, int>
    {
        // TODO: Replace with IdentityUser
        Guid userId = Guid.Empty;
        private readonly StockDataContext context;
        public RemoveAssetFromPortfolioCommandHandler(StockDataContext context)
        {
            this.context = context;
        }

        public async Task<int> Handle(RemoveAssetFromPortfolioCommand request, CancellationToken cancellationToken)
        {
            var portfolioItemToRemove = await context.PortfolioItems.FirstOrDefaultAsync(p => p.Id == request.Id);

            context.PortfolioItems.Remove(portfolioItemToRemove);

            await context.SaveChangesAsync(cancellationToken);

            return request.Id;
        } 
    }
}
