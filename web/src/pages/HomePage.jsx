import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Filter, BellRing, ListPlus, LineChart, BrainCircuit, Activity } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  const logoUrl = "https://horizons-cdn.hostinger.com/eae5894d-bf92-4992-92ae-fc225b74637a/a6ee22f74ed0df941087def6045bcd2f.png";

  const features = [
    {
      icon: BrainCircuit,
      title: "AI Destekli Analiz",
      description: "Karmaşık verileri anında işleyen modellerle, teknik ve temel analizi saniyeler içinde yorumlayın.",
      link: "/ai-analiz",
      colSpan: "col-span-1 md:col-span-2",
      bg: "bg-gradient-to-br from-card to-primary/5"
    },
    {
      icon: Filter,
      title: "Gelişmiş Tarayıcı",
      description: "Kendi stratejinize uygun binlerce varlığı anında filtreleyin.",
      link: "/screener",
      colSpan: "col-span-1",
      bg: "bg-card"
    },
    {
      icon: BellRing,
      title: "Akıllı Alarmlar",
      description: "İndikatör kırılımları ve fiyat hedefleri için uyarılar kurun.",
      link: "/alerts",
      colSpan: "col-span-1",
      bg: "bg-card"
    },
    {
      icon: LineChart,
      title: "Profesyonel Grafik",
      description: "TradingView gücüyle donatılmış analiz araçlarıyla piyasaya hakim olun.",
      link: "/piyasalar",
      colSpan: "col-span-1 md:col-span-2",
      bg: "bg-gradient-to-br from-card to-accent/5"
    }
  ];

  return (
    <>
      <Helmet>
        <title>PiyasaIQ | Profesyonel Kripto & Hisse Analiz Platformu</title>
        <meta name="description" content="AI destekli tarayıcı, akıllı izleme listeleri ve gerçek zamanlı alarmlar ile profesyonel yatırım kararları alın." />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 flex flex-col">
        <Navigation />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative min-h-[90vh] flex items-center pt-20 pb-24 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent/10 via-background to-background" />
            
            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-soft-light" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
              <div className="flex flex-col items-center text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, type: "spring" }}
                  className="mb-8 relative"
                >
                  <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                  <img src={logoUrl} alt="PiyasaIQ Logo" className="w-40 h-40 md:w-48 md:h-48 object-contain relative drop-shadow-2xl" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="max-w-4xl"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6 text-sm font-medium text-foreground/80">
                    <Sparkles size={16} className="text-primary" />
                    Gerçek Zamanlı Piyasa İstihbaratı
                  </div>

                  <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight text-balance" style={{ fontFamily: 'Sora, sans-serif' }}>
                    Yatırımlarınızı <br />
                    <span className="gradient-text">Yapay Zeka</span> ile Yönetin
                  </h1>

                  <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                    Saniyesinde güncellenen analizler, duyarlılık (sentiment) skorları ve akıllı tarayıcı ile piyasanın bir adım önünde olun. Veriye dayalı kazançlı kararlar alın.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_30px_rgba(0,217,255,0.25)] hover:shadow-[0_0_40px_rgba(0,217,255,0.4)] transition-all" asChild>
                      <Link to="/ai-analiz">
                        AI Analizini Keşfet <ArrowRight size={18} className="ml-2" />
                      </Link>
                    </Button>
                    <div className="flex gap-4 w-full sm:w-auto">
                      <Button size="lg" variant="outline" className="flex-1 sm:w-auto h-14 px-6 border-white/10 hover:bg-white/5 bg-black/20 backdrop-blur-sm" asChild>
                        <Link to="/screener">Tarayıcı</Link>
                      </Button>
                      <Button size="lg" variant="outline" className="flex-1 sm:w-auto h-14 px-6 border-white/10 hover:bg-white/5 bg-black/20 backdrop-blur-sm" asChild>
                        <Link to="/alerts">Alarmlar</Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-12 border-y border-white/5 bg-black/40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div className="space-y-2">
                  <h4 className="text-4xl font-bold text-primary" style={{ fontVariantNumeric: 'tabular-nums' }}>47.2k+</h4>
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Aktif Yatırımcı</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-4xl font-bold text-foreground" style={{ fontVariantNumeric: 'tabular-nums' }}>1.2M</h4>
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Günlük Analiz</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-4xl font-bold text-accent" style={{ fontVariantNumeric: 'tabular-nums' }}>500+</h4>
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Kripto & Varlık</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-4xl font-bold text-foreground" style={{ fontVariantNumeric: 'tabular-nums' }}>99.8%</h4>
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Sistem Kesintisizliği</p>
                </div>
              </div>
            </div>
          </section>

          {/* Bento Grid Features */}
          <section className="py-24 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-16 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
                  Güçlü Araçlar. <span className="text-primary">Net Sonuçlar.</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl text-lg">
                  Yatırım kararlarınızı veri ve teknoloji ile destekleyin. İhtiyacınız olan her şey tek bir platformda.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, i) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className={`${feature.colSpan} group relative overflow-hidden rounded-3xl border border-white/5 ${feature.bg} p-8 hover:border-white/10 transition-colors flex flex-col h-full`}
                    >
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-transform group-hover:scale-110" />
                      
                      <div className="relative z-10 h-full flex flex-col">
                        <div className="w-12 h-12 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                          <Icon size={24} />
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-3 tracking-tight">{feature.title}</h3>
                        <p className="text-muted-foreground mb-8 flex-grow text-lg leading-relaxed">
                          {feature.description}
                        </p>
                        
                        <Link to={feature.link} className="inline-flex items-center text-sm font-semibold text-primary group-hover:text-white transition-colors mt-auto w-fit">
                          İncele <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* About Us Preview */}
          <section className="py-24 bg-card/30 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/10 text-secondary text-sm font-semibold mb-6 uppercase tracking-wider">
                    <Activity size={16} /> PiyasaIQ Nedir?
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-balance" style={{ fontFamily: 'Sora, sans-serif' }}>
                    Yatırım dünyasındaki karmaşayı ortadan kaldırıyoruz.
                  </h2>
                  <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                    Misyonumuz, kurumsal devlerin sahip olduğu yapay zeka analiz gücünü bireysel yatırımcılar için erişilebilir kılmaktır. Şeffaf, hızlı ve güvenilir veriyle kendi potansiyelinizi ortaya çıkarın.
                  </p>
                  
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3 text-foreground font-medium">
                      <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">✓</div>
                      Tamamen veriye dayalı şeffaf algoritmalar
                    </li>
                    <li className="flex items-center gap-3 text-foreground font-medium">
                      <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">✓</div>
                      Özelleştirilebilir göstergeler ve alarmlar
                    </li>
                    <li className="flex items-center gap-3 text-foreground font-medium">
                      <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">✓</div>
                      Binlerce aktif kullanıcıya sahip topluluk
                    </li>
                  </ul>

                  <Button variant="outline" size="lg" className="border-white/10 hover:bg-white/5" asChild>
                    <Link to="/hakkimizda">Hakkımızda Daha Fazla Bilgi <ArrowRight size={16} className="ml-2" /></Link>
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 blur-3xl rounded-full opacity-50" />
                  <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-card/80 backdrop-blur p-8">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 rounded-full bg-black/40 flex items-center justify-center border border-white/5">
                        <img src="https://horizons-cdn.hostinger.com/eae5894d-bf92-4992-92ae-fc225b74637a/77e19236327cde3cfcb4b33104e4ba04.png" alt="AI Mascot" className="w-8 h-8 object-cover rounded-full" />
                      </div>
                      <div>
                        <h4 className="font-bold">PiyasaIQ Alpha</h4>
                        <p className="text-sm text-primary">Sistem Çevrimiçi</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="h-4 w-3/4 bg-white/5 rounded animate-pulse" />
                      <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
                      <div className="h-4 w-5/6 bg-white/5 rounded animate-pulse" />
                      <div className="p-4 rounded-xl bg-white/5 border border-white/5 mt-6">
                        <div className="flex justify-between items-center text-sm mb-2">
                          <span className="text-muted-foreground">Analiz Doğruluk Oranı (Son 30 Gün)</span>
                          <span className="font-bold text-emerald-500">84.3%</span>
                        </div>
                        <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 w-[84.3%]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
