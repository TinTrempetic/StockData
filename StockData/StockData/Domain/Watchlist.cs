﻿using StockData.Enums;
using System.ComponentModel.DataAnnotations;

namespace StockData.Domain
{
    public class Watchlist
    {
        [Key]
        public int Id { get; private set; }
        public string Symbol { get; private set; }
        public AssetType AssetType { get; private set; }
    }
}