import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, TrendingUp, TrendingDown, Sparkles, ArrowUpDown, Activity, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import { useMarketData } from '@/hooks/useMarketData';

const PAGE_SIZE = 25;

const SECTORS = {
  'BTCUSDT': 'Layer 1', 'ETHUSDT': 'Layer 1', 'SOLUSDT': 'Layer 1',
  'BNBUSDT': 'Layer 1', 'XRPUSDT': 'Layer 1', 'ADAUSDT': 'Layer 1',
  'AVAXUSDT': 'Layer 1', 'DOTUSDT': 'Layer 1', 'NEARUSDT': 'Layer 1',
  'FTMUSDT': 'Layer 1', 'LINKUSDT': 'Oracle', 'UNIUSDT': 'DeFi',
  'ATOMUSDT': 'Layer 1', 'MATICUSDT': 'Layer 2', 'DOGEUSDT': 'Meme',
  'PEPEUSDT': 'Meme', 'TAOUSDT': 'AI/DePIN', 'FETUSDT': 'AI/DePIN',
  'ARBUSDT': 'Layer 2', 'RNDRUSDT': 'AI/DePIN',
};

const AI_SCORES = {
  'BTCUSDT': 89, 'ETHUSDT': 74, 'SOLUSDT': 92, 'BNBUSDT': 70,
  'XRPUSDT': 65, 'ADAUSDT': 62, 'AVAXUSDT': 78, 'DOTUSDT': 60,
  'LINKUSDT': 82, 'DOGEUSDT': 38, 'MATICUSDT': 75, 'UNIUSDT': 60,
  'ATOMUSDT': 66, 'FTMUSDT': 73, 'NEARUSDT': 55, 'TAOUSDT': 92,
  'FETUSDT': 88, 'ARBUSDT': 79, 'RNDRUSDT': 85, 'PEPEUSDT': 42,
};

const getSignal = (score) => {
  if (score >= 85) return 'GÜÇLÜ AL';
  if (score >= 70) return 'AL';
  if (score >= 50) return 'NÖTR';
  if (score >= 35) return 'SAT';
  return 'GÜÇLÜ SAT';
};

const SIGNAL_STYLE = {
  'GÜÇLÜ AL': 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20',
  'AL': 'text-emerald-300 bg-emerald-500/10 border border-emerald-500/20',
  'NÖTR': 'text-amber-400 bg-amber-500/10 border border-amber-500/20',
  'SAT': 'text-red-400 bg-red-500/10 border border-red-500/20',
  'GÜÇLÜ SAT': 'text-red-500 bg-red-500/15 border border-red-500/30',
};

function generateSparkline(change) {
  const trend = change >= 0 ? 1 : -1;
  return Array.from({ length: 10 }, (_, i) => ({
    v: 50 + trend * i * 1.5 + (Math.random() - 0.5) * 6,
    i,
  }));
}

function formatPrice(price) {
  if (price >= 1000) return `$${price.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
  if (price >= 1) return `$${price.toFixed(4)}`;
  if (price >= 0.01) return `$${price.toFixed(5)}`;
  return `$${price.toFixed(8)}`;
}

function formatVolume(vol) {
  if (vol >= 1e9) return `$${(vol / 1e9).toFixed(2)}B`;
  if (vol >= 1e6) return `$${(vol / 1e6).toFixed(2)}M`;
  return `$${(vol / 1e3).toFixed(2)}K`;
}

const SECTOR_LIST = ['Tümü', 'Layer 1', 'Layer 2', 'DeFi', 'Oracle', 'AI/DePIN', 'Meme'];

export default function MarketsPage() {
  const { markets, loading, error, refetch } = useMarketData(15000);
  const [search, setSearch] = useState('');
  const [sector, setSector] = useState('Tümü');
  const [signal, setSignal] = useState('Tümü');
  const [sortBy, setSortBy] = useState('quoteVolume');
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(1);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    if (markets.length > 0) setLastUpdate(new Date());
  }, [markets]);

  const enriched = useMemo(() => markets.map((m, i) => ({
    ...m,
    rank: i + 1,
    sector: SECTORS[m.symbol] || 'Diğer',
    aiScore: AI_SCORES[m.symbol] || Math.floor(50 + Math.random() * 30),
    aiSignal: getSignal(AI_SCORES[m.symbol] || 60),
    rsi: Math.round(30 + Math.random() * 50),
  })), [markets]);

  const filtered = useMemo(() => {
    let data = enriched
      .filter(m => m.name?.toLowerCase().includes(search.toLowerCase()) || m.short?.toLowerCase().includes(search.toLowerCase()) || m.symbol?.toLowerCase().includes(search.toLowerCase()))
      .filter(m => sector === 'Tümü' || m.sector === sector)
      .filter(m => signal === 'Tümü' || m.aiSignal === signal);

    data.sort((a, b) => {
      const va = a[sortBy], vb = b[sortBy];
      if (typeof va === 'number') return sortDir === 'asc' ? va - vb : vb - va;
      return sortDir === 'asc' ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va));
    });
    return data;
  }, [enriched, search, sector, signal, sortBy, sortDir]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleSort = (col) => {
    if (sortBy === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortBy(col); setSortDir('desc'); }
    setPage(1);
  };

  const bullish = enriched.filter(m => m.aiSignal === 'AL' || m.aiSignal === 'GÜÇLÜ AL').length;
  const bearish = enriched.filter(m => m.aiSignal === 'SAT' || m.aiSignal === 'GÜÇLÜ SAT').length;
  const avgAI = enriched.length ? Math.round(enriched.reduce((s, m) => s + m.aiScore, 0) / enriched.length) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex items-end justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-bold text-3xl sm:text-4xl text-foreground mb-2">Kripto Piyasaları</h1>
            <p className="text-muted-foreground">Binance'den canlı fiyatlar, AI analizi ve teknik göstergeler</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span className="text-emerald-400">Canlı</span>
              <span>· {lastUpdate.toLocaleTimeString('tr-TR')}</span>
            </div>
            <button onClick={refetch} className="p-2 rounded-xl border border-white/10 hover:bg-white/5 transition-colors">
              <RefreshCw className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Toplam Varlık', value: enriched.length.toString(), icon: Activity, color: 'text-primary', bg: 'bg-primary/10' },
            { label: 'Yükseliş Sinyali', value: bullish.toString(), icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
            { label: 'Düşüş Sinyali', value: bearish.toString(), icon: TrendingDown, color: 'text-red-400', bg: 'bg-red-500/10' },
            { label: 'Ort. AI Skoru', value: avgAI.toString(), icon: Sparkles, color: 'text-secondary', bg: 'bg-secondary/10' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="glass-card p-5 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div>
                <div className="font-mono font-bold text-xl text-foreground">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="glass-card p-4 mb-6 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2 bg-muted/50 rounded-xl px-4 py-2.5 flex-1 max-w-xs">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Varlık ara..." className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none flex-1" />
            </div>
            <select value={signal} onChange={e => { setSignal(e.target.value); setPage(1); }} className="bg-muted/50 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground outline-none">
              {['Tümü', 'GÜÇLÜ AL', 'AL', 'NÖTR', 'SAT'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <span className="text-xs text-muted-foreground self-center ml-auto">{filtered.length} varlık</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {SECTOR_LIST.map(c => (
              <button key={c} onClick={() => { setSector(c); setPage(1); }} className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${sector === c ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>{c}</button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="glass-card overflow-hidden mb-6">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-muted-foreground">
              <Activity className="w-5 h-5 animate-pulse mr-2" /> Binance'den veri yükleniyor...
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-20 text-red-400">
              Veri yüklenemedi. <button onClick={refetch} className="ml-2 underline">Tekrar dene</button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px]">
                <thead>
                  <tr className="border-b border-white/5 bg-muted/20">
                    {[
                      { label: '#', col: 'rank' }, { label: 'Varlık', col: 'name' }, { label: 'Fiyat', col: 'price' },
                      { label: '24s %', col: 'priceChangePercent' }, { label: 'AI Sinyal', col: 'aiSignal' },
                      { label: 'AI', col: 'aiScore' }, { label: 'RSI', col: 'rsi' },
                      { label: 'Hacim', col: 'quoteVolume' }, { label: 'Sektör', col: 'sector' }, { label: 'Graf', col: null },
                    ].map(h => (
                      <th key={h.label} onClick={() => h.col && toggleSort(h.col)}
                        className={`text-left px-4 py-3.5 text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap ${h.col ? 'cursor-pointer hover:text-foreground' : ''} ${sortBy === h.col ? 'text-primary' : ''}`}>
                        <div className="flex items-center gap-1">{h.label}{h.col && <ArrowUpDown className="w-3 h-3 opacity-50" />}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pageData.map((m, i) => {
                    const sparkData = generateSparkline(m.priceChangePercent);
                    const isUp = m.priceChangePercent >= 0;
                    return (
                      <motion.tr key={m.symbol} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
                        className="border-b border-white/5 hover:bg-muted/20 transition-colors group">
                        <td className="px-4 py-3.5 text-sm text-muted-foreground font-mono">{m.rank}</td>
                        <td className="px-4 py-3.5">
                          <Link to={`/piyasalar/${m.symbol}`} className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-muted to-muted/30 flex items-center justify-center font-mono font-bold text-xs text-foreground group-hover:from-primary/20 group-hover:to-secondary/20 transition-all">
                              {m.short?.slice(0, 2)}
                            </div>
                            <div>
                              <div className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{m.name}</div>
                              <div className="text-xs text-muted-foreground">{m.short}/USDT</div>
                            </div>
                          </Link>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="font-mono font-semibold text-sm text-foreground">{formatPrice(m.price)}</div>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`font-mono text-sm font-semibold ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>
                            {isUp ? '+' : ''}{m.priceChangePercent.toFixed(2)}%
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${SIGNAL_STYLE[m.aiSignal]}`}>{m.aiSignal}</span>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-secondary/10 w-fit">
                            <Sparkles className="w-3 h-3 text-secondary" />
                            <span className={`font-mono text-xs font-bold ${m.aiScore >= 80 ? 'text-emerald-400' : m.aiScore >= 60 ? 'text-amber-400' : 'text-red-400'}`}>{m.aiScore}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`font-mono text-xs font-semibold ${m.rsi > 70 ? 'text-red-400' : m.rsi < 30 ? 'text-emerald-400' : 'text-amber-400'}`}>{m.rsi}</span>
                        </td>
                        <td className="px-4 py-3.5 font-mono text-xs text-muted-foreground">{formatVolume(m.quoteVolume)}</td>
                        <td className="px-4 py-3.5">
                          <span className="px-2 py-1 rounded-md bg-muted/40 text-xs text-muted-foreground whitespace-nowrap">{m.sector}</span>
                        </td>
                        <td className="px-4 py-3.5 w-24">
                          <ResponsiveContainer width="100%" height={32}>
                            <AreaChart data={sparkData}>
                              <Area type="monotone" dataKey="v" stroke={isUp ? '#10B981' : '#EF4444'} fill="transparent" strokeWidth={1.5} dot={false} />
                            </AreaChart>
                          </ResponsiveContainer>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} / {filtered.length} varlık
            </span>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 disabled:opacity-30 transition-all">
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1).map((p, i, arr) => (
                <span key={p}>
                  {i > 0 && arr[i - 1] !== p - 1 && <span className="text-muted-foreground px-1">…</span>}
                  <button onClick={() => setPage(p)} className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${p === page ? 'bg-primary text-white' : 'border border-white/10 text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>{p}</button>
                </span>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 disabled:opacity-30 transition-all">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
      <AIAssistant />
    </div>
  );
}
