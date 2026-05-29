import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, TrendingUp, TrendingDown, ShieldAlert, Zap, BarChart3, Activity, ChevronRight } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis } from 'recharts';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AIChatWidget from '../components/AIChatWidget';

const SIGNALS = [
  { symbol: 'BTC/USDT', signal: 'GÜÇLÜ AL', score: 89, change: '+2.34%', up: true, reason: 'Hacim artışı + momentum pozitif' },
  { symbol: 'ETH/USDT', signal: 'AL', score: 74, change: '-0.87%', up: false, reason: 'Destek seviyesinde tutunan fiyat' },
  { symbol: 'SOL/USDT', signal: 'GÜÇLÜ AL', score: 92, change: '+5.12%', up: true, reason: 'Kırılan direnç, hacim doğruladı' },
  { symbol: 'XRP/USDT', signal: 'NÖTR', score: 55, change: '+1.02%', up: true, reason: 'Konsolidasyon devam ediyor' },
  { symbol: 'BNB/USDT', signal: 'AL', score: 70, change: '+0.78%', up: true, reason: 'RSI aşırı satımdan çıkış' },
  { symbol: 'DOGE/USDT', signal: 'SAT', score: 38, change: '-2.15%', up: false, reason: 'Düşen hacim + zayıf momentum' },
];

const MARKET_SENTIMENT = [
  { subject: 'Momentum', A: 78 }, { subject: 'Hacim', A: 65 }, { subject: 'Duygu', A: 82 },
  { subject: 'Teknik', A: 71 }, { subject: 'Haber', A: 60 }, { subject: 'Sosyal', A: 88 },
];

const CHART_DATA = Array.from({ length: 24 }, (_, i) => ({ h: i, v: 50 + Math.sin(i / 3) * 20 + Math.random() * 10 }));

const SIGNAL_COLORS = {
  'GÜÇLÜ AL': 'text-emerald-400 bg-emerald-500/10',
  'AL': 'text-emerald-300 bg-emerald-500/10',
  'NÖTR': 'text-amber-400 bg-amber-500/10',
  'SAT': 'text-red-400 bg-red-500/10',
  'GÜÇLÜ SAT': 'text-red-400 bg-red-500/10',
};

export default function AIAnalysis() {
  const [activeTab, setActiveTab] = useState('sinyaller');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-4">
            <Brain className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">Yapay Zeka Motoru</span>
          </div>
          <h1 className="font-heading font-bold text-4xl text-foreground mb-2">AI Analiz Merkezi</h1>
          <p className="text-muted-foreground">Tüm piyasalar için gerçek zamanlı yapay zeka analizi ve sinyalleri</p>
        </motion.div>

        {/* Overview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Aktif Sinyal', value: '47', icon: Zap, color: 'text-primary', bg: 'bg-primary/10' },
            { label: 'AL Sinyali', value: '31', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
            { label: 'SAT Sinyali', value: '9', icon: TrendingDown, color: 'text-red-400', bg: 'bg-red-500/10' },
            { label: 'Ort. AI Skoru', value: '72.4', icon: Sparkles, color: 'text-secondary', bg: 'bg-secondary/10' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass-card p-5">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div className="font-mono font-bold text-2xl text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Signals Table */}
          <div className="lg:col-span-2">
            <div className="glass-card overflow-hidden">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-white/5">
                {['sinyaller', 'risk', 'duygu'].map(t => (
                  <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors ${activeTab === t ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground'}`}>
                    {t === 'sinyaller' ? 'AI Sinyalleri' : t === 'risk' ? 'Risk Analizi' : 'Duygu'}
                  </button>
                ))}
              </div>
              <div className="divide-y divide-white/5">
                {SIGNALS.map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="flex items-center justify-between px-6 py-4 hover:bg-muted/20 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center font-mono font-bold text-xs text-foreground">{s.symbol.split('/')[0].slice(0, 2)}</div>
                      <div>
                        <div className="font-semibold text-sm text-foreground">{s.symbol}</div>
                        <div className="text-xs text-muted-foreground">{s.reason}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className={`text-xs font-mono font-semibold ${s.up ? 'text-emerald-400' : 'text-red-400'}`}>{s.change}</div>
                        <div className="flex items-center gap-1 mt-1">
                          <Sparkles className="w-3 h-3 text-secondary" />
                          <span className="font-mono text-xs text-secondary">{s.score}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${SIGNAL_COLORS[s.signal]}`}>{s.signal}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            {/* Market Sentiment Radar */}
            <div className="glass-card p-6">
              <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-secondary" /> Piyasa Duygusu
              </h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={MARKET_SENTIMENT}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#94A3B8', fontSize: 10 }} />
                    <Radar name="AI" dataKey="A" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.2} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* AI Trend Chart */}
            <div className="glass-card p-6">
              <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" /> AI Güven Endeksi
              </h3>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={CHART_DATA}>
                    <defs>
                      <linearGradient id="aiGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="v" stroke="#8B5CF6" fill="url(#aiGrad)" strokeWidth={2} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-muted-foreground">Günlük ortalama</span>
                <span className="font-mono font-bold text-secondary">72.4 / 100</span>
              </div>
            </div>

            {/* Top Alerts */}
            <div className="glass-card p-6">
              <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" /> AI Uyarıları
              </h3>
              <div className="space-y-3">
                {[
                  { text: 'BTC balina hareketi tespit edildi', type: 'warning' },
                  { text: 'SOL direnç kırılışı onaylandı', type: 'success' },
                  { text: 'ETH zincir hacminde düşüş', type: 'info' },
                ].map((a, i) => (
                  <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${a.type === 'success' ? 'bg-emerald-500/10' : a.type === 'warning' ? 'bg-amber-500/10' : 'bg-primary/10'}`}>
                    <Activity className={`w-4 h-4 mt-0.5 shrink-0 ${a.type === 'success' ? 'text-emerald-400' : a.type === 'warning' ? 'text-amber-400' : 'text-primary'}`} />
                    <span className="text-xs text-foreground">{a.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <AIChatWidget />
    </div>
  );
}