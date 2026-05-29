import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles, TrendingUp, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const FLOATING_STATS = [
  { label: 'AI Güven Puanı', value: '94.7%', color: 'from-primary to-blue-400' },
  { label: 'BTC/USDT', value: '$107,842', change: '+2.34%', up: true },
  { label: 'Aktif Sinyal', value: '12', color: 'from-secondary to-purple-400' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-16">
      {/* BG Effects */}
      <div className="absolute inset-0">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-30">
          <source src="https://media.base44.com/videos/public/6a155c8b37c8fb987c29578e/dd5def4bc_spacehvc1f1e5855a3a06ff6e7cd1.mp4" type="video/mp4" />
        </video>
        <img src="https://media.base44.com/images/public/6a155c8b37c8fb987c29578e/d3bee983d_Ekrangrnts2026-05-26112711.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Yapay Zeka Destekli Analiz Platformu</span>
            </div>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
              <span className="text-foreground">Yapay Zeka Destekli</span>
              <br />
              <span className="text-gradient">Piyasa İstihbaratı</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mb-10 leading-relaxed">
              Kripto, forex ve hisse senedi piyasaları için gerçek zamanlı AI analiz platformu. Akıllı kararlar, premium veriler.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/piyasalar" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-white bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all glow-blue">
                Analize Başla <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/piyasalar" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-foreground border border-white/10 hover:bg-muted/50 transition-all">
                <Play className="w-4 h-4" /> Piyasaları Keşfet
              </Link>
            </div>
            <div className="flex items-center gap-8 mt-12 pt-8 border-t border-white/5">
              {[
                { icon: TrendingUp, label: '500+ Varlık', sub: 'Gerçek zamanlı' },
                { icon: Sparkles, label: 'AI Analiz', sub: '7/24 aktif' },
                { icon: Shield, label: 'Güvenli', sub: 'Şifreli veri' },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center">
                    <f.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{f.label}</div>
                    <div className="text-xs text-muted-foreground">{f.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Floating Cards */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="hidden lg:block relative">
            <div className="relative w-full h-[500px]">
              {FLOATING_STATS.map((stat, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }}
                  className={`absolute glass-card p-5 ${
                    i === 0 ? 'top-8 left-4 w-56' : i === 1 ? 'top-32 right-0 w-52' : 'bottom-24 left-12 w-48'
                  }`}
                >
                  <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
                  <div className="font-mono font-bold text-xl text-foreground">{stat.value}</div>
                  {stat.change && (
                    <span className={`text-sm font-mono font-semibold ${stat.up ? 'text-emerald-400' : 'text-red-400'}`}>
                      {stat.change}
                    </span>
                  )}
                </motion.div>
              ))}
              {/* Center glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl" />
              {/* AI Avatar placeholder */}
              <motion.div
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
              >
                <Sparkles className="w-12 h-12 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}