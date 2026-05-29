import { useState, useEffect } from 'react';

/**
 * Hook to fetch and format chart data for charting libraries
 * @param {string} symbol - Market symbol (e.g., 'BTCUSDT')
 * @param {string} interval - Time interval (e.g., '1h', '4h', '1d')
 * @returns {object} Chart data state
 */
export function useChartData(symbol, interval = '1h') {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!symbol) {
      setLoading(false);
      return;
    }

    const fetchChartData = async () => {
      try {
        setLoading(true);
        
        // Fetch from Binance public API (no auth needed)
        const response = await fetch(
          `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=100`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch chart data');
        }

        const data = await response.json();
        
        // Format for Recharts: [{ time, open, high, low, close, volume }]
        const formatted = data.map(candle => ({
          time: new Date(candle[0]).toLocaleTimeString('tr-TR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          timestamp: candle[0],
          open: parseFloat(candle[1]),
          high: parseFloat(candle[2]),
          low: parseFloat(candle[3]),
          close: parseFloat(candle[4]),
          volume: parseFloat(candle[5]),
        }));

        setChartData(formatted);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch chart data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [symbol, interval]);

  return {
    chartData,
    loading,
    error,
  };
}