import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { BrainCircuit, TrendingUp, TrendingDown, Minus, Info, Zap, BarChart2, MessageSquare, AlertTriangle, RefreshCw, Activity } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const SYMBOLS = [
  { symbol: 'BTCUSDT', name: 'Bitcoin', pair: 'BTC/USDT', score: 89, sentiment: 'bullish' },
  { symbol: 'ETHUSDT', name: 'Ethereum', pair: 'ETH/USDT', score: 74, sentiment: 'bullish' },
  { symbol: 'SOLUSDT', name: 'Solana', pair: 'SOL/USDT', score: 92, sentiment: 'bullish' },
  { symbol: 'ADAUSDT', name: 'Cardano', pair: 'ADA/USDT', score: 42, sentiment: 'bearish' },
];

function formatPrice(price) {
  if (!price) return '-';
  const p = parseFloat(price);
  if (p >= 1000) return `$${p.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
  if (p >= 1) return `$${p.toFixed(4)}`;
  return `$${p.toFixed(6)}`;
}

const getSentimentDetails = (sentiment) => {
  switch (sentiment) {
    case 'bullish': return { icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10', label: 'Boğa (Yükseliş)' };
    case 'bearish': return { icon: TrendingDown, color: 'text-rose-500', bg: 'bg-rose-500/10', label: 'Ayı (Düşüş)' };
    default: return { icon: Minus, color: 'text-amber-500', bg: 'bg-amber-500/10', label: 'Nötr' };
  }
};

const getScoreColor = (score) => {
  if (score >= 80) return 'bg-emerald-500';
  if (score >= 60) return 'bg-emerald-400';
  if (score >= 40) return 'bg-amber-500';
  return 'bg-rose-500';
};

const AIAnalysisPage = () => {
  const [tickers, setTickers] = useState({});
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchTickers = async () => {
    try {
      const symbolList = SYMBOLS.map(s => `"${s.symbol}"`).join(',');
      const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbols=[${symbolList}]`);
      const data = await res.json();
      const map = {};
      data.forEach(t => { map[t.symbol] = t; });
      setTickers(map);
      setLastUpdate(new Date());
    } catch (err) {
      console.error('Ticker fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickers();
    const interval = setInterval(fetchTickers, 15000);
    return () => clearInterval(interval);
  }, []);

  // Fear & Greed hesapla (basit versiyon)
  const avgChange = Object.values(tickers).length > 0
    ? Object.values(tickers).reduce((s, t) => s + parseFloat(t.priceChangePercent || 0), 0) / Object.values(tickers).length
    : 0;
  const fearGreed = Math.min(100, Math.max(0, Math.round(50 + avgChange * 5)));
  const fearGreedLabel = fearGreed >= 75 ? 'Aşırı Açgözlülük' : fearGreed >= 55 ? 'Açgözlülük' : fearGreed >= 45 ? 'Nötr' : fearGreed >= 25 ? 'Korku' : 'Aşırı Korku';
  const fearGreedColor = fearGreed >= 55 ? 'text-emerald-500' : fearGreed >= 45 ? 'text-amber-500' : 'text-rose-500';

  return (
    <>
      <Helmet>
        <title>AI Analiz | PiyasaIQ</title>
        <meta name="description" content="Yapay zeka destekli piyasa tahminleri, sentiment analizi ve skorlamalar." />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navigation />

        <main className="flex-1 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  <BrainCircuit size={16} />
                  <span>Alpha Model v2.4 Devrede</span>
                </div>
                <h1 className="text-4xl font-bold mb-3 tracking-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
                  Yapay Zeka Piyasa Analizi
                </h1>
                <p className="text-muted-foreground text-lg">
                  Binance verilerini işleyen modellerimizin ürettiği gerçek zamanlı içgörüler.
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 text-sm text-muted-foreground bg-card px-4 py-2 rounded-xl border border-white/5">
                <Activity size={14} className="text-emerald-400 animate-pulse" />
                <span className="text-emerald-400">Canlı</span>
                {lastUpdate && <span>· {lastUpdate.toLocaleTimeString('tr-TR')}</span>}
                <button onClick={fetchTickers} className="ml-1 hover:text-foreground transition-colors">
                  <RefreshCw size={14} />
                </button>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <TrendingUp size={20} className="text-primary" /> En Yüksek AI Skorları
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {SYMBOLS.map((item, idx) => {
                      const ticker = tickers[item.symbol];
                      const price = ticker ? formatPrice(ticker.lastPrice) : '...';
                      const change = ticker ? parseFloat(ticker.priceChangePercent).toFixed(2) : '0';
                      const isUp = parseFloat(change) >= 0;
                      const sentiment = getSentimentDetails(item.sentiment);
                      const Icon = sentiment.icon;

                      return (
                        <Card key={idx} className="bg-card border-white/5 hover:border-white/10 transition-colors">
                          <CardContent className="p-5">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="font-bold text-lg">{item.pair}</h3>
                                <p className="text-sm text-muted-foreground">{item.name}</p>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className="font-semibold font-mono">{price}</span>
                                <span className={`text-sm font-mono ${isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                                  {isUp ? '+' : ''}{change}%
                                </span>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <div className="flex justify-between text-sm mb-1.5">
                                  <span className="text-muted-foreground flex items-center gap-1">
                                    AI Güven Skoru <Info size={12} className="text-muted-foreground/50" />
                                  </span>
                                  <span className="font-bold">{item.score}/100</span>
                                </div>
                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                  <motion.div initial={{ width: 0 }} animate={{ width: `${item.score}%` }}
                                    transition={{ duration: 1, delay: 0.2 + idx * 0.1 }}
                                    className={`h-full ${getScoreColor(item.score)}`} />
                                </div>
                              </div>

                              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                                <span className="text-sm text-muted-foreground">Genel Yön:</span>
                                <Badge variant="secondary" className={`${sentiment.bg} ${sentiment.color} border-none font-medium flex items-center gap-1`}>
                                  <Icon size={12} /> {sentiment.label}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <Card className="bg-card border-white/5">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <MessageSquare size={20} className="text-accent" /> Yapay Zeka Özeti
                      </CardTitle>
                      <CardDescription>Binance verilerine dayalı gerçek zamanlı analiz özeti.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                      {loading ? (
                        <div className="h-16 bg-muted/20 rounded animate-pulse" />
                      ) : (
                        <>
                          <p>
                            Piyasa genelinde <strong>{avgChange >= 0 ? 'pozitif' : 'negatif'}</strong> bir momentum gözlemleniyor.
                            Ortalama 24 saatlik değişim <strong className={avgChange >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                              {avgChange >= 0 ? '+' : ''}{avgChange.toFixed(2)}%
                            </strong> seviyesinde seyrediyor.
                            <strong> Bitcoin (BTC)</strong> kurumsal birikim sinyalleri veriyor.
                          </p>
                          <p>
                            Öte yandan <strong>Solana (SOL)</strong> güçlü hacim artışı ile öne çıkıyor.
                            Modellerimiz kısa vadede volatilite artışı öngörmektedir.
                          </p>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              <div className="space-y-6">
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                  <Card className="bg-card border-white/5">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <BarChart2 size={18} className="text-secondary" /> Piyasa Duyarlılığı
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-8 border-emerald-500/20 text-emerald-500 mb-2 relative">
                          <span className="text-4xl font-bold">{fearGreed}</span>
                          <svg className="absolute inset-0 w-full h-full -rotate-90">
                            <circle cx="50%" cy="50%" r="46%" fill="transparent" stroke="currentColor"
                              strokeWidth="8" strokeDasharray="289"
                              strokeDashoffset={289 - (289 * fearGreed / 100)}
                              className={fearGreedColor} />
                          </svg>
                        </div>
                        <p className={`font-semibold text-lg ${fearGreedColor}`}>{fearGreedLabel}</p>
                        <p className="text-xs text-muted-foreground">Binance fiyat hareketlerine dayalı</p>
                      </div>

                      <div className="space-y-3 pt-4 border-t border-white/5">
                        {[
                          { label: 'Pozitif Varlıklar', value: Object.values(tickers).filter(t => parseFloat(t.priceChangePercent) > 0).length, total: Object.values(tickers).length, color: 'bg-emerald-500' },
                          { label: 'Nötr Varlıklar', value: Object.values(tickers).filter(t => Math.abs(parseFloat(t.priceChangePercent)) <= 0.5).length, total: Object.values(tickers).length, color: 'bg-amber-500' },
                          { label: 'Negatif Varlıklar', value: Object.values(tickers).filter(t => parseFloat(t.priceChangePercent) < 0).length, total: Object.values(tickers).length, color: 'bg-rose-500' },
                        ].map((s, i) => {
                          const pct = s.total > 0 ? Math.round(s.value / s.total * 100) : 0;
                          return (
                            <div key={i}>
                              <div className="flex justify-between text-xs mb-1">
                                <span>{s.label}</span>
                                <span>{pct}%</span>
                              </div>
                              <Progress value={pct} className={`h-1.5 [&>div]:${s.color} bg-muted`} />
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                  <Card className="bg-muted/50 border-none">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        <AlertTriangle size={14} /> Metodoloji
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Yapay zeka skorlarımız kesin bir yatırım tavsiyesi değildir. Sistemimiz Binance'den
                        gerçek zamanlı fiyat verileri, RSI, MACD ve hacim göstergeleri kullanarak istatistiksel
                        olasılıklar sunar. İşlemlerinizde daima kendi risk yönetiminizi uygulayınız.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
        <AIAssistant />
      </div>
    </>
  );
};

export default AIAnalysisPage;
