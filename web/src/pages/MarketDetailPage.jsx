import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import AIScoreBadge from '@/components/AIScoreBadge';
import SentimentBadge from '@/components/SentimentBadge';
import RiskBadge from '@/components/RiskBadge';
import NewsCard from '@/components/NewsCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useChartData } from '@/hooks/useChartData';
import apiServerClient from '@/lib/apiServerClient';
import { formatPrice } from '@/utils/formatPrice';
import { formatPercentage } from '@/utils/formatPercentage';

const MarketDetailPage = () => {
  const { symbol } = useParams();
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const { chartData, loading: chartLoading } = useChartData(symbol, '1h');

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true);
        const response = await apiServerClient.fetch(`/markets/${symbol}`);
        const data = await response.json();
        setMarketData(data);
      } catch (err) {
        console.error('Failed to fetch market data:', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchNews = async () => {
      try {
        const response = await apiServerClient.fetch('/news');
        const data = await response.json();
        setNews(data.slice(0, 3));
      } catch (err) {
        console.error('Failed to fetch news:', err);
      }
    };

    if (symbol) {
      fetchMarketData();
      fetchNews();
    }
  }, [symbol]);

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Skeleton className="h-10 w-64 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Skeleton className="h-96 w-full rounded-3xl" />
            </div>
            <div>
              <Skeleton className="h-96 w-full rounded-3xl" />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!marketData) {
    return (
      <>
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-secondary">Piyasa verisi bulunamadı.</p>
          <Button className="mt-4" asChild>
            <Link to="/piyasalar">Piyasalara Dön</Link>
          </Button>
        </div>
      </>
    );
  }

  const isPositive = marketData.priceChangePercent > 0;

  return (
    <>
      <Helmet>
        <title>{`${symbol} - Piyasa Detayı | PiyasaIQ`}</title>
        <meta name="description" content={`${symbol} için gerçek zamanlı fiyat, AI analizi ve tahminler. ${marketData.aiSummary}`} />
      </Helmet>

      <div className="min-h-screen bg-background text-text">
        <Navigation />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button variant="ghost" className="mb-6 text-secondary hover:text-text" asChild>
              <Link to="/piyasalar">
                <ArrowLeft size={18} className="mr-2" />
                Piyasalara Dön
              </Link>
            </Button>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
                  {symbol}
                </h1>
                <div className="flex items-baseline gap-4">
                  <span className="text-3xl font-bold">{formatPrice(marketData.price)}</span>
                  <span className={`text-xl font-semibold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                    {formatPercentage(marketData.priceChangePercent)}
                  </span>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <AIScoreBadge score={marketData.aiScore} size="lg" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="lg:col-span-2">
                <div className="rounded-3xl border border-white/10 bg-card p-6">
                  <h2 className="text-xl font-bold mb-6">Fiyat Grafiği</h2>
                  {chartLoading ? (
                    <Skeleton className="h-80 w-full" />
                  ) : (
                    <ResponsiveContainer width="100%" height={320}>
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis 
                          dataKey="time" 
                          stroke="rgba(148,163,184,0.5)"
                          style={{ fontSize: '12px' }}
                        />
                        <YAxis 
                          stroke="rgba(148,163,184,0.5)"
                          style={{ fontSize: '12px' }}
                          domain={['auto', 'auto']}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#121A2F',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                            color: '#F8FAFC',
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="close"
                          stroke="#3B82F6"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="p-4 rounded-xl bg-hover">
                      <span className="text-xs text-secondary block mb-1">24h Yüksek</span>
                      <span className="text-lg font-bold">{formatPrice(marketData.high24h)}</span>
                    </div>
                    <div className="p-4 rounded-xl bg-hover">
                      <span className="text-xs text-secondary block mb-1">24h Düşük</span>
                      <span className="text-lg font-bold">{formatPrice(marketData.low24h)}</span>
                    </div>
                    <div className="p-4 rounded-xl bg-hover">
                      <span className="text-xs text-secondary block mb-1">Açılış</span>
                      <span className="text-lg font-bold">{formatPrice(marketData.openPrice)}</span>
                    </div>
                    <div className="p-4 rounded-xl bg-hover">
                      <span className="text-xs text-secondary block mb-1">Hacim</span>
                      <span className="text-lg font-bold">{formatPrice(marketData.volume, 'USD')}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-3xl border border-white/10 bg-card p-6">
                  <h2 className="text-xl font-bold mb-6">AI Analizi</h2>

                  <div className="space-y-6">
                    <div>
                      <span className="text-sm text-secondary block mb-2">AI Özet</span>
                      <p className="text-text leading-relaxed">{marketData.aiSummary}</p>
                    </div>

                    <div>
                      <span className="text-sm text-secondary block mb-2">Sentiment</span>
                      <SentimentBadge sentiment={marketData.sentiment} />
                    </div>

                    <div>
                      <span className="text-sm text-secondary block mb-2">Risk Seviyesi</span>
                      <RiskBadge level={marketData.riskLevel} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-hover">
                        <span className="text-xs text-secondary block mb-1">Destek</span>
                        <span className="text-base font-bold text-emerald-400">
                          {formatPrice(marketData.supportLevel)}
                        </span>
                      </div>
                      <div className="p-4 rounded-xl bg-hover">
                        <span className="text-xs text-secondary block mb-1">Direnç</span>
                        <span className="text-base font-bold text-red-400">
                          {formatPrice(marketData.resistanceLevel)}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
                      <div className="flex items-center gap-2 mb-2">
                        {marketData.prediction24h?.includes('yükseliş') || marketData.prediction24h?.includes('bullish') ? (
                          <TrendingUp size={18} className="text-emerald-400" />
                        ) : (
                          <TrendingDown size={18} className="text-red-400" />
                        )}
                        <span className="text-sm font-semibold text-primary">24 Saat Tahmini</span>
                      </div>
                      <p className="text-sm text-text">{marketData.prediction24h}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>
                İlgili Haberler
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {news.map((article, index) => (
                  <NewsCard key={index} article={article} index={index} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <Footer />
        <AIAssistant />
      </div>
    </>
  );
};

export default MarketDetailPage;