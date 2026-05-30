import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, MessageCircle, TrendingUp, Award, Bookmark, Share2, PenSquare, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AIChatWidget from '../components/AIChatWidget';

const POSTS = [
  { id: 1, author: 'CryptoWizard', role: 'Uzman Analist', badge: '⭐ Pro', avatar: 'CW', likes: 247, comments: 38, shares: 12, time: '2 sa önce', symbol: 'BTC', signal: 'AL', title: 'Bitcoin Yükseliş Kanalında — Hedef $115,000', content: 'BTC şu anda sağlam bir yükseliş kanalında seyrediyor. 200 EMA üzerinde kapanışlar devam ediyor. Destek: $104,000 — Direnç: $112,500. AI modelim %89 olasılıkla üst banda dokunuş öngörüyor.', aiScore: 89, tag: 'Teknik Analiz' },
  { id: 2, author: 'BlockchainSage', role: 'Kıdemli Trader', badge: '💎 Elite', avatar: 'BS', likes: 189, comments: 24, shares: 8, time: '4 sa önce', symbol: 'ETH', signal: 'NÖTR', title: 'ETH Merge Sonrası Deflationary Baskı Devam Ediyor', content: 'Ethereum\'un arz azalma mekanizması güçleniyor. Son 30 günde 45,000 ETH yakıldı. Bu temel değerleme açısından oldukça olumlu bir dinamik.', aiScore: 74, tag: 'On-Chain Analiz' },
  { id: 3, author: 'TurkishBull', role: 'Topluluk Analisti', badge: '🔥 Aktif', avatar: 'TB', likes: 134, comments: 19, shares: 5, time: '6 sa önce', symbol: 'SOL', signal: 'GÜÇLÜ AL', title: 'Solana Ekosistemi Patlama Noktasında!', content: 'SOL/USDT haftalık grafikte güçlü bir yükseliş formasyonu oluşturdu. Kırılan direnç artık destek. DeFi TVL rekoru ve geliştirici aktivitesi yüksek. $200 hedef görüyorum.', aiScore: 91, tag: 'Fiyat Analizi' },
  { id: 4, author: 'MacroMind', role: 'Makro Stratejist', badge: '📊 Expert', avatar: 'MM', likes: 98, comments: 31, shares: 14, time: '9 sa önce', symbol: 'GENEL', signal: 'DİKKAT', title: 'Fed Kararı Kripto Piyasalarını Nasıl Etkiler?', content: 'Makroekonomik tabloda ABD enflasyonu hala yapışkan. Fed\'in daha hawkish bir tutum alması durumunda risk varlıkları baskı altında kalabilir. Portföy risk yönetimine dikkat!', aiScore: 60, tag: 'Makro' },
];

const ANALYSTS = [
  { name: 'CryptoWizard', score: 94, followers: '12.4K', winRate: '78%', avatar: 'CW' },
  { name: 'BlockchainSage', score: 88, followers: '8.9K', winRate: '72%', avatar: 'BS' },
  { name: 'TurkishBull', score: 81, followers: '5.2K', winRate: '68%', avatar: 'TB' },
];

const SIGNAL_COLORS = {
  'GÜÇLÜ AL': 'bg-emerald-500/20 text-emerald-400',
  'AL': 'bg-emerald-500/10 text-emerald-300',
  'NÖTR': 'bg-amber-500/10 text-amber-400',
  'DİKKAT': 'bg-orange-500/10 text-orange-400',
  'SAT': 'bg-red-500/10 text-red-400',
};

export default function Community() {
  const [tab, setTab] = useState('kesfet');
  const [liked, setLiked] = useState({});

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-4">
              <Users className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">Topluluk</span>
            </div>
            <h1 className="font-heading font-bold text-4xl text-foreground mb-2">Yatırımcı Topluluğu</h1>
            <p className="text-muted-foreground">Analistleri takip et, fikirleri paylaş, birlikte büyü</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
            <PenSquare className="w-4 h-4" /> Analiz Paylaş
          </button>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {[['kesfet', 'Keşfet'], ['takip', 'Takip Edilenler'], ['trend', 'Trend']].map(([val, label]) => (
            <button key={val} onClick={() => setTab(val)} className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${tab === val ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>{label}</button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Posts */}
          <div className="lg:col-span-2 space-y-5">
            {POSTS.map((post, i) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass-card p-6 hover:border-white/20 transition-all duration-300">
                {/* Author */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center font-bold text-sm text-foreground">{post.avatar}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-foreground">{post.author}</span>
                        <span className="text-xs text-muted-foreground">{post.badge}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{post.role} · {post.time}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${SIGNAL_COLORS[post.signal] || 'bg-muted text-muted-foreground'}`}>{post.signal}</span>
                    <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-muted text-muted-foreground">{post.symbol}</span>
                  </div>
                </div>
                {/* Content */}
                <h3 className="font-heading font-semibold text-base text-foreground mb-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{post.content}</p>
                {/* AI Score */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/5 border border-secondary/10 mb-4">
                  <Sparkles className="w-4 h-4 text-secondary" />
                  <span className="text-xs text-muted-foreground">AI Analiz Skoru:</span>
                  <div className="flex-1 h-1.5 rounded-full bg-muted">
                    <div className="h-full rounded-full bg-gradient-to-r from-secondary to-primary" style={{ width: `${post.aiScore}%` }} />
                  </div>
                  <span className="font-mono text-sm font-bold text-secondary">{post.aiScore}/100</span>
                </div>
                {/* Actions */}
                <div className="flex items-center gap-4">
                  <button onClick={() => setLiked(p => ({ ...p, [post.id]: !p[post.id] }))} className={`flex items-center gap-1.5 text-sm transition-colors ${liked[post.id] ? 'text-red-400' : 'text-muted-foreground hover:text-red-400'}`}>
                    <Heart className={`w-4 h-4 ${liked[post.id] ? 'fill-red-400' : ''}`} /> {post.likes + (liked[post.id] ? 1 : 0)}
                  </button>
                  <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"><MessageCircle className="w-4 h-4" />{post.comments}</button>
                  <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"><Share2 className="w-4 h-4" />{post.shares}</button>
                  <button className="ml-auto text-muted-foreground hover:text-foreground transition-colors"><Bookmark className="w-4 h-4" /></button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Analysts */}
            <div className="glass-card p-6">
              <h3 className="font-heading font-semibold text-foreground mb-5 flex items-center gap-2"><Award className="w-4 h-4 text-amber-400" /> Top Analistler</h3>
              <div className="space-y-4">
                {ANALYSTS.map((a, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center font-bold text-sm text-foreground">{a.avatar}</div>
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center text-xs font-bold text-background">{i + 1}</div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">{a.name}</div>
                        <div className="text-xs text-muted-foreground">{a.followers} takipçi · {a.winRate} kazanma</div>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 rounded-xl text-xs font-medium border border-primary/30 text-primary hover:bg-primary/10 transition-colors">Takip</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Stats */}
            <div className="glass-card p-6">
              <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-primary" /> Topluluk İstatistikleri</h3>
              <div className="space-y-3">
                {[['Aktif Analist', '4,287'], ['Bu Hafta Paylaşım', '1,923'], ['Başarı Oranı (Pro)', '73%']].map(([l, v]) => (
                  <div key={l} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <span className="text-sm text-muted-foreground">{l}</span>
                    <span className="font-mono font-semibold text-foreground">{v}</span>
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
