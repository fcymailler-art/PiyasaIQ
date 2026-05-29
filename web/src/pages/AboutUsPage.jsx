import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Target, Shield, Zap, Sparkles, TrendingUp, Users, BrainCircuit, Activity, Globe } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';

const AboutUsPage = () => {
  const features = [
    {
      icon: BrainCircuit,
      title: "Gerçek Zamanlı AI Analizi",
      description: "Piyasaları 7/24 izleyen, karmaşık verileri saniyeler içinde işleyip özetleyen gelişmiş yapay zeka altyapısı."
    },
    {
      icon: TrendingUp,
      title: "Teknik Analiz Araçları",
      description: "Yüzlerce indikatör, otomatik formasyon tanıma ve TradingView entegrasyonu ile kusursuz grafik deneyimi."
    },
    {
      icon: Users,
      title: "Topluluk İçgüdüsü",
      description: "Binlerce yatırımcının duyarlılığını analiz eden ve sosyal medya trendlerini yakalayan akıllı sentiment motoru."
    },
    {
      icon: Sparkles,
      title: "Premium Screener",
      description: "Kendi stratejinize uygun özel filtrelerle piyasadaki en iyi fırsatları anında filtreleyin."
    },
    {
      icon: Activity,
      title: "Akıllı Uyarı Sistemi",
      description: "Fiyat hedefleri, hacim patlamaları veya indikatör kırılımlarında anında bildirim alın."
    },
    {
      icon: Globe,
      title: "Küresel Kapsam",
      description: "Kripto paralar, Forex, emtialar ve geleneksel borsalar tek bir platformda elinizin altında."
    }
  ];

  const values = [
    {
      icon: Shield,
      title: "Güvenilirlik",
      description: "Verilerimizin doğruluğu ve sistemimizin kesintisiz çalışması bizim için en yüksek önceliktir."
    },
    {
      icon: Zap,
      title: "İnovasyon",
      description: "En son yapay zeka teknolojilerini sürekli takip ediyor ve platformumuza entegre ediyoruz."
    },
    {
      icon: Target,
      title: "Şeffaflık",
      description: "AI modellerimizin nasıl çalıştığı ve analizlerin hangi verilere dayandığı konusunda her zaman açığız."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Hakkımızda | PiyasaIQ</title>
        <meta name="description" content="PiyasaIQ, yatırımcılar için AI destekli profesyonel piyasa istihbaratı ve analiz platformudur." />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 flex flex-col">
        <Navigation />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative pt-24 pb-20 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-balance" style={{ fontFamily: 'Sora, sans-serif' }}>
                  PiyasaIQ Hakkında
                </h1>
                <p className="text-xl md:text-2xl text-primary font-medium mb-6">
                  Piyasanın Zekası - AI Destekli Piyasa İstihbaratı
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  Biz, en son yapay zeka teknolojilerini kullanarak yatırımcıların kripto, forex ve geleneksel piyasalarda daha akıllı, hızlı ve veriye dayalı kararlar almasını sağlayan yeni nesil bir analiz platformuyuz.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="py-20 bg-card/50 border-y border-white/5 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 text-primary mb-6">
                    <Target size={24} />
                  </div>
                  <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Misyonumuz</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Karmaşık piyasa verilerini, teknik analizleri ve haber akışlarını yapay zeka gücüyle sentezleyerek, her seviyeden yatırımcı için anlaşılabilir ve eyleme dönüştürülebilir içgörülere çevirmek. Sizin adınıza piyasayı izliyor, analiz ediyor ve en doğru zamanda en doğru bilgiyi sunuyoruz.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-accent/10 text-accent mb-6">
                    <Sparkles size={24} />
                  </div>
                  <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Vizyonumuz</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Yatırım dünyasında bilgi asimetrisini ortadan kaldırarak, kurumsal yatırımcıların sahip olduğu güçlü analiz yeteneklerini demokratikleştirmek ve bireysel yatırımcıların piyasalarda daha güvenli adımlar atmasını sağlamak.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Key Features */}
          <section className="py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Neden PiyasaIQ?</h2>
                <p className="text-muted-foreground text-lg">Modern yatırımcının ihtiyaç duyduğu her şey tek platformda.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="p-8 rounded-3xl bg-card border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                      <feature.icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="py-24 bg-gradient-to-b from-transparent to-card/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Değerlerimiz</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {values.map((value, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2, duration: 0.5 }}
                    className="flex flex-col items-center text-center p-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-secondary/10 text-secondary flex items-center justify-center mb-6 ring-8 ring-secondary/5">
                      <value.icon size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
        <AIAssistant />
      </div>
    </>
  );
};

export default AboutUsPage;