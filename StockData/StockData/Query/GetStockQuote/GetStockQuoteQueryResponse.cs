using Newtonsoft.Json;
using System.ComponentModel;
using System.Text.Json.Serialization;

namespace StockData.Query.GetStockQuote
{
    public class GetStockQuoteQueryResponse
    {
        /// <summary>
        /// Current price
        /// </summary>
        [JsonProperty("c")]
        public float CurrentPrice { get; set; }
        /// <summary>
        /// Change
        /// </summary>
        [JsonProperty("d")]
        public float Change { get; set; }
        /// <summary>
        /// Percent change
        /// </summary>
        [JsonProperty("dp")]
        public float PercentChange { get; set; }
        /// <summary>
        /// High price of the day
        /// </summary>
        [JsonProperty("h")]
        public float HighPrice { get; set; }
        /// <summary>
        /// Low price of the day
        /// </summary>
        [JsonProperty("l")]
        public float LowPrice { get; set; }
        /// <summary>
        /// Open price of the day
        /// </summary>
        [JsonProperty("o")]
        public float OpenPrice { get; set; }
        /// <summary>
        /// Previous close price
        /// </summary>
        [JsonProperty("pc")]
        public float ClosePrice { get; set; }
    }
}
