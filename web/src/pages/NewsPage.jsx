import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Clock, ExternalLink, RefreshCw } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

// Mock Data generation for robust fallback
const generateMockNews = () => {
  return [
    { id: 1, title: 'Fed Faiz Kararı Sonrası Kripto Paralarda Sert Hareketler Bekleniyor', summary: 'Analistler, yaklaşan makroekonomik verilerin Bitcoin ve altcoinler üzerinde yüksek volatilite yaratabileceği konusunda uyarıyor.', source: 'CoinDesk', time: '10 dakika önce', category: 'Kripto', sentiment: 'neutral', url: '#' },
    { id: 2, title: 'Büyük Kurumsal Fonlar Ethereum (ETH) ETF Başvurularını Hızlandırdı', summary: 'Dev varlık yönetim şirketleri arka arkaya SEC kapısını çalmaya devam ediyor. Bu durum piyasada iyimserlik yarattı.', source: 'Bloomberg', time: '1 saat önce', category: 'Kripto', sentiment: 'positive', url: '#' },
    { id: 3, title: 'S&P 500 Rekor Tazelerken Teknoloji Hisselerinde Ralli Sürüyor', summary: 'AI teknolojilerine olan yoğun ilgi, geleneksel hisse senedi piyasalarında da kendini gösteriyor.', source: 'Reuters', time: '3 saat önce', category: 'Geleneksel', sentiment: 'positive', url: '#' },
    { id: 4, title: 'EUR/USD Paritesi Kritik Destek Seviyesinin Altına Geriledi', summary: 'Avrupa Merkez Bankası açıklamaları sonrası Euro tarafında baskı artarken, Dolar endeksi güç kazanıyor.', source: 'ForexLive', time: '5 saat önce', category: 'Forex', sentiment: 'negative', url: '#' },
    { id: 5, title: 'Solana Ağında Yeni Güncelleme: İşlem Ücretleri Düşüyor', summary: 'Geliştirici ekibinin duyurduğu yeni protokol güncellemesi, ağdaki ölçeklenebilirliği artırmayı hedefliyor.', source: 'CryptoNews', time: '8 saat önce', category: 'Kripto', sentiment: 'positive', url: '#' },
    { id: 6, title: 'Altın Fiyatlarında Kar Satışları Hızlandı', summary: 'Tarihi zirvelerinden dönen ons altın, jeopolitik risklerin azalmasıyla gevşeme eğilimine girdi.', source: 'Investing', time: '12 saat önce', category: 'Emtia', sentiment: 'negative', url: '#' },
  ];
};

const SentimentBadge = ({ sentiment }) => {
  switch (sentiment) {
    case 'positive':
      return <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-none">Pozitif</Badge>;
    case 'negative':
      return <Badge className="bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 border-none">Negatif</Badge>;
    default:
      return <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-none">Nötr</Badge>;
  }
};

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tümü');

  const categories = ['Tümü', 'Kripto', 'Forex', 'Geleneksel', 'Emtia'];

  const fetchNews = () => {
    setIsLoading(true);
    // Simulate API network delay
    setTimeout(() => {
      setNews(generateMockNews());
      setIsLoading(false);
    }, 1200);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const filteredNews = news.filter(item => {
    const matchesCategory = activeCategory === 'Tümü' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>Haberler ve Analizler | PiyasaIQ</title>
        <meta name="description" content="Kripto, Forex ve geleneksel piyasalar hakkında güncel haberler ve yapay zeka destekli duyarlılık (sentiment) analizi." />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navigation />

        <main className="flex-1 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header & Search */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
              <div>
                <h1 className="text-4xl font-bold mb-3 tracking-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
                  Piyasa Haberleri
                </h1>
                <p className="text-muted-foreground text-lg">
                  Finans dünyasındaki son gelişmeleri AI duyarlılık analiziyle anında takip edin.
                </p>
              </div>
              
              <div className="w-full md:w-auto relative group">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Haberlerde ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-80 pl-10 pr-4 py-2.5 rounded-xl bg-card border border-white/10 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-foreground"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-white/5">
              <Filter size={16} className="text-muted-foreground mr-2" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-card text-muted-foreground hover:bg-white/5 hover:text-foreground border border-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <motion.div key={`skeleton-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Card className="bg-card border-white/5 h-full">
                        <CardContent className="p-6">
                          <div className="flex justify-between mb-4">
                            <Skeleton className="h-6 w-20 bg-white/5" />
                            <Skeleton className="h-6 w-16 bg-white/5" />
                          </div>
                          <Skeleton className="h-6 w-full bg-white/5 mb-2" />
                          <Skeleton className="h-6 w-3/4 bg-white/5 mb-4" />
                          <Skeleton className="h-16 w-full bg-white/5 mb-6" />
                          <div className="flex justify-between">
                            <Skeleton className="h-4 w-24 bg-white/5" />
                            <Skeleton className="h-4 w-16 bg-white/5" />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                ) : filteredNews.length > 0 ? (
                  filteredNews.map((item, index) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="h-full"
                    >
                      <Card className="bg-card border-white/5 hover:border-white/10 hover:shadow-lg hover:-translate-y-1 transition-all h-full flex flex-col group">
                        <CardContent className="p-6 flex flex-col flex-1">
                          <div className="flex justify-between items-start mb-4">
                            <Badge variant="outline" className="bg-black/20 text-muted-foreground border-white/10">
                              {item.category}
                            </Badge>
                            <SentimentBadge sentiment={item.sentiment} />
                          </div>
                          
                          <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                            {item.title}
                          </h3>
                          
                          <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                            {item.summary}
                          </p>
                          
                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5 text-xs text-muted-foreground">
                            <div className="flex items-center gap-3">
                              <span className="font-medium text-foreground/70">{item.source}</span>
                              <span className="flex items-center gap-1">
                                <Clock size={12} /> {item.time}
                              </span>
                            </div>
                            <a href={item.url} className="text-primary hover:underline flex items-center gap-1">
                              Okumaya Devam Et <ExternalLink size={12} />
                            </a>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-card rounded-2xl border border-white/5"
                  >
                    <Search size={48} className="text-muted-foreground/50 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Haber Bulunamadı</h3>
                    <p className="text-muted-foreground max-w-md">
                      Arama kriterlerinize uygun haber bulunamadı. Lütfen farklı kelimelerle veya filtrelerle tekrar deneyin.
                    </p>
                    <Button onClick={() => {setSearchQuery(''); setActiveCategory('Tümü');}} variant="outline" className="mt-6 border-white/10">
                      Filtreleri Temizle
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Load More (Visual only for mock) */}
            {!isLoading && filteredNews.length > 0 && (
              <div className="mt-12 flex justify-center">
                <Button onClick={fetchNews} variant="outline" className="border-white/10 hover:bg-white/5 text-foreground flex items-center gap-2">
                  <RefreshCw size={16} /> Daha Fazla Yükle
                </Button>
              </div>
            )}
          </div>
        </main>

        <Footer />
        <AIAssistant />
      </div>
    </>
  );
};

export default NewsPage;