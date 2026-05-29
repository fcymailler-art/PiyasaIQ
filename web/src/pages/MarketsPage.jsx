import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Search, TrendingUp, TrendingDown } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import AIScoreBadge from '@/components/AIScoreBadge';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useMarketData } from '@/hooks/useMarketData';
import { formatPrice } from '@/utils/formatPrice';
import { formatPercentage } from '@/utils/formatPercentage';
import { Link } from 'react-router-dom';

const MarketsPage = () => {
  const { markets, loading, error } = useMarketData();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMarkets = markets.filter((market) =>
    market.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const topGainers = [...markets]
    .sort((a, b) => b.priceChangePercent - a.priceChangePercent)
    .slice(0, 5);

  const topLosers = [...markets]
    .sort((a, b) => a.priceChangePercent - b.priceChangePercent)
    .slice(0, 5);

  return (
    <>
      <Helmet>
        <title>Piyasalar - PiyasaIQ</title>
        <meta name="description" content="Kripto ve forex piyasalarını gerçek zamanlı takip edin. AI destekli analiz ve tahminlerle akıllı yatırım kararları alın." />
      </Helmet>

      <div className="min-h-screen bg-background text-text">
        <Navigation />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
              Piyasalar
            </h1>
            <p className="text-secondary text-lg mb-8">
              Gerçek zamanlı piyasa verileri ve AI destekli analizler
            </p>

            <div className="relative mb-8">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" />
              <Input
                type="text"
                placeholder="Piyasa ara (örn: BTC, ETH, EUR)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-card border-white/10 text-text placeholder:text-secondary"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="rounded-3xl border border-white/10 bg-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp size={20} className="text-emerald-400" />
                  <h2 className="text-lg font-bold">En Çok Yükselenler</h2>
                </div>
                <div className="space-y-3">
                  {topGainers.map((market) => (
                    <Link
                      key={market.symbol}
                      to={`/piyasalar/${market.symbol}`}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-hover transition-colors duration-200"
                    >
                      <span className="font-medium">{market.symbol}</span>
                      <span className="text-emerald-400 font-semibold">
                        {formatPercentage(market.priceChangePercent)}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingDown size={20} className="text-red-400" />
                  <h2 className="text-lg font-bold">En Çok Düşenler</h2>
                </div>
                <div className="space-y-3">
                  {topLosers.map((market) => (
                    <Link
                      key={market.symbol}
                      to={`/piyasalar/${market.symbol}`}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-hover transition-colors duration-200"
                    >
                      <span className="font-medium">{market.symbol}</span>
                      <span className="text-red-400 font-semibold">
                        {formatPercentage(market.priceChangePercent)}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-card overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-transparent">
                      <TableHead className="text-secondary">Sembol</TableHead>
                      <TableHead className="text-secondary">Fiyat</TableHead>
                      <TableHead className="text-secondary">24h Değişim</TableHead>
                      <TableHead className="text-secondary">Hacim</TableHead>
                      <TableHead className="text-secondary">AI Score</TableHead>
                      <TableHead className="text-secondary">AI Özet</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      [...Array(10)].map((_, i) => (
                        <TableRow key={i} className="border-white/10">
                          <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                          <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                          <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                          <TableCell><Skeleton className="h-5 w-28" /></TableCell>
                          <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                          <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                        </TableRow>
                      ))
                    ) : error ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-12 text-secondary">
                          Veriler yüklenirken bir hata oluştu. Lütfen tekrar deneyin.
                        </TableCell>
                      </TableRow>
                    ) : filteredMarkets.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-12 text-secondary">
                          Arama kriterlerine uygun piyasa bulunamadı.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredMarkets.map((market) => {
                        const isPositive = market.priceChangePercent > 0;
                        return (
                          <TableRow
                            key={market.symbol}
                            className="border-white/10 hover:bg-hover transition-colors duration-200 cursor-pointer"
                            onClick={() => window.location.href = `/piyasalar/${market.symbol}`}
                          >
                            <TableCell className="font-semibold">{market.symbol}</TableCell>
                            <TableCell className="font-mono">{formatPrice(market.price)}</TableCell>
                            <TableCell>
                              <span className={`font-semibold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                                {formatPercentage(market.priceChangePercent)}
                              </span>
                            </TableCell>
                            <TableCell className="font-mono text-secondary">
                              {formatPrice(market.volume, 'USD')}
                            </TableCell>
                            <TableCell>
                              <AIScoreBadge score={market.aiScore} size="sm" showLabel={false} />
                            </TableCell>
                            <TableCell className="text-secondary text-sm max-w-md truncate">
                              {market.aiSummary || 'Analiz bekleniyor...'}
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
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

export default MarketsPage;