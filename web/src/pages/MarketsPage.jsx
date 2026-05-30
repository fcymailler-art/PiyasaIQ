import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, TrendingUp, TrendingDown, Sparkles, ArrowUpDown, Activity, ChevronLeft, ChevronRight } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AIChatWidget from '../components/AIChatWidget';
import { ALL_MARKET_DATA, SECTORS, SIGNAL_STYLE } from '../lib/marketData';

const PAGE_SIZE = 25;

function generateSparkline(change) {
  const trend = change >= 0 ? 1 : -1;
  return Array.from({ length: 10 }, (_, i) => 50 + trend * i * 1.5 + (Math.random() - 0.5) * 6);
}

export default function Markets() {
  const [search, setSearch] = useState('');
  const [sector, setSector] = useState('Tümü');
  const [signal, setSignal] = useState('Tümü');
  const [sortBy, setSortBy] = useState('rank');
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(1);
  const [prices, setPrices] = useState(() => Object.fromEntries(ALL_MARKET_DATA.map(m => [m.symbol, m.price])));

  // Live price simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => {
        const next = { ...prev };
        ALL_MARKET_DATA.forEach(m => {
          const delta = (Math.random() - 0.49) * 0.002;
          next[m.symbol] = +(prev[m.symbol] * (1 + delta)).toFixed(m.price < 0.001 ? 8 : m.price < 1 ? 5 : m.price < 100 ? 3 : 2);
        });
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Filter + sort
  const filtered = useMemo(() => {
    let data = ALL_MARKET_DATA
      .filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.symbol.toLowerCase().includes(search.toLowerCase()))
      .filter(m => sector === 'Tümü' || m.sector === sector)
      .filter(m => signal === 'Tümü' || m.aiSignal === signal);

    data.sort((a, b) => {
      let va = a[sortBy], vb = b[sortBy];
      if (sortBy === 'change24h' || sortBy === 'aiScore' || sortBy === 'rank') {
        return sortDir === 'asc' ? va - vb : vb - va;
      }
      return sortDir === 'asc' ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va));
    });
    return data;
  }, [search, sector, signal, sortBy, sortDir]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleSort = (col) => {
    if (sortBy === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortBy(col); setSortDir('asc'); }
    setPage(1);
  };

  // Summary stats
  const bullish = ALL_MARKET_DATA.filter(m => m.aiSignal === 'AL' || m.aiSignal === 'GÜÇLÜ AL').length;
  const bearish = ALL_MARKET_DATA.filter(m => m.aiSignal === 'SAT' || m.aiSignal === 'GÜÇLÜ SAT').length;
  const avgAI = Math.round(ALL_MARKET_DATA.reduce((s, m) => s + m.aiScore, 0) / ALL_MARKET_DATA.length);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-2">Kripto Piyasaları</h1>
          <p className="text-muted-foreground">100+ varlık için anlık fiyatlar, AI analizi ve teknik göstergeler</p>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Toplam Varlık', value: ALL_MARKET_DATA.length.toString(), icon: Activity, color: 'text-primary', bg: 'bg-primary/10' },
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
            <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
              <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span className="text-emerald-400">Canlı</span>
              <span className="ml-2">{filtered.length} varlık</span>
            </div>
          </div>
          {/* Sector pills */}
          <div className="flex gap-2 flex-wrap">
            {SECTORS.slice(0, 12).map(c => (
              <button key={c} onClick={() => { setSector(c); setPage(1); }} className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${sector === c ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>{c}</button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="glass-card overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px]">
              <thead>
                <tr className="border-b border-white/5 bg-muted/20">
                  {[
                    { label: '#', col: 'rank' }, { label: 'Varlık', col: 'name' }, { label: 'Fiyat', col: 'price' },
                    { label: '24s %', col: 'change24h' }, { label: '7G %', col: 'change7d' },
                    { label: 'AI Sinyal', col: 'aiSignal' }, { label: 'AI', col: 'aiScore' },
                    { label: 'RSI', col: 'rsi' }, { label: 'Hacim', col: 'volume' }, { label: 'Sektör', col: 'sector' }, { label: 'Graf', col: null },
                  ].map(h => (
                    <th key={h.label} onClick={() => h.col && toggleSort(h.col)}
                      className={`text-left px-4 py-3.5 text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap ${h.col ? 'cursor-pointer hover:text-foreground' : ''} ${sortBy === h.col ? 'text-primary' : ''}`}
                    >
                      <div className="flex items-center gap-1">{h.label}{h.col && <ArrowUpDown className="w-3 h-3 opacity-50" />}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pageData.map((m, i) => {
                  const sparkData = generateSparkline(m.change24h).map((v, j) => ({ v, i: j }));
                  return (
                    <motion.tr key={m.symbol} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
                      className="border-b border-white/5 hover:bg-muted/20 transition-colors group"
                    >
                      <td className="px-4 py-3.5 text-sm text-muted-foreground font-mono">{m.rank}</td>
                      <td className="px-4 py-3.5">
                        <Link to={`/piyasalar/${m.pair}`} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-muted to-muted/30 flex items-center justify-center font-mono font-bold text-xs text-foreground group-hover:from-primary/20 group-hover:to-secondary/20 transition-all">{m.symbol.slice(0, 2)}</div>
                          <div>
                            <div className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{m.name}</div>
                            <div className="text-xs text-muted-foreground">{m.symbol}</div>
                          </div>
                        </Link>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="font-mono font-semibold text-sm text-foreground">${prices[m.symbol]?.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">{m.mcap}</div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`font-mono text-sm font-semibold ${m.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {m.change24h >= 0 ? '+' : ''}{m.change24h}%
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`font-mono text-xs font-semibold ${m.change7d >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {m.change7d >= 0 ? '+' : ''}{m.change7d}%
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
                      <td className="px-4 py-3.5 font-mono text-xs text-muted-foreground">{m.volume}</td>
                      <td className="px-4 py-3.5">
                        <span className="px-2 py-1 rounded-md bg-muted/40 text-xs text-muted-foreground whitespace-nowrap">{m.sector}</span>
                      </td>
                      <td className="px-4 py-3.5 w-24">
                        <ResponsiveContainer width="100%" height={32}>
                          <AreaChart data={sparkData}>
                            <Area type="monotone" dataKey="v" stroke={m.change24h >= 0 ? '#10B981' : '#EF4444'} fill="transparent" strokeWidth={1.5} dot={false} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
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
              <>
                {i > 0 && arr[i - 1] !== p - 1 && <span key={`e${p}`} className="text-muted-foreground px-1">…</span>}
                <button key={p} onClick={() => setPage(p)} className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${p === page ? 'bg-primary text-white' : 'border border-white/10 text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>{p}</button>
              </>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 disabled:opacity-30 transition-all">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <Footer />
      <AIChatWidget />
    </div>
  );
}
