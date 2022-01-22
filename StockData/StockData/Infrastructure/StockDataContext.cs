using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using StockData.Domain;
using System.IO;

namespace StockData.Infrastructure
{
    public class StockDataContext : DbContext
    {
        public DbSet<Portfolio> Portfolios { get; set; }
        public DbSet<Watchlist> Products {  get; set; }

        //public StockDataContext(DbContextOptions options) : base(options)
        //{
        //}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                IConfigurationRoot configuration = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json")
                    .Build();
                var connectionString = configuration.GetConnectionString("ConnectionString");
                // TODO: Get connection string from appsettings
                optionsBuilder.UseSqlServer("Server=localhost;Database=StockData;Trusted_Connection=True;");
            }
        }
    }
}
