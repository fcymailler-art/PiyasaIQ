import express from 'express';
import axios from 'axios';

const router = express.Router();

const BINANCE_API_BASE = 'https://api.binance.com/api/v3';

// Helper function to generate random AI Score (0-100)
function generateAIScore() {
  return Math.floor(Math.random() * 101);
}

// Helper function to generate AI Summary
function generateAISummary(priceChange) {
  if (priceChange > 5) return 'Strong bullish momentum detected';
  if (priceChange > 0) return 'Mild bullish trend';
  if (priceChange < -5) return 'Strong bearish pressure';
  if (priceChange < 0) return 'Mild bearish trend';
  return 'Neutral market conditions';
}

// GET /markets - Fetch top 20 crypto assets
router.get('/', async (req, res) => {
  const response = await axios.get(`${BINANCE_API_BASE}/ticker/24hr`);
  
  const topAssets = response.data
    .slice(0, 20)
    .map(asset => ({
      symbol: asset.symbol,
      price: parseFloat(asset.lastPrice),
      priceChangePercent: parseFloat(asset.priceChangePercent),
      volume: parseFloat(asset.quoteAssetVolume),
      aiScore: generateAIScore(),
      aiSummary: generateAISummary(parseFloat(asset.priceChangePercent)),
    }));

  res.json(topAssets);
});

// GET /markets/:symbol - Fetch single asset with detailed analysis
router.get('/:symbol', async (req, res) => {
  const { symbol } = req.params;
  const upperSymbol = symbol.toUpperCase();

  const response = await axios.get(`${BINANCE_API_BASE}/ticker`, {
    params: { symbol: upperSymbol },
  });

  const data = response.data;
  const priceChange = parseFloat(data.priceChangePercent);
  const price = parseFloat(data.lastPrice);
  const high24h = parseFloat(data.highPrice);
  const low24h = parseFloat(data.lowPrice);

  // Calculate support and resistance levels
  const supportLevel = (low24h * 0.98).toFixed(8);
  const resistanceLevel = (high24h * 1.02).toFixed(8);

  // Determine sentiment
  let sentiment = 'neutral';
  let sentimentPercent = 50;
  if (priceChange > 5) {
    sentiment = 'bullish';
    sentimentPercent = Math.min(95, 50 + priceChange);
  } else if (priceChange < -5) {
    sentiment = 'bearish';
    sentimentPercent = Math.max(5, 50 + priceChange);
  }

  // Determine risk level
  const volatility = Math.abs(priceChange);
  let riskLevel = 'low';
  if (volatility > 10) riskLevel = 'high';
  else if (volatility > 5) riskLevel = 'medium';

  // Generate 24h prediction
  const prediction24h = priceChange > 0 ? 'Potential upside continuation' : 'Potential downside pressure';

  res.json({
    symbol: upperSymbol,
    price,
    priceChangePercent: priceChange,
    volume: parseFloat(data.quoteAssetVolume),
    high24h,
    low24h,
    openPrice: parseFloat(data.openPrice),
    aiScore: generateAIScore(),
    aiSummary: generateAISummary(priceChange),
    sentiment: `${sentiment} (${sentimentPercent}%)`,
    supportLevel: parseFloat(supportLevel),
    resistanceLevel: parseFloat(resistanceLevel),
    riskLevel,
    prediction24h,
  });
});

export default router;