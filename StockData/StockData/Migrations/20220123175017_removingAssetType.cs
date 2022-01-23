using Microsoft.EntityFrameworkCore.Migrations;

namespace StockData.Migrations
{
    public partial class removingAssetType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AssetType",
                table: "WatchlistItems");

            migrationBuilder.DropColumn(
                name: "AssetType",
                table: "PortfolioItems");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AssetType",
                table: "WatchlistItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "AssetType",
                table: "PortfolioItems",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
