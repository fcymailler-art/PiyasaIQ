import { useState, useEffect, useCallback } from 'react';

const SYMBOLS = [
  { symbol: 'BTCUSDT', name: 'Bitcoin', short: 'BTC' },
  { symbol: 'ETHUSDT', name: 'Ethereum', short: 'ETH' },
  { symbol: 'SOLUSDT', name: 'Solana', short: 'SOL' },
  { symbol: 'BNBUSDT', name: 'BNB', short: 'BNB' },
  { symbol: 'XRPUSDT', name: 'Ripple', short: 'XRP' },
  { symbol: 'ADAUSDT', name: 'Cardano', short: 'ADA' },
  { symbol: 'AVAXUSDT', name: 'Avalanche', short: 'AVAX' },
  { symbol: 'DOTUSDT', name: 'Polkadot', short: 'DOT' },
  { symbol: 'LINKUSDT', name: 'Chainlink', short: 'LINK' },
  { symbol: 'DOGEUSDT', name: 'Dogecoin', short: 'DOGE' },
  { symbol: 'MATICUSDT', name: 'Polygon', short: 'MATIC' },
  { symbol: 'UNIUSDT', name: 'Uniswap', short: 'UNI' },
  { symbol: 'ATOMUSDT', name: 'Cosmos', short: 'ATOM' },
  { symbol: 'NEARUSDT', name: 'NEAR', short: 'NEAR' },
  { symbol: 'FTMUSDT', name: 'Fantom', short: 'FTM' },
  { symbol: 'TAOUSDT', name: 'Bittensor', short: 'TAO' },
  { symbol: 'FETUSDT', name: 'Fetch.ai', short: 'FET' },
  { symbol: 'ARBUSDT', name: 'Arbitrum', short: 'ARB' },
  { symbol: 'RNDRUSDT', name: 'Render', short: 'RNDR' },
  { symbol: 'PEPEUSDT', name: 'Pepe', short: 'PEPE' },
];

export function useMarketData(pollInterval = 15000) {
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMarkets = useCallback(async () => {
    try {
      const symbolList = SYMBOLS.map(s => `"${s.symbol}"`).join(',');
      const response = await fetch(
        `https://api.binance.com/api/v3/ticker/24hr?symbols=[${symbolList}]`
      );
      if (!response.ok) throw new Error('Binance API error');
      const data = await response.json();

      const formatted = data.map(ticker => {
        const info = SYMBOLS.find(s => s.symbol === ticker.symbol);
        return {
          symbol: ticker.symbol,
          name: info?.name || ticker.symbol,
          short: info?.short || ticker.symbol.replace('USDT', ''),
          price: parseFloat(ticker.lastPrice),
          priceChangePercent: parseFloat(ticker.priceChangePercent),
          priceChange: parseFloat(ticker.priceChange),
          high24h: parseFloat(ticker.highPrice),
          low24h: parseFloat(ticker.lowPrice),
          volume: parseFloat(ticker.volume),
          quoteVolume: parseFloat(ticker.quoteVolume),
          openPrice: parseFloat(ticker.openPrice),
        };
      });

      setMarkets(formatted);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch markets:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMarkets();
    const interval = setInterval(fetchMarkets, pollInterval);
    return () => clearInterval(interval);
  }, [fetchMarkets, pollInterval]);

  return { markets, loading, error, refetch: fetchMarkets };
}

export { SYMBOLS };
