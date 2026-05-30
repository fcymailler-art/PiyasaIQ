import { useState } from 'react';
import { motion } from 'framer-motion';
import { Grid3X3, Sparkles, Info } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AIChatWidget from '../components/AIChatWidget';

const HEATMAP_DATA = [
  { symbol: 'BTC', name: 'Bitcoin', change: 2.34, aiScore: 87, mcap: '2.1T', size: 'xl' },
  { symbol: 'ETH', name: 'Ethereum', change: -0.87, aiScore: 72, mcap: '462B', size: 'lg' },
  { symbol: 'SOL', name: 'Solana', change: 5.12, aiScore: 91, mcap: '82B', size: 'md' },
  { symbol: 'BNB', name: 'BNB', change: 0.78, aiScore: 70, mcap: '93B', size: 'md' },
  { symbol: 'XRP', name: 'Ripple', change: 1.02, aiScore: 65, mcap: '134B', size: 'md' },
  { symbol: 'ADA', name: 'Cardano', change: 3.45, aiScore: 68, mcap: '31B', size: 'sm' },
  { symbol: 'AVAX', name: 'Avalanche', change: -1.23, aiScore: 78, mcap: '16B', size: 'sm' },
  { symbol: 'DOT', name: 'Polkadot', change: 1.67, aiScore: 62, mcap: '11B', size: 'sm' },
  { symbol: 'LINK', name: 'Chainlink', change: 4.21, aiScore: 82, mcap: '11.5B', size: 'sm' },
  { symbol: 'DOGE', name: 'Dogecoin', change: -2.15, aiScore: 45, mcap: '60B', size: 'md' },
  { symbol: 'MATIC', name: 'Polygon', change: 2.87, aiScore: 75, mcap: '8B', size: 'sm' },
  { symbol: 'UNI', name: 'Uniswap', change: -0.43, aiScore: 60, mcap: '6B', size: 'sm' },
  { symbol: 'ATOM', name: 'Cosmos', change: 1.92, aiScore: 66, mcap: '4.5B', size: 'xs' },
  { symbol: 'FTM', name: 'Fantom', change: 7.34, aiScore: 73, mcap: '3B', size: 'xs' },
  { symbol: 'NEAR', name: 'NEAR', change: -3.11, aiScore: 55, mcap: '5B', size: 'xs' },
  { symbol: 'ICP', name: 'Internet Comp.', change: 0.55, aiScore: 58, mcap: '4B', size: 'xs' },
];

const SIZE_CLASSES = { xl: 'col-span-4 row-span-3 text-2xl', lg: 'col-span-3 row-span-2 text-xl', md: 'col-span-2 row-span-2 text-base', sm: 'col-span-2 row-span-1 text-sm', xs: 'col-span-1 row-span-1 text-xs' };

function getColor(change) {
  if (change > 4) return 'bg-emerald-500/70 border-emerald-400/30';
  if (change > 2) return 'bg-emerald-600/50 border-emerald-500/30';
  if (change > 0) return 'bg-emerald-700/40 border-emerald-600/20';
  if (change > -2) return 'bg-red-700/40 border-red-600/20';
  if (change > -4) return 'bg-red-600/50 border-red-500/30';
  return 'bg-red-500/70 border-red-400/30';
}

export default function Heatmap() {
  const [hovered, setHovered] = useState(null);
  const [view, setView] = useState('change');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Grid3X3 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Canlı Isı Haritası</span>
          </div>
          <h1 className="font-heading font-bold text-4xl text-foreground mb-2">AI Isı Haritası</h1>
          <p className="text-muted-foreground">Piyasanın genel durumunu tek bakışta görün</p>
        </motion.div>

        {/* Controls */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex gap-2">
            {['change', 'aiScore'].map(v => (
              <button key={v} onClick={() => setView(v)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${view === v ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>
                {v === 'change' ? '24s Değişim' : 'AI Skor'}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 ml-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-4 h-4 rounded bg-red-500/70" />Düşüş
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-4 h-4 rounded bg-emerald-500/70" />Yükseliş
            </div>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="grid grid-cols-8 grid-rows-6 gap-2 h-[520px]">
          {HEATMAP_DATA.map((coin, i) => (
            <motion.div
              key={coin.symbol}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              onMouseEnter={() => setHovered(coin)}
              onMouseLeave={() => setHovered(null)}
              className={`${SIZE_CLASSES[coin.size]} ${getColor(view === 'change' ? coin.change : coin.aiScore - 50)} border rounded-2xl flex flex-col items-center justify-center p-2 cursor-pointer transition-all duration-200 hover:scale-105 hover:z-10 relative overflow-hidden`}
            >
              <div className="font-mono font-bold text-foreground">{coin.symbol}</div>
              {coin.size !== 'xs' && <div className="font-mono text-xs mt-1 font-semibold" style={{ color: (view === 'change' ? coin.change : coin.aiScore - 50) >= 0 ? '#10B981' : '#EF4444' }}>
                {view === 'change' ? `${coin.change > 0 ? '+' : ''}${coin.change}%` : `AI: ${coin.aiScore}`}
              </div>}
            </motion.div>
          ))}
        </div>

        {/* Hover Detail */}
        {hovered && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 mt-6">
            <div className="flex items-center gap-6">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Varlık</div>
                <div className="font-heading font-bold text-xl text-foreground">{hovered.name} ({hovered.symbol})</div>
              </div>
              <div><div className="text-xs text-muted-foreground mb-1">24s Değişim</div><div className={`font-mono font-bold text-lg ${hovered.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{hovered.change >= 0 ? '+' : ''}{hovered.change}%</div></div>
              <div><div className="text-xs text-muted-foreground mb-1">AI Skoru</div><div className="font-mono font-bold text-lg text-secondary flex items-center gap-1"><Sparkles className="w-4 h-4" />{hovered.aiScore}</div></div>
              <div><div className="text-xs text-muted-foreground mb-1">Piyasa Değeri</div><div className="font-mono font-semibold text-foreground">${hovered.mcap}</div></div>
            </div>
          </motion.div>
        )}
      </div>
      <Footer />
      <AIChatWidget />
    </div>
  );
}
