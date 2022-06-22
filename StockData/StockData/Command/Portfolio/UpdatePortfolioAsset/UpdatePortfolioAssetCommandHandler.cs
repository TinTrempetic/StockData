using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace StockData.Command.Portfolio.UpdatePortfolioAsset
{
    public class UpdatePortfolioAssetCommandHandler : IRequestHandler<UpdatePortfolioAssetCommand, UpdatePortfolioAssetCommandResponse>
    {
        string userId = "google-oauth2|110051772755192088405";
        private readonly StockDataContext context;
        public UpdatePortfolioAssetCommandHandler(StockDataContext context)
        {
            this.context = context;
        }

        public async Task<UpdatePortfolioAssetCommandResponse> Handle(UpdatePortfolioAssetCommand request, CancellationToken cancellationToken)
        {
            var portfolioItem = await context.PortfolioItems.FirstOrDefaultAsync(p => p.Id == request.Id);

            portfolioItem.Update(request.Id, userId, request.Symbol, request.DateBought, request.Quantity, request.Price);

            await context.SaveChangesAsync(cancellationToken);

            return new UpdatePortfolioAssetCommandResponse
            {
                Id = request.Id,
                Symbol = request.Symbol,
                DateBought = request.DateBought,
                Quantity = request.Quantity,
                Price = request.Price
            };
        }
    }
}
