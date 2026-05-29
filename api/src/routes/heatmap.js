import express from 'express';
import axios from 'axios';

const router = express.Router();

const BINANCE_API_BASE = 'https://api.binance.com/api/v3';

// Helper function to generate random AI Score (0-100)
function generateAIScore() {
  return Math.floor(Math.random() * 101);
}

// Helper function to determine sector
function determineSector(symbol) {
  // Simple heuristic: most symbols are crypto, can be extended
  return 'crypto';
}

// GET /heat-map - Aggregate market data for top 50 assets
router.get('/', async (req, res) => {
  const response = await axios.get(`${BINANCE_API_BASE}/ticker/24hr`);

  const heatmapData = response.data
    .slice(0, 50)
    .map(asset => ({
      symbol: asset.symbol,
      marketCap: parseFloat(asset.quoteAssetVolume), // Using volume as proxy for market cap
      aiScore: generateAIScore(),
      priceChangePercent: parseFloat(asset.priceChangePercent),
      sector: determineSector(asset.symbol),
    }));

  res.json(heatmapData);
});

export default router;