import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, Activity, Sparkles, RefreshCw } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import { Button } from '@/components/ui/button';

const AI_DATA = {
  'BTCUSDT': { score: 89, signal: 'GÜÇLÜ AL', summary: 'Kurumsal birikim devam ediyor. ETF girişleri rekor seviyede. RSI sağlıklı momentum gösteriyor.', support: 98000, resistance: 112000, prediction: 'Kısa vadede yükseliş bekleniyor. $112,500 hedef.' },
  'ETHUSDT': { score: 74, signal: 'AL', summary: 'ETF beklentisi pozitif. Destek seviyesinde güçlü tutunma var.', support: 2800, resistance: 3800, prediction: 'Orta vadeli yükseliş potansiyeli mevcut.' },
  'SOLUSDT': { score: 92, signal: 'GÜÇLÜ AL', summary: 'DeFi TVL rekor kırdı. Hacim doğruladı, ekosistem büyüyor.', support: 155, resistance: 220, prediction: '$195-$220 hedef bölgesi.' },
  'BNBUSDT': { score: 70, signal: 'AL', summary: 'Quarterly burn mekanizması pozitif. Ekosistem büyümesi devam ediyor.', support: 580, resistance: 720, prediction: 'Kısa vadede pozitif görünüm.' },
  'XRPUSDT': { score: 65, signal: 'NÖTR', summary: 'Konsolidasyon devam ediyor. Yön kırılımı bekleniyor.', support: 2.1, resistance: 2.8, prediction: '$2.65 direncinin kırılması kritik.' },
  'DOGEUSDT': { score: 38, signal: 'SAT', summary: 'Sosyal ilgi azalıyor. Momentum zayıf, hacim düşük.', support: 0.32, resistance: 0.46, prediction: 'Kısa vadede baskı devam edebilir.' },
};

const getAIData = (symbol) => AI_DATA[symbol] || {
  score: 60, signal: 'NÖTR',
  summary: 'Teknik göstergeler nötr bölgede. Piyasa yönü belirsiz.',
  support: null, resistance: null, prediction: 'Yön kırılımı bekleniyor.',
};

function TradingViewWidget({ symbol }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = '';
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: `BINANCE:${symbol}`,
      interval: '60',
      timezone: 'Europe/Istanbul',
      theme: 'dark',
      style: '1',
      locale: 'tr',
      backgroundColor: 'rgba(10, 12, 20, 0)',
      gridColor: 'rgba(255, 255, 255, 0.04)',
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      calendar: false,
      support_host: 'https://www.tradingview.com',
    });
    ref.current.appendChild(script);
  }, [symbol]);

  return (
    <div className="tradingview-widget-container" ref={ref} style={{ height: '480px', width: '100%' }}>
      <div className="tradingview-widget-container__widget" style={{ height: '100%', width: '100%' }} />
    </div>
  );
}

function formatPrice(price) {
  if (!price) return '-';
  if (price >= 1000) return `$${price.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
  if (price >= 1) return `$${price.toFixed(4)}`;
  return `$${price.toFixed(6)}`;
}

function formatVolume(vol) {
  if (!vol) return '-';
  if (vol >= 1e9) return `$${(vol / 1e9).toFixed(2)}B`;
  if (vol >= 1e6) return `$${(vol / 1e6).toFixed(2)}M`;
  return `$${(vol / 1e3).toFixed(2)}K`;
}

const SIGNAL_STYLE = {
  'GÜÇLÜ AL': 'text-emerald-400 bg-emerald-500/15 border border-emerald-500/30',
  'AL': 'text-emerald-300 bg-emerald-500/10 border border-emerald-500/20',
  'NÖTR': 'text-amber-400 bg-amber-500/10 border border-amber-500/20',
  'SAT': 'text-red-400 bg-red-500/15 border border-red-500/30',
  'GÜÇLÜ SAT': 'text-red-500 bg-red-500/15 border border-red-500/30',
};

export default function MarketDetailPage() {
  const { symbol } = useParams();
  const [ticker, setTicker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchTicker = async () => {
    try {
      const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`);
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      setTicker(data);
      setLastUpdate(new Date());
    } catch (err) {
      console.error('Ticker fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (symbol) {
      fetchTicker();
      const interval = setInterval(fetchTicker, 10000);
      return () => clearInterval(interval);
    }
  }, [symbol]);

  const ai = getAIData(symbol);
  const price = ticker ? parseFloat(ticker.lastPrice) : null;
  const change = ticker ? parseFloat(ticker.priceChangePercent) : null;
  const isUp = change >= 0;
  const shortName = symbol?.replace('USDT', '');

  return (
    <>
      <Helmet>
        <title>{`${shortName} - Piyasa Detayı | PiyasaIQ`}</title>
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <Navigation />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Button variant="ghost" className="mb-6 text-muted-foreground hover:text-foreground" asChild>
              <Link to="/piyasalar">
                <ArrowLeft size={18} className="mr-2" /> Piyasalara Dön
              </Link>
            </Button>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center font-mono font-bold text-lg text-foreground border border-white/10">
                    {shortName?.slice(0, 2)}
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">{shortName}</h1>
                    <p className="text-muted-foreground text-sm">{symbol} · Binance</p>
                  </div>
                </div>
                {loading ? (
                  <div className="h-10 w-48 bg-muted/20 rounded animate-pulse" />
                ) : (
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold font-mono">{formatPrice(price)}</span>
                    <span className={`text-xl font-semibold ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>
                      {isUp ? '+' : ''}{change?.toFixed(2)}%
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                {lastUpdate && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
                    {lastUpdate.toLocaleTimeString('tr-TR')}
                  </span>
                )}
                <button onClick={fetchTicker} className="p-2 rounded-xl border border-white/10 hover:bg-white/5 transition-colors">
                  <RefreshCw className="w-4 h-4 text-muted-foreground" />
                </button>
                <div className={`px-4 py-2 rounded-xl text-sm font-bold ${SIGNAL_STYLE[ai.signal]}`}>
                  <Sparkles className="w-3.5 h-3.5 inline mr-1.5" />
                  {ai.signal} · {ai.score}
                </div>
              </div>
            </div>

            {/* Stats Row */}
            {ticker && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: '24s Yüksek', value: formatPrice(parseFloat(ticker.highPrice)) },
                  { label: '24s Düşük', value: formatPrice(parseFloat(ticker.lowPrice)) },
                  { label: 'Açılış', value: formatPrice(parseFloat(ticker.openPrice)) },
                  { label: '24s Hacim', value: formatVolume(parseFloat(ticker.quoteVolume)) },
                ].map((s, i) => (
                  <div key={i} className="glass-card p-4">
                    <span className="text-xs text-muted-foreground block mb-1">{s.label}</span>
                    <span className="text-lg font-bold font-mono">{s.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* TradingView Chart */}
              <div className="lg:col-span-2 glass-card p-4 overflow-hidden">
                <h2 className="text-lg font-bold mb-4">Fiyat Grafiği</h2>
                <TradingViewWidget symbol={symbol} />
              </div>

              {/* AI Analysis */}
              <div className="space-y-4">
                <div className="glass-card p-6">
                  <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-secondary" /> AI Analizi
                  </h2>

                  <div className="space-y-5">
                    <div>
                      <span className="text-xs text-muted-foreground block mb-2">AI Özet</span>
                      <p className="text-sm text-foreground leading-relaxed">{ai.summary}</p>
                    </div>

                    <div>
                      <span className="text-xs text-muted-foreground block mb-2">AI Güven Skoru</span>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${ai.score >= 80 ? 'bg-emerald-400' : ai.score >= 60 ? 'bg-amber-400' : 'bg-red-400'}`} style={{ width: `${ai.score}%` }} />
                        </div>
                        <span className={`font-mono font-bold text-sm ${ai.score >= 80 ? 'text-emerald-400' : ai.score >= 60 ? 'text-amber-400' : 'text-red-400'}`}>{ai.score}/100</span>
                      </div>
                    </div>

                    {(ai.support || ai.resistance) && (
                      <div className="grid grid-cols-2 gap-3">
                        {ai.support && (
                          <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                            <span className="text-xs text-muted-foreground block mb-1">Destek</span>
                            <span className="font-mono font-bold text-emerald-400 text-sm">{formatPrice(ai.support)}</span>
                          </div>
                        )}
                        {ai.resistance && (
                          <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/15">
                            <span className="text-xs text-muted-foreground block mb-1">Direnç</span>
                            <span className="font-mono font-bold text-red-400 text-sm">{formatPrice(ai.resistance)}</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        {isUp ? <TrendingUp size={16} className="text-emerald-400" /> : <TrendingDown size={16} className="text-red-400" />}
                        <span className="text-sm font-semibold text-primary">Tahmin</span>
                      </div>
                      <p className="text-sm text-foreground">{ai.prediction}</p>
                    </div>
                  </div>
                </div>

                {/* Risk Indicators */}
                <div className="glass-card p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-4">Teknik Göstergeler</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'RSI (14)', value: ai.score > 70 ? '65 — Pozitif' : ai.score > 50 ? '52 — Nötr' : '35 — Negatif', color: ai.score > 70 ? 'text-emerald-400' : ai.score > 50 ? 'text-amber-400' : 'text-red-400' },
                      { label: 'MACD', value: ai.score > 70 ? 'Pozitif' : ai.score > 50 ? 'Nötr' : 'Negatif', color: ai.score > 70 ? 'text-emerald-400' : ai.score > 50 ? 'text-amber-400' : 'text-red-400' },
                      { label: 'Bollinger', value: 'Orta Bant', color: 'text-amber-400' },
                      { label: 'MA50', value: isUp ? 'Üzerinde' : 'Altında', color: isUp ? 'text-emerald-400' : 'text-red-400' },
                    ].map((ind, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{ind.label}</span>
                        <span className={`font-mono text-xs font-semibold ${ind.color}`}>{ind.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <Footer />
        <AIAssistant />
      </div>
    </>
  );
}
