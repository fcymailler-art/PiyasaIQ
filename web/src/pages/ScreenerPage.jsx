import { useState } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Sparkles, TrendingUp, TrendingDown, Search, RotateCcw } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AIChatWidget from '../components/AIChatWidget';

const ALL_ASSETS = [
  { symbol: 'BTC', name: 'Bitcoin', pair: 'btcusdt', price: 107842, change: 2.34, volume: '42.3B', rsi: 58, macd: 'Pozitif', aiScore: 87, signal: 'AL', data: [40,45,42,50,55,52,60,65,62,68] },
  { symbol: 'SOL', name: 'Solana', pair: 'solusdt', price: 178.5, change: 5.12, volume: '8.2B', rsi: 65, macd: 'Pozitif', aiScore: 91, signal: 'GÜÇLÜ AL', data: [20,25,30,35,40,38,45,50,48,55] },
  { symbol: 'LINK', name: 'Chainlink', pair: 'linkusdt', price: 18.45, change: 4.21, volume: '1.5B', rsi: 61, macd: 'Pozitif', aiScore: 82, signal: 'AL', data: [15,18,22,25,28,30,35,38,40,42] },
  { symbol: 'AVAX', name: 'Avalanche', pair: 'avaxusdt', price: 38.9, change: -1.23, volume: '1.2B', rsi: 45, macd: 'Nötr', aiScore: 78, signal: 'NÖTR', data: [40,38,35,32,34,30,32,28,30,28] },
  { symbol: 'ETH', name: 'Ethereum', pair: 'ethusdt', price: 3842, change: -0.87, volume: '18.7B', rsi: 48, macd: 'Nötr', aiScore: 72, signal: 'NÖTR', data: [50,48,45,48,42,44,40,42,40,38] },
  { symbol: 'BNB', name: 'BNB', pair: 'bnbusdt', price: 642.3, change: 0.78, volume: '2.8B', rsi: 52, macd: 'Nötr', aiScore: 70, signal: 'NÖTR', data: [35,38,36,40,42,40,45,43,46,48] },
  { symbol: 'XRP', name: 'Ripple', pair: 'xrpusdt', price: 2.34, change: 1.02, volume: '4.1B', rsi: 54, macd: 'Nötr', aiScore: 65, signal: 'NÖTR', data: [30,32,34,33,36,35,38,37,40,42] },
  { symbol: 'DOGE', name: 'Dogecoin', pair: 'dogeusdt', price: 0.412, change: -2.15, volume: '3.5B', rsi: 35, macd: 'Negatif', aiScore: 45, signal: 'SAT', data: [45,42,40,38,36,34,32,35,30,28] },
];

const SIGNAL_STYLE = {
  'GÜÇLÜ AL': 'text-emerald-400 bg-emerald-500/10',
  'AL': 'text-emerald-300 bg-emerald-500/10',
  'NÖTR': 'text-amber-400 bg-amber-500/10',
  'SAT': 'text-red-400 bg-red-500/10',
};

export default function Screener() {
  const [search, setSearch] = useState('');
  const [minScore, setMinScore] = useState(0);
  const [signalFilter, setSignalFilter] = useState('Tümü');
  const [sortBy, setSortBy] = useState('aiScore');

  const filtered = ALL_ASSETS
    .filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || a.symbol.toLowerCase().includes(search.toLowerCase()))
    .filter(a => a.aiScore >= minScore)
    .filter(a => signalFilter === 'Tümü' || a.signal === signalFilter)
    .sort((a, b) => sortBy === 'aiScore' ? b.aiScore - a.aiScore : b.change - a.change);

  const reset = () => { setSearch(''); setMinScore(0); setSignalFilter('Tümü'); setSortBy('aiScore'); };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <SlidersHorizontal className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI Eleme Motoru</span>
          </div>
          <h1 className="font-heading font-bold text-4xl text-foreground mb-2">Varlık Eleme</h1>
          <p className="text-muted-foreground">Filtreler ve AI skoru ile ideal yatırım fırsatlarını bulun</p>
        </motion.div>

        {/* Filters */}
        <div className="glass-card p-6 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">Arama</label>
              <div className="flex items-center gap-2 bg-muted/50 rounded-xl px-3 py-2.5">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="BTC, Ethereum..." className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none flex-1" />
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">Min AI Skoru: <span className="text-primary font-mono">{minScore}</span></label>
              <input type="range" min={0} max={100} value={minScore} onChange={e => setMinScore(+e.target.value)} className="w-full accent-primary" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">Sinyal</label>
              <select value={signalFilter} onChange={e => setSignalFilter(e.target.value)} className="w-full bg-muted/50 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground outline-none">
                {['Tümü', 'GÜÇLÜ AL', 'AL', 'NÖTR', 'SAT'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">Sıralama</label>
              <div className="flex gap-2">
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="flex-1 bg-muted/50 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground outline-none">
                  <option value="aiScore">AI Skoru</option>
                  <option value="change">Değişim</option>
                </select>
                <button onClick={reset} className="w-10 h-10 rounded-xl bg-muted/50 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-3">
          {filtered.map((a, i) => (
            <motion.div key={a.symbol} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <Link to={`/piyasalar/${a.pair}`} className="glass-card p-5 flex items-center gap-6 hover:border-white/20 transition-all duration-300 block group">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center font-mono font-bold text-sm text-foreground shrink-0">{a.symbol.slice(0, 2)}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{a.name}</div>
                  <div className="text-xs text-muted-foreground">{a.symbol}/USDT</div>
                </div>
                <div className="hidden sm:block">
                  <div className="font-mono font-semibold text-sm text-foreground">${a.price.toLocaleString()}</div>
                  <div className={`flex items-center gap-1 text-xs font-mono ${a.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {a.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}{a.change >= 0 ? '+' : ''}{a.change}%
                  </div>
                </div>
                <div className="hidden md:flex gap-3 text-xs text-muted-foreground">
                  <span>RSI: <span className="text-foreground font-mono">{a.rsi}</span></span>
                  <span>MACD: <span className={`font-medium ${a.macd === 'Pozitif' ? 'text-emerald-400' : a.macd === 'Negatif' ? 'text-red-400' : 'text-amber-400'}`}>{a.macd}</span></span>
                </div>
                <div className="hidden lg:block w-24 h-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={a.data.map((v, j) => ({ v, i: j }))}>
                      <Area type="monotone" dataKey="v" stroke={a.change >= 0 ? '#10B981' : '#EF4444'} fill="transparent" strokeWidth={1.5} dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-secondary/10">
                    <Sparkles className="w-3 h-3 text-secondary" />
                    <span className={`font-mono text-xs font-bold ${a.aiScore >= 80 ? 'text-emerald-400' : a.aiScore >= 60 ? 'text-amber-400' : 'text-red-400'}`}>{a.aiScore}</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${SIGNAL_STYLE[a.signal]}`}>{a.signal}</span>
                </div>
              </Link>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">Filtreye uygun varlık bulunamadı.</div>
          )}
        </div>
      </div>
      <Footer />
      <AIChatWidget />
    </div>
  );
}
