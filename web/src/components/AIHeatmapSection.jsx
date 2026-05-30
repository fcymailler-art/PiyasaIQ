import { useState } from 'react';
import { motion } from 'framer-motion';
import { Grid3X3, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const MINI_HEATMAP = [
  { symbol: 'BTC', change: 2.34, aiScore: 87, size: 'large' },
  { symbol: 'ETH', change: -0.87, aiScore: 72, size: 'large' },
  { symbol: 'SOL', change: 5.12, aiScore: 91, size: 'medium' },
  { symbol: 'BNB', change: 0.78, aiScore: 70, size: 'medium' },
  { symbol: 'XRP', change: 1.02, aiScore: 65, size: 'medium' },
  { symbol: 'DOGE', change: -2.15, aiScore: 45, size: 'medium' },
  { symbol: 'ADA', change: 3.45, aiScore: 68, size: 'small' },
  { symbol: 'AVAX', change: -1.23, aiScore: 78, size: 'small' },
  { symbol: 'LINK', change: 4.21, aiScore: 82, size: 'small' },
  { symbol: 'DOT', change: 1.67, aiScore: 62, size: 'small' },
  { symbol: 'MATIC', change: 2.87, aiScore: 75, size: 'small' },
  { symbol: 'FTM', change: 7.34, aiScore: 73, size: 'small' },
];

function getColor(change) {
  if (change > 4) return 'bg-emerald-500/70 border-emerald-400/30';
  if (change > 2) return 'bg-emerald-600/50 border-emerald-500/30';
  if (change > 0) return 'bg-emerald-700/40 border-emerald-600/20';
  if (change > -2) return 'bg-red-700/40 border-red-600/20';
  if (change > -4) return 'bg-red-600/50 border-red-500/30';
  return 'bg-red-500/70 border-red-400/30';
}

export default function AIHeatmapSection() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Grid3X3 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Canlı Isı Haritası</span>
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-2">Piyasa Nabzı</h2>
            <p className="text-muted-foreground">Tüm varlıkların anlık durumunu tek bakışta görün</p>
          </div>
          <Link to="/isi-haritasi" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors hidden sm:block">Tam Harita →</Link>
        </motion.div>

        <div className="grid grid-cols-6 gap-2 h-64 sm:h-80">
          {MINI_HEATMAP.map((coin, i) => (
            <motion.div
              key={coin.symbol}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              onMouseEnter={() => setHovered(coin)}
              onMouseLeave={() => setHovered(null)}
              className={`${coin.size === 'large' ? 'col-span-2 row-span-2' : coin.size === 'medium' ? 'col-span-2 row-span-1' : 'col-span-1 row-span-1'} ${getColor(coin.change)} border rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:scale-105 hover:z-10 transition-all duration-200 p-2`}
            >
              <div className="font-mono font-bold text-foreground text-sm sm:text-base">{coin.symbol}</div>
              {coin.size !== 'small' && (
                <>
                  <div className={`font-mono text-xs font-semibold mt-1 ${coin.change >= 0 ? 'text-emerald-200' : 'text-red-200'}`}>
                    {coin.change > 0 ? '+' : ''}{coin.change}%
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Sparkles className="w-2.5 h-2.5 text-secondary" />
                    <span className="font-mono text-xs text-secondary">{coin.aiScore}</span>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>

        {hovered && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex items-center gap-6 px-4 py-3 rounded-2xl bg-muted/30 border border-white/5">
            <span className="font-mono font-bold text-foreground">{hovered.symbol}</span>
            <span className={`font-mono font-semibold ${hovered.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{hovered.change >= 0 ? '+' : ''}{hovered.change}%</span>
            <span className="text-xs text-muted-foreground">AI Skoru: <span className="font-mono text-secondary">{hovered.aiScore}</span></span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
