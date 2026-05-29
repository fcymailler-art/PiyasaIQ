import { useState } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Sparkles, TrendingUp, TrendingDown, Clock, ExternalLink, Filter } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AIChatWidget from '../components/AIChatWidget';

const NEWS = [
  { id: 1, title: 'Bitcoin 110,000 Dolar Zirvesine Yaklaşıyor: AI Analizi Ne Söylüyor?', source: 'CoinDesk', time: '12 dk önce', category: 'Kripto', sentiment: 'olumlu', aiScore: 85, impact: 'Yüksek', symbol: 'BTC', excerpt: 'Kurumsal alımlar ve ETF girişleri ile birlikte Bitcoin yeni bir ATH\'a doğru ilerliyor. AI modellerimiz güçlü momentum sinyali veriyor.' },
  { id: 2, title: 'Fed Faiz Kararı Piyasaları Karıştırdı: Kripto Volatilitesi Arttı', source: 'Bloomberg', time: '45 dk önce', category: 'Makro', sentiment: 'olumsuz', aiScore: 42, impact: 'Kritik', symbol: 'PIYASA', excerpt: 'Federal Reserve\'in faiz açıklaması ardından kripto piyasaları sert dalgalanma yaşadı. Risk iştahı azalıyor.' },
  { id: 3, title: 'Solana Ekosistemi Rekor Kırıyor: DeFi TVL 10 Milyar Doları Aştı', source: 'The Block', time: '1.5 sa önce', category: 'DeFi', sentiment: 'olumlu', aiScore: 91, impact: 'Yüksek', symbol: 'SOL', excerpt: 'Solana zincirindeki toplam kilitli değer tüm zamanların zirvesini gördü. Ekosistem gelişimi hızlanıyor.' },
  { id: 4, title: 'Ethereum ETF Onayı Yakın: SEC İncelemesi Son Aşamada', source: 'Reuters', time: '2 sa önce', category: 'Düzenleme', sentiment: 'olumlu', aiScore: 78, impact: 'Yüksek', symbol: 'ETH', excerpt: 'ABD menkul kıymetler düzenleyicisi Ethereum spot ETF başvurularını son aşamaya taşıdı. Piyasalar pozitif tepki veriyor.' },
  { id: 5, title: 'Çin Kripto Yasağını Hafifletiyor: Asya Piyasaları Tepki Verdi', source: 'FT', time: '3 sa önce', category: 'Düzenleme', sentiment: 'olumlu', aiScore: 67, impact: 'Orta', symbol: 'GENEL', excerpt: 'Çin hükümetinin kripto para düzenlemelerini yumuşatacağına dair sinyaller Asya borsalarını hareketlendirdi.' },
  { id: 6, title: 'XRP Dava Sona Erdi: Ripple Kazandı, Fiyat %15 Yükseldi', source: 'CryptoBriefing', time: '4 sa önce', category: 'Hukuk', sentiment: 'olumlu', aiScore: 88, impact: 'Yüksek', symbol: 'XRP', excerpt: 'Ripple Labs ile SEC arasındaki uzun soluklu dava sona erdi. Mahkeme XRP\'nin menkul kıymet olmadığına hükmetti.' },
];

const CATEGORIES = ['Tümü', 'Kripto', 'Makro', 'DeFi', 'Düzenleme', 'Hukuk'];

export default function News() {
  const [cat, setCat] = useState('Tümü');
  const [featured, ...rest] = NEWS;

  const filtered = (cat === 'Tümü' ? rest : rest.filter(n => n.category === cat));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Newspaper className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI Haber Merkezi</span>
          </div>
          <h1 className="font-heading font-bold text-4xl text-foreground mb-2">Piyasa Haberleri</h1>
          <p className="text-muted-foreground">AI tarafından analiz edilmiş ve puanlanmış güncel haberler</p>
        </motion.div>

        {/* Featured */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 mb-8 group hover:border-white/20 transition-all duration-300">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-semibold">ÖNE ÇIKAN</span>
                <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${featured.sentiment === 'olumlu' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                  {featured.sentiment === 'olumlu' ? '📈 Olumlu' : '📉 Olumsuz'}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{featured.time}</span>
              </div>
              <h2 className="font-heading font-bold text-2xl text-foreground mb-3">{featured.title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">{featured.excerpt}</p>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">via {featured.source}</span>
                <button className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors">
                  Devamını Oku <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-4 lg:w-48">
              <div className="glass-card p-4 text-center">
                <div className="text-xs text-muted-foreground mb-1">AI Etki Skoru</div>
                <div className="font-mono font-bold text-3xl text-secondary">{featured.aiScore}</div>
                <div className="text-xs text-emerald-400 mt-1">/ 100</div>
              </div>
              <div className="glass-card p-4 text-center">
                <div className="text-xs text-muted-foreground mb-1">Etki Seviyesi</div>
                <div className="font-semibold text-amber-400">{featured.impact}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filter */}
        <div className="flex items-center gap-2 mb-6">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCat(c)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${cat === c ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>{c}</button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((news, i) => (
            <motion.div key={news.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="glass-card p-6 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-lg bg-muted text-xs font-medium text-muted-foreground">{news.category}</span>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-secondary" />
                  <span className={`font-mono text-xs font-bold ${news.aiScore >= 75 ? 'text-emerald-400' : news.aiScore >= 50 ? 'text-amber-400' : 'text-red-400'}`}>{news.aiScore}</span>
                </div>
              </div>
              <h3 className="font-heading font-semibold text-sm text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">{news.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{news.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`flex items-center gap-1 text-xs ${news.sentiment === 'olumlu' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {news.sentiment === 'olumlu' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {news.sentiment}
                  </span>
                  <span className="text-xs text-muted-foreground">• {news.source}</span>
                </div>
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{news.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
      <AIChatWidget />
    </div>
  );
}