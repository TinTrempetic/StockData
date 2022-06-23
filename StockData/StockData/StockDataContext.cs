using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using StockData.Entities;
using System.IO;

namespace StockData
{
    public class StockDataContext : DbContext
    {
        public DbSet<WatchlistItem> WatchlistItems {  get; set; }

        public StockDataContext(DbContextOptions options) { }

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
