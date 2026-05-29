import { useState, useEffect, useCallback } from 'react';
import apiServerClient from '@/lib/apiServerClient';

/**
 * Hook to fetch and manage live market data with polling
 * @param {number} pollInterval - Polling interval in milliseconds (default: 30000)
 * @returns {object} Market data state and methods
 */
export function useMarketData(pollInterval = 30000) {
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMarkets = useCallback(async () => {
    try {
      const response = await apiServerClient.fetch('/markets');
      const data = await response.json();
      setMarkets(data);
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

  return {
    markets,
    loading,
    error,
    refetch: fetchMarkets,
  };
}