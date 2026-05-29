import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Filter, SlidersHorizontal, Download, BookmarkPlus, ArrowUpDown, Search } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatPrice } from '@/utils/formatPrice';
import { formatPercentage } from '@/utils/formatPercentage';
import { toast } from 'sonner';

const ScreenerPage = () => {
  // Mock data for screener results
  const [results] = useState([
    { symbol: 'BTCUSDT', price: 64230.50, change: 2.4, volume: 45000000000, rsi: 65, macd: 'Bullish', sector: 'Layer 1' },
    { symbol: 'ETHUSDT', price: 3450.20, change: 4.1, volume: 18000000000, rsi: 72, macd: 'Bullish', sector: 'Layer 1' },
    { symbol: 'SOLUSDT', price: 145.80, change: -1.2, volume: 5000000000, rsi: 45, macd: 'Bearish', sector: 'Layer 1' },
    { symbol: 'LINKUSDT', price: 18.90, change: 8.5, volume: 2100000000, rsi: 78, macd: 'Bullish', sector: 'Layer 1' },
    { symbol: 'AVAXUSDT', price: 132.40, change: 5.2, volume: 3400000000, rsi: 68, macd: 'Bullish', sector: 'Layer 1' },
    { symbol: 'UNIUSDT', price: 11.20, change: -3.4, volume: 800000000, rsi: 38, macd: 'Bearish', sector: 'DeFi' },
    { symbol: 'AAVEUSDT', price: 15.60, change: 1.1, volume: 400000000, rsi: 52, macd: 'Neutral', sector: 'DeFi' },
  ]);

  const handleSaveToWatchlist = () => {
    toast.success("Seçili varlıklar izleme listesine eklendi.");
  };

  const handleExport = () => {
    toast.info("Veriler CSV olarak indiriliyor...");
  };

  return (
    <>
      <Helmet>
        <title>Gelişmiş Tarayıcı | PiyasaIQ</title>
        <meta name="description" content="Kripto ve hisse senetleri için gelişmiş filtreleme ve teknik analiz tarayıcısı." />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />

        <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
                Gelişmiş Tarayıcı
              </h1>
              <p className="text-muted-foreground">Kriterlerinize uyan piyasaları bulun.</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-white/10 bg-card hover:bg-white/5" onClick={handleExport}>
                <Download size={16} className="mr-2" /> Dışa Aktar
              </Button>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleSaveToWatchlist}>
                <BookmarkPlus size={16} className="mr-2" /> Listeye Kaydet
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="rounded-2xl border border-white/5 bg-card p-5">
                <div className="flex items-center gap-2 mb-6 text-foreground font-semibold">
                  <Filter size={18} className="text-primary" /> Filtreler
                </div>

                <div className="space-y-6">
                  {/* Preset Filters */}
                  <div>
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Hızlı Şablonlar</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium cursor-pointer hover:bg-primary/20 transition-colors">Aşırı Satım (RSI &lt; 30)</span>
                      <span className="px-3 py-1.5 rounded-lg bg-white/5 text-foreground/80 text-xs font-medium cursor-pointer hover:bg-white/10 transition-colors">Aşırı Alım (RSI &gt; 70)</span>
                      <span className="px-3 py-1.5 rounded-lg bg-white/5 text-foreground/80 text-xs font-medium cursor-pointer hover:bg-white/10 transition-colors">Hacim Patlaması</span>
                      <span className="px-3 py-1.5 rounded-lg bg-white/5 text-foreground/80 text-xs font-medium cursor-pointer hover:bg-white/10 transition-colors">MACD Kesişimi</span>
                    </div>
                  </div>

                  <div className="h-px w-full bg-white/5" />

                  {/* Manual Filters */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground/80 mb-2 block">Sektör / Kategori</label>
                      <select className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/50 text-foreground">
                        <option>Tümü</option>
                        <option>Layer 1</option>
                        <option>DeFi</option>
                        <option>AI & Big Data</option>
                        <option>Gaming</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground/80 mb-2 block">Piyasa Değeri (USD)</label>
                      <div className="flex items-center gap-2">
                        <Input placeholder="Min" className="bg-black/20 border-white/10 text-foreground h-9" />
                        <span className="text-muted-foreground">-</span>
                        <Input placeholder="Max" className="bg-black/20 border-white/10 text-foreground h-9" />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground/80 mb-2 block">RSI (14)</label>
                      <div className="flex items-center gap-2">
                        <Input placeholder="Min" className="bg-black/20 border-white/10 text-foreground h-9" />
                        <span className="text-muted-foreground">-</span>
                        <Input placeholder="Max" className="bg-black/20 border-white/10 text-foreground h-9" />
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-white/5 hover:bg-white/10 text-foreground border border-white/10">
                    <SlidersHorizontal size={16} className="mr-2" /> Filtreleri Uygula
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Table */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-white/5 bg-card overflow-hidden">
                <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/20">
                  <span className="text-sm font-medium text-muted-foreground">{results.length} eşleşme bulundu</span>
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Sembol ara..." className="h-8 w-48 pl-9 bg-black/40 border-white/10 text-xs text-foreground" />
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-black/10">
                      <TableRow className="border-white/5 hover:bg-transparent">
                        <TableHead className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Sembol</TableHead>
                        <TableHead className="text-xs uppercase tracking-wider text-muted-foreground font-semibold text-right">Fiyat</TableHead>
                        <TableHead className="text-xs uppercase tracking-wider text-muted-foreground font-semibold text-right">
                          <div className="flex items-center justify-end gap-1 cursor-pointer hover:text-foreground">24s Değişim <ArrowUpDown size={12} /></div>
                        </TableHead>
                        <TableHead className="text-xs uppercase tracking-wider text-muted-foreground font-semibold text-right hidden md:table-cell">Hacim</TableHead>
                        <TableHead className="text-xs uppercase tracking-wider text-muted-foreground font-semibold text-center">RSI</TableHead>
                        <TableHead className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">MACD</TableHead>
                        <TableHead className="text-xs uppercase tracking-wider text-muted-foreground font-semibold hidden sm:table-cell">Sektör</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {results.map((row, i) => {
                        const isPositive = row.change > 0;
                        return (
                          <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-colors group">
                            <TableCell className="font-bold text-foreground">{row.symbol}</TableCell>
                            <TableCell className="text-right font-mono text-sm">{formatPrice(row.price)}</TableCell>
                            <TableCell className="text-right">
                              <span className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold ${isPositive ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                                {formatPercentage(row.change)}
                              </span>
                            </TableCell>
                            <TableCell className="text-right font-mono text-xs text-muted-foreground hidden md:table-cell">
                              ${(row.volume / 1000000000).toFixed(2)}B
                            </TableCell>
                            <TableCell className="text-center">
                              <span className={`text-xs font-semibold ${row.rsi > 70 ? 'text-danger' : row.rsi < 30 ? 'text-success' : 'text-muted-foreground'}`}>
                                {row.rsi}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className={`text-xs font-medium ${row.macd === 'Bullish' ? 'text-success' : row.macd === 'Bearish' ? 'text-danger' : 'text-muted-foreground'}`}>
                                {row.macd}
                              </span>
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground hidden sm:table-cell">{row.sector}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ScreenerPage;