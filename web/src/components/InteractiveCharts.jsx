import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Activity, Zap, Globe } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, ComposedChart,
  XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  ReferenceLine, Cell, ScatterChart, Scatter, ZAxis, Legend
} from 'recharts';

const generateBTCData = (days, basePrice = 98000) => {
  let price = basePrice;
  return Array.from({ length: days }, (_, i) => {
    const change = (Math.random() - 0.47) * 0.025;
    price = price * (1 + change);
    const open = price;
    const close = price * (1 + (Math.random() - 0.5) * 0.01);
    const high = Math.max(open, close) * (1 + Math.random() * 0.008);
    const low = Math.min(open, close) * (1 - Math.random() * 0.008);
    const vol = Math.random() * 8 + 3;
    const rsi = 30 + Math.sin(i / 6) * 25 + (Math.random() - 0.5) * 10;
    const macd = Math.sin(i / 8) * 800 + (Math.random() - 0.5) * 200;
    const label = i % Math.floor(days / 8) === 0 ? `${days - i}G` : '';
    return { i, label, price: Math.round(price), open: Math.round(open), close: Math.round(close), high: Math.round(high), low: Math.round(low), vol: +vol.toFixed(2), rsi: Math.max(10, Math.min(90, +rsi.toFixed(1))), macd: +macd.toFixed(0), signal: +(macd * 0.85 + (Math.random() - 0.5) * 100).toFixed(0) };
  }).reverse();
};

const TF_CONFIG = {
  '1G': { days: 24, label: 'Saatlik' },
  '1H': { days: 30, label: 'Günlük' },
  '3A': { days: 90, label: '3 Aylık' },
  '1Y': { days: 180, label: '6 Aylık' },
};

const ASSET_PERF = [
  { name: 'BTC', d1: 2.34, d7: 8.12, d30: 24.5, vol: 42.8, score: 89, color: '#F7931A' },
  { name: 'ETH', d1: -0.87, d7: 4.21, d30: 15.8, vol: 18.7, score: 72, color: '#627EEA' },
  { name: 'SOL', d1: 5.12, d7: 18.4, d30: 42.1, vol: 8.2, score: 91, color: '#9945FF' },
  { name: 'BNB', d1: 0.78, d7: 3.15, d30: 11.2, vol: 2.8, score: 70, color: '#F0B90B' },
  { name: 'XRP', d1: 1.02, d7: 6.80, d30: 18.4, vol: 4.1, score: 65, color: '#346AA9' },
  { name: 'AVAX', d1: -1.23, d7: 2.45, d30: 8.7, vol: 1.2, score: 78, color: '#E84142' },
  { name: 'LINK', d1: 4.21, d7: 15.3, d30: 38.5, vol: 1.5, score: 82, color: '#2A5ADA' },
  { name: 'TAO', d1: 8.42, d7: 28.5, d30: 65.2, vol: 0.85, score: 92, color: '#8B5CF6' },
];

const EXCHANGE_HOURLY = Array.from({ length: 24 }, (_, i) => ({
  h: `${i}:00`,
  Binance: +(1.2 + Math.sin(i / 4) * 0.6 + Math.random() * 0.3).toFixed(2),
  Coinbase: +(0.4 + Math.sin(i / 4 + 1) * 0.2 + Math.random() * 0.15).toFixed(2),
  Bybit: +(0.35 + Math.sin(i / 4 + 0.5) * 0.15 + Math.random() * 0.1).toFixed(2),
  OKX: +(0.3 + Math.sin(i / 4 + 2) * 0.12 + Math.random() * 0.08).toFixed(2),
  Kraken: +(0.18 + Math.sin(i / 4 + 1.5) * 0.08 + Math.random() * 0.05).toFixed(2),
}));

const CORRELATION = ASSET_PERF.map(a => ({ name: a.name, x: a.vol, y: a.d7, z: a.score, color: a.color }));
const CHART_COLORS = { Binance: '#F0B90B', Coinbase: '#0052FF', Bybit: '#F7A600', OKX: '#94A3B8', Kraken: '#5741D9' };

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card/95 border border-white/10 rounded-xl px-4 py-3 text-xs shadow-2xl min-w-[140px]">
      {label && <div className="text-muted-foreground mb-2 font-medium">{label}</div>}
      {payload.map((p, i) => (
        <div key={i} className="flex items-center justify-between gap-4 py-0.5">
          <span style={{ color: p.color || p.fill }} className="font-medium">{p.name}</span>
          <span className="font-mono font-bold text-foreground">{typeof p.value === 'number' ? (p.value > 1000 ? `$${p.value.toLocaleString()}` : p.value.toFixed(2)) : p.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function InteractiveCharts() {
  const [tf, setTf] = useState('1H');
  const [perfPeriod, setPerfPeriod] = useState('d7');
  const [activeExchange, setActiveExchange] = useState('all');

  const btcData = useMemo(() => generateBTCData(TF_CONFIG[tf].days, 98000), [tf]);
  const lastPrice = btcData[btcData.length - 1]?.price || 107842;
  const firstPrice = btcData[0]?.price || 98000;
  const priceUp = lastPrice >= firstPrice;
  const priceChange = (((lastPrice - firstPrice) / firstPrice) * 100).toFixed(2);

  const exchanges = ['Binance', 'Coinbase', 'Bybit', 'OKX', 'Kraken'];
  const visibleExchanges = activeExchange === 'all' ? exchanges : [activeExchange];
  const PERIOD_LABELS = { d1: '24s', d7: '7 Gün', d30: '30 Gün' };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-2xl text-foreground flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center"><BarChart3 className="w-5 h-5 text-primary" /></div>
            İnteraktif Analiz Grafikleri
          </h2>
          <p className="text-sm text-muted-foreground mt-1 ml-12">Tüm borsa ve Bitcoin verileri canlı güncelleme ile</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-emerald-400">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span>Canlı</span>
        </div>
      </div>

      {/* BTC Price Chart */}
      <div className="glass-card p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="font-semibold text-lg text-foreground">Bitcoin / USDT</h3>
              <span className={`font-mono text-sm font-bold px-2.5 py-0.5 rounded-lg ${priceUp ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'}`}>
                {priceUp ? '+' : ''}{priceChange}%
              </span>
            </div>
            <div className="font-mono font-bold text-3xl text-foreground">${lastPrice.toLocaleString()}</div>
          </div>
          <div className="flex gap-1">
            {Object.entries(TF_CONFIG).map(([key]) => (
              <button key={key} onClick={() => setTf(key)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors ${tf === key ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>
                {key}
              </button>
            ))}
          </div>
        </div>

        <div className="h-52 mb-2">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={btcData}>
              <defs>
                <linearGradient id="btcGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={priceUp ? '#10B981' : '#EF4444'} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={priceUp ? '#10B981' : '#EF4444'} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="label" tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis domain={['auto', 'auto']} tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="price" name="Fiyat" stroke={priceUp ? '#10B981' : '#EF4444'} fill="url(#btcGrad)" strokeWidth={2} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="h-16 mb-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={btcData}>
              <Bar dataKey="vol" name="Hacim" radius={[2, 2, 0, 0]}>
                {btcData.map((d, i) => <Cell key={i} fill={d.close >= d.open ? '#10B981' : '#EF4444'} fillOpacity={0.6} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <div className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1.5"><Zap className="w-3 h-3 text-amber-400" />RSI (14)</div>
            <div className="h-24">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={btcData}>
                  <defs>
                    <linearGradient id="rsiGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#F59E0B" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="label" hide />
                  <YAxis domain={[0, 100]} tick={{ fill: '#64748B', fontSize: 9 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, fontSize: 11 }} formatter={v => [v, 'RSI']} labelFormatter={() => ''} />
                  <ReferenceLine y={70} stroke="#EF4444" strokeDasharray="4 2" strokeOpacity={0.5} />
                  <ReferenceLine y={30} stroke="#10B981" strokeDasharray="4 2" strokeOpacity={0.5} />
                  <Area type="monotone" dataKey="rsi" stroke="#F59E0B" fill="url(#rsiGrad)" strokeWidth={1.5} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1.5"><Activity className="w-3 h-3 text-blue-400" />MACD</div>
            <div className="h-24">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={btcData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="label" hide />
                  <YAxis tick={{ fill: '#64748B', fontSize: 9 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, fontSize: 11 }} labelFormatter={() => ''} />
                  <ReferenceLine y={0} stroke="rgba(255,255,255,0.1)" />
                  <Bar dataKey="macd" name="Histogram">
                    {btcData.map((d, i) => <Cell key={i} fill={d.macd >= 0 ? '#10B981' : '#EF4444'} fillOpacity={0.7} />)}
                  </Bar>
                  <Line type="monotone" dataKey="macd" name="MACD" stroke="#3B82F6" strokeWidth={1.5} dot={false} />
                  <Line type="monotone" dataKey="signal" name="Sinyal" stroke="#F59E0B" strokeWidth={1.5} dot={false} strokeDasharray="4 2" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Asset Performance */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-foreground flex items-center gap-2"><TrendingUp className="w-4 h-4 text-emerald-400" />Çoklu Varlık Performansı</h3>
          <div className="flex gap-1">
            {Object.entries(PERIOD_LABELS).map(([key, label]) => (
              <button key={key} onClick={() => setPerfPeriod(key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${perfPeriod === key ? 'bg-secondary text-white' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ASSET_PERF} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
                <XAxis type="number" tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} unit="%" />
                <YAxis type="category" dataKey="name" tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} width={38} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <ReferenceLine x={0} stroke="rgba(255,255,255,0.15)" />
                <Bar dataKey={perfPeriod} name={PERIOD_LABELS[perfPeriod]} radius={[0, 6, 6, 0]}>
                  {ASSET_PERF.map((d, i) => <Cell key={i} fill={d[perfPeriod] >= 0 ? '#10B981' : '#EF4444'} fillOpacity={0.85} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {ASSET_PERF.map((a, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }}
                className="p-3 rounded-2xl bg-muted/20 border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-mono font-bold text-sm text-foreground">{a.name}</div>
                  <span className={`font-mono text-xs font-bold ${a[perfPeriod] >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {a[perfPeriod] >= 0 ? '+' : ''}{a[perfPeriod]}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-muted mb-2">
                  <div className="h-full rounded-full transition-all" style={{ width: `${a.score}%`, backgroundColor: a.color }} />
                </div>
                <div className="text-xs text-muted-foreground">AI: <span className="font-mono font-semibold" style={{ color: a.color }}>{a.score}</span></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Exchange Volume */}
      <div className="glass-card p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
          <h3 className="font-semibold text-foreground flex items-center gap-2"><Globe className="w-4 h-4 text-primary" />Borsa Saatlik Hacim Karşılaştırması</h3>
          <div className="flex gap-1 flex-wrap">
            <button onClick={() => setActiveExchange('all')} className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${activeExchange === 'all' ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>Tümü</button>
            {exchanges.map(ex => (
              <button key={ex} onClick={() => setActiveExchange(ex === activeExchange ? 'all' : ex)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${activeExchange === ex ? 'text-white' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
                style={activeExchange === ex ? { backgroundColor: CHART_COLORS[ex] } : {}}>
                {ex}
              </button>
            ))}
          </div>
        </div>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={EXCHANGE_HOURLY}>
              <defs>
                {exchanges.map(ex => (
                  <linearGradient key={ex} id={`grad_${ex}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={CHART_COLORS[ex]} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={CHART_COLORS[ex]} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="h" tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} interval={3} />
              <YAxis tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} unit="B" />
              <Tooltip content={<CustomTooltip />} />
              {visibleExchanges.map(ex => (
                <Area key={ex} type="monotone" dataKey={ex} name={ex} stroke={CHART_COLORS[ex]} fill={`url(#grad_${ex})`} strokeWidth={2} dot={false} />
              ))}
              <Legend wrapperStyle={{ fontSize: 11, color: '#94A3B8', paddingTop: 8 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Scatter */}
      <div className="glass-card p-6">
        <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2"><Activity className="w-4 h-4 text-secondary" />Hacim vs Haftalık Performans Dağılımı</h3>
        <p className="text-xs text-muted-foreground mb-5">Kabarcık boyutu = AI skoru · X = 24s hacim (B$) · Y = 7G değişim (%)</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis type="number" dataKey="x" name="Hacim" unit="B$" tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis type="number" dataKey="y" name="7G %" unit="%" tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} />
              <ZAxis type="number" dataKey="z" range={[200, 1200]} />
              <ReferenceLine y={0} stroke="rgba(255,255,255,0.15)" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 12 }} />
              <Scatter name="Varlıklar" data={CORRELATION}>
                {CORRELATION.map((c, i) => <Cell key={i} fill={c.color} fillOpacity={0.8} />)}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-3 mt-3">
          {CORRELATION.map((c, i) => (
            <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
              <span>{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
