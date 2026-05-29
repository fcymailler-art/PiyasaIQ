import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { BrainCircuit, TrendingUp, TrendingDown, Minus, Info, Zap, BarChart2, MessageSquare, AlertTriangle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const AIAnalysisPage = () => {
  const topPredictions = [
    { symbol: 'BTC/USDT', name: 'Bitcoin', score: 92, sentiment: 'bullish', price: '$64,230.00', change: '+2.4%' },
    { symbol: 'ETH/USDT', name: 'Ethereum', score: 88, sentiment: 'bullish', price: '$3,450.20', change: '+1.8%' },
    { symbol: 'SOL/USDT', name: 'Solana', score: 75, sentiment: 'neutral', price: '$145.60', change: '-0.5%' },
    { symbol: 'ADA/USDT', name: 'Cardano', score: 42, sentiment: 'bearish', price: '$0.45', change: '-3.2%' },
  ];

  const getSentimentDetails = (sentiment) => {
    switch(sentiment) {
      case 'bullish': return { icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10', label: 'Boğa (Yükseliş)' };
      case 'bearish': return { icon: TrendingDown, color: 'text-rose-500', bg: 'bg-rose-500/10', label: 'Ayı (Düşüş)' };
      default: return { icon: Minus, color: 'text-amber-500', bg: 'bg-amber-500/10', label: 'Nötr' };
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 60) return 'bg-emerald-400';
    if (score >= 40) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <>
      <Helmet>
        <title>AI Analiz | PiyasaIQ</title>
        <meta name="description" content="Yapay zeka destekli piyasa tahminleri, sentiment analizi ve skorlamalar." />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navigation />

        <main className="flex-1 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="max-w-2xl"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  <BrainCircuit size={16} />
                  <span>Alpha Model v2.4 Devrede</span>
                </div>
                <h1 className="text-4xl font-bold mb-3 tracking-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
                  Yapay Zeka Piyasa Analizi
                </h1>
                <p className="text-muted-foreground text-lg">
                  Makine öğrenimi algoritmalarımızın teknik göstergeler, haber duyarlılığı ve zincir üstü verileri birleştirerek ürettiği gerçek zamanlı içgörüler.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-sm text-muted-foreground bg-card px-4 py-2 rounded-xl border border-white/5"
              >
                <Zap size={16} className="text-amber-500" />
                Son güncelleme: 2 dakika önce
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column: Top Signals */}
              <div className="lg:col-span-2 space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <TrendingUp size={20} className="text-primary" /> En Yüksek AI Skorları
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {topPredictions.map((item, idx) => {
                      const sentiment = getSentimentDetails(item.sentiment);
                      const Icon = sentiment.icon;
                      return (
                        <Card key={idx} className="bg-card border-white/5 hover:border-white/10 transition-colors">
                          <CardContent className="p-5">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="font-bold text-lg">{item.symbol}</h3>
                                <p className="text-sm text-muted-foreground">{item.name}</p>
                              </div>
                              <div className={`flex flex-col items-end`}>
                                <span className="font-semibold">{item.price}</span>
                                <span className={`text-sm ${item.change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                                  {item.change}
                                </span>
                              </div>
                            </div>
                            
                            <div className="space-y-4">
                              <div>
                                <div className="flex justify-between text-sm mb-1.5">
                                  <span className="text-muted-foreground flex items-center gap-1">
                                    AI Güven Skoru
                                    <Info size={12} className="text-muted-foreground/50" />
                                  </span>
                                  <span className="font-bold">{item.score}/100</span>
                                </div>
                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${item.score}%` }}
                                    transition={{ duration: 1, delay: 0.2 + (idx * 0.1) }}
                                    className={`h-full ${getScoreColor(item.score)}`}
                                  />
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                                <span className="text-sm text-muted-foreground">Genel Yön:</span>
                                <Badge variant="secondary" className={`${sentiment.bg} ${sentiment.color} border-none font-medium flex items-center gap-1`}>
                                  <Icon size={12} /> {sentiment.label}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="bg-card border-white/5">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <MessageSquare size={20} className="text-accent" /> Yapay Zeka Özeti
                      </CardTitle>
                      <CardDescription>Son 24 saatin teknik ve duyarlılık analizi özeti.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>
                        Küresel piyasalarda makroekonomik verilerin beklentilerin üzerinde gelmesiyle birlikte risk iştahında artış gözlemleniyor. 
                        <strong>Bitcoin (BTC)</strong> 63,500$ direncini kırmasının ardından algoritma modellerimizde güçlü bir <em>"Al"</em> sinyali üretmeye devam ediyor. Hacim ağırlıklı göstergeler, kurumsal girişlerin bu bölgede yoğunlaştığına işaret ediyor.
                      </p>
                      <p>
                        Öte yandan altcoin piyasasında seçici bir ayrışma mevcut. <strong>Ethereum (ETH)</strong> ağındaki güncellemeler beklentisiyle pozitif ivme korunurken, daha küçük hacimli projelerde kısa vadeli kar satışları (düşüş yönlü baskı) tespit edilmiştir. Modellerimiz önümüzdeki 48 saat için volatilite artışı öngörmektedir.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Right Column: Methodology & Sentiment */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="bg-card border-white/5">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <BarChart2 size={18} className="text-secondary" /> Piyasa Duyarlılığı
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-8 border-emerald-500/20 text-emerald-500 mb-2 relative">
                          <span className="text-4xl font-bold">68</span>
                          <svg className="absolute inset-0 w-full h-full -rotate-90">
                            <circle cx="50%" cy="50%" r="46%" fill="transparent" stroke="currentColor" strokeWidth="8" strokeDasharray="289" strokeDashoffset="92" className="text-emerald-500" />
                          </svg>
                        </div>
                        <p className="font-semibold text-lg text-emerald-500">Açgözlülük (Greed)</p>
                        <p className="text-xs text-muted-foreground">Sosyal medya ve haber analizine dayalı</p>
                      </div>
                      
                      <div className="space-y-3 pt-4 border-t border-white/5">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Pozitif Haberler</span>
                            <span className="text-emerald-500">62%</span>
                          </div>
                          <Progress value={62} className="h-1.5 [&>div]:bg-emerald-500 bg-muted" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Nötr Haberler</span>
                            <span className="text-amber-500">25%</span>
                          </div>
                          <Progress value={25} className="h-1.5 [&>div]:bg-amber-500 bg-muted" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Negatif Haberler</span>
                            <span className="text-rose-500">13%</span>
                          </div>
                          <Progress value={13} className="h-1.5 [&>div]:bg-rose-500 bg-muted" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="bg-muted/50 border-none">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        <AlertTriangle size={14} /> Metodoloji
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Yapay zeka skorlarımız kesin bir yatırım tavsiyesi değildir. Sistemimiz; fiyat hareketleri, RSI, MACD gibi 50'den fazla teknik indikatörü ve NLP (Doğal Dil İşleme) ile taranan günlük 10,000+ haber başlığını analiz ederek istatistiksel olasılıklar sunar. İşlemlerinizde daima kendi risk yönetiminizi uygulayınız.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

            </div>
          </div>
        </main>

        <Footer />
        <AIAssistant />
      </div>
    </>
  );
};

export default AIAnalysisPage;