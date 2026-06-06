import express from 'express';
import axios from 'axios';

const router = express.Router();

// ── BIST Hisse Listesi ──────────────────────────────────────────────────────
const BIST_STOCKS = [
  { ticker: "THYAO", name: "Türk Hava Yolları", sector: "Havacılık" },
  { ticker: "GARAN", name: "Garanti Bankası", sector: "Bankacılık" },
  { ticker: "AKBNK", name: "Akbank", sector: "Bankacılık" },
  { ticker: "EREGL", name: "Ereğli Demir Çelik", sector: "Demir-Çelik" },
  { ticker: "SASA", name: "SASA Polyester", sector: "Kimya" },
  { ticker: "KCHOL", name: "Koç Holding", sector: "Holding" },
  { ticker: "ASELS", name: "Aselsan", sector: "Savunma" },
  { ticker: "BIMAS", name: "BİM Mağazalar", sector: "Perakende" },
  { ticker: "YKBNK", name: "Yapı Kredi", sector: "Bankacılık" },
  { ticker: "TTKOM", name: "Türk Telekom", sector: "Telekom" },
  { ticker: "SAHOL", name: "Sabancı Holding", sector: "Holding" },
  { ticker: "PETKM", name: "Petkim", sector: "Kimya" },
  { ticker: "TUPRS", name: "Tüpraş", sector: "Enerji" },
  { ticker: "EKGYO", name: "Emlak Konut GYO", sector: "GYO" },
  { ticker: "TOASO", name: "Tofaş Oto", sector: "Otomotiv" },
  { ticker: "FROTO", name: "Ford Otosan", sector: "Otomotiv" },
  { ticker: "HALKB", name: "Halkbank", sector: "Bankacılık" },
  { ticker: "VAKBN", name: "Vakıfbank", sector: "Bankacılık" },
  { ticker: "ISCTR", name: "İş Bankası C", sector: "Bankacılık" },
  { ticker: "PGSUS", name: "Pegasus", sector: "Havacılık" },
  { ticker: "ARCLK", name: "Arçelik", sector: "Dayanıklı Tüketim" },
  { ticker: "TCELL", name: "Turkcell", sector: "Telekom" },
  { ticker: "KOZAL", name: "Koza Altın", sector: "Madencilik" },
  { ticker: "ENKAI", name: "Enka İnşaat", sector: "İnşaat" },
  { ticker: "MGROS", name: "Migros", sector: "Perakende" },
  { ticker: "SISE", name: "Şişe Cam", sector: "Cam" },
  { ticker: "TAVHL", name: "TAV Havalimanları", sector: "Havacılık" },
  { ticker: "ULKER", name: "Ülker Bisküvi", sector: "Gıda" },
  { ticker: "AEFES", name: "Anadolu Efes", sector: "Gıda" },
  { ticker: "AKSEN", name: "Aksa Enerji", sector: "Enerji" },
  { ticker: "BRISA", name: "Brisa", sector: "Otomotiv" },
  { ticker: "CIMSA", name: "Çimsa", sector: "Çimento" },
  { ticker: "DOAS", name: "Doğuş Otomotiv", sector: "Otomotiv" },
  { ticker: "DOHOL", name: "Doğan Holding", sector: "Holding" },
  { ticker: "ENJSA", name: "Enerjisa", sector: "Enerji" },
  { ticker: "GUBRF", name: "Gübre Fabrikaları", sector: "Kimya" },
  { ticker: "LOGO", name: "Logo Yazılım", sector: "Yazılım" },
  { ticker: "MAVI", name: "Mavi Giyim", sector: "Tekstil" },
  { ticker: "OTKAR", name: "Otokar", sector: "Otomotiv" },
  { ticker: "SELEC", name: "Selçuk Ecza", sector: "Sağlık" },
  { ticker: "SKBNK", name: "Şekerbank", sector: "Bankacılık" },
  { ticker: "SOKM", name: "Şok Marketler", sector: "Perakende" },
  { ticker: "TATGD", name: "Tat Gıda", sector: "Gıda" },
  { ticker: "TKFEN", name: "Tekfen Holding", sector: "Holding" },
  { ticker: "TTRAK", name: "Türk Traktör", sector: "Makine" },
  { ticker: "VESTL", name: "Vestel", sector: "Elektronik" },
  { ticker: "ZOREN", name: "Zorlu Enerji", sector: "Enerji" },
  { ticker: "KRDMD", name: "Kardemir D", sector: "Demir-Çelik" },
  { ticker: "KONTR", name: "Kontrolmatik", sector: "Enerji" },
  { ticker: "INDES", name: "İndeks Bilgisayar", sector: "Teknoloji" },
];

// ── AI Yardımcı Fonksiyonlar ────────────────────────────────────────────────
function aiScore(changePercent) {
  const score = 50 + changePercent * 4;
  return Math.min(95, Math.max(5, Math.round(score)));
}

function aiSummary(changePercent, name) {
  if (changePercent > 5) return `${name} güçlü yükseliş momentumu gösteriyor. Hacim artışıyla destekleniyor.`;
  if (changePercent > 2) return `${name} pozitif seyir izliyor. Kırılım seviyesi yakın.`;
  if (changePercent > 0) return `${name} hafif yükseliş eğiliminde. İzleme önerilir.`;
  if (changePercent < -5) return `${name} sert satış baskısıyla karşı karşıya. Destek kırılabilir.`;
  if (changePercent < -2) return `${name} zayıflama sinyali veriyor. Dikkatli olunmalı.`;
  if (changePercent < 0) return `${name} hafif gerileme yaşıyor. Nötr seyir.`;
  return `${name} yatay seyir izliyor. Bekleme pozisyonu önerilir.`;
}

function sentiment(changePercent) {
  if (changePercent > 3) return 'bullish';
  if (changePercent < -3) return 'bearish';
  return 'neutral';
}

// ── Yahoo Finance Hisse Verisi ──────────────────────────────────────────────
async function fetchYahooStock(ticker) {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}.IS?interval=1d&range=1d`;
    const res = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 8000,
    });
    const meta = res.data?.chart?.result?.[0]?.meta;
    if (!meta) return null;
    const price = meta.regularMarketPrice || 0;
    const prev = meta.chartPreviousClose || meta.previousClose || price;
    const changePercent = prev > 0 ? ((price - prev) / prev) * 100 : 0;
    return { price, changePercent, volume: meta.regularMarketVolume || 0 };
  } catch {
    return null;
  }
}

// ── GET /markets/bist ── Tüm BIST hisseleri ───────────────────────────────
router.get('/bist', async (req, res) => {
  try {
    const results = await Promise.allSettled(
      BIST_STOCKS.map(async (stock) => {
        const data = await fetchYahooStock(stock.ticker);
        const changePercent = data?.changePercent ?? 0;
        return {
          ticker: stock.ticker,
          name: stock.name,
          sector: stock.sector,
          price: data?.price ?? null,
          changePercent: parseFloat(changePercent.toFixed(2)),
          volume: data?.volume ?? 0,
          aiScore: aiScore(changePercent),
          aiSummary: aiSummary(changePercent, stock.name),
          sentiment: sentiment(changePercent),
        };
      })
    );

    const stocks = results
      .filter(r => r.status === 'fulfilled')
      .map(r => r.value);

    res.json({ stocks, count: stocks.length, updatedAt: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /markets/bist/:ticker ── Tek hisse detay ──────────────────────────
router.get('/bist/:ticker', async (req, res) => {
  try {
    const ticker = req.params.ticker.toUpperCase();
    const stock = BIST_STOCKS.find(s => s.ticker === ticker);
    const data = await fetchYahooStock(ticker);
    if (!data) return res.status(404).json({ error: 'Hisse bulunamadı' });

    const changePercent = data.changePercent;
    res.json({
      ticker,
      name: stock?.name || ticker,
      sector: stock?.sector || 'Bilinmiyor',
      price: data.price,
      changePercent: parseFloat(changePercent.toFixed(2)),
      volume: data.volume,
      aiScore: aiScore(changePercent),
      aiSummary: aiSummary(changePercent, stock?.name || ticker),
      sentiment: sentiment(changePercent),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /markets/crypto ── CoinGecko top 250 coin ─────────────────────────
router.get('/crypto', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.per_page) || 100;

    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: perPage,
        page,
        sparkline: false,
        price_change_percentage: '24h',
      },
      timeout: 10000,
    });

    const coins = response.data.map(coin => {
      const changePercent = coin.price_change_percentage_24h || 0;
      return {
        id: coin.id,
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        image: coin.image,
        price: coin.current_price,
        changePercent: parseFloat(changePercent.toFixed(2)),
        marketCap: coin.market_cap,
        volume24h: coin.total_volume,
        rank: coin.market_cap_rank,
        aiScore: aiScore(changePercent),
        aiSummary: aiSummary(changePercent, coin.name),
        sentiment: sentiment(changePercent),
      };
    });

    res.json({ coins, count: coins.length, page, updatedAt: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /markets/crypto/:id ── Tek coin detay ─────────────────────────────
router.get('/crypto/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`, {
      params: { localization: false, tickers: false, community_data: false, developer_data: false },
      timeout: 10000,
    });

    const coin = response.data;
    const changePercent = coin.market_data?.price_change_percentage_24h || 0;

    res.json({
      id: coin.id,
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      image: coin.image?.large,
      price: coin.market_data?.current_price?.usd,
      priceTry: coin.market_data?.current_price?.try,
      changePercent: parseFloat(changePercent.toFixed(2)),
      marketCap: coin.market_data?.market_cap?.usd,
      volume24h: coin.market_data?.total_volume?.usd,
      high24h: coin.market_data?.high_24h?.usd,
      low24h: coin.market_data?.low_24h?.usd,
      rank: coin.market_cap_rank,
      description: coin.description?.tr || coin.description?.en || '',
      aiScore: aiScore(changePercent),
      aiSummary: aiSummary(changePercent, coin.name),
      sentiment: sentiment(changePercent),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /markets ── Eski Binance endpoint (geriye dönük uyumluluk) ─────────
router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://api.binance.com/api/v3/ticker/24hr', { timeout: 8000 });
    const topAssets = response.data
      .filter(a => a.symbol.endsWith('USDT'))
      .sort((a, b) => parseFloat(b.quoteAssetVolume) - parseFloat(a.quoteAssetVolume))
      .slice(0, 50)
      .map(asset => {
        const changePercent = parseFloat(asset.priceChangePercent);
        return {
          symbol: asset.symbol,
          price: parseFloat(asset.lastPrice),
          changePercent,
          volume: parseFloat(asset.quoteAssetVolume),
          aiScore: aiScore(changePercent),
          aiSummary: aiSummary(changePercent, asset.symbol),
          sentiment: sentiment(changePercent),
        };
      });
    res.json(topAssets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
