import TradingViewTickerTape from '../components/TradingViewTickerTape';
import TradingViewMarketOverview from '../components/TradingViewMarketOverview';
import { Link } from 'react-router-dom';
import { Search, Globe, BarChart3, Zap } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import LiveTicker from '../components/LiveTicker';
import AICards from '../components/AICards';
import TrendCoins from '../components/TrendCoins';
import AIHeatmapSection from '../components/AIHeatmapSection';
import AINewsSection from '../components/AINewsSection';
import PricingSection from '../components/PricingSection';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AIChatWidget from '../components/AIChatWidget';

  export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <LiveTicker />
      <AICards />
      <TrendCoins />
      <AIHeatmapSection />
      <AINewsSection />
      <PricingSection />
      <Footer />
      <AIChatWidget />
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Header */}
      <header className="relative z-40 bg-black/80 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="https://media.base44.com/images/public/6a15692cb8d91bb70ada2ad4/b310f0f10_logoolarakbu.png" alt="PiyasaIQ" className="h-16 w-auto" />
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm">
            <button className="hover:text-purple-400 transition">Ürünler</button>
            <button className="hover:text-purple-400 transition">Topluluk</button>
            <button className="hover:text-purple-400 transition">Piyasalar</button>
            <button className="hover:text-purple-400 transition">Araştırma</button>
          </nav>

          <div className="flex items-center gap-4">
            <button className="hidden sm:block p-2 hover:bg-white/10 rounded-lg transition">
              <Search size={20} />
            </button>
            <button className="hidden sm:block px-4 py-2 rounded-lg hover:bg-white/10 transition">TR</button>
            <button className="px-6 py-2 bg-purple-600 rounded-full hover:bg-purple-700 transition font-medium">
              Başla
            </button>
          </div>
        </div>
      </header>

      {/* Ticker Tape */}
      <div className="bg-black border-b border-white/10">
        <TradingViewTickerTape />
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover"
          src="https://media.base44.com/videos/public/6a15692cb8d91bb70ada2ad4/f526bf065_spacehvc1f1e5855a3a06ff6e7cd1.mp4"
        />
        {/* Fallback Image */}
        <img
          src="https://media.base44.com/images/public/6a15692cb8d91bb70ada2ad4/55562bc8c_Ekrangrnts2026-05-26112711.png"
          alt="Space Background"
          className="absolute inset-0 w-full h-full object-cover hidden"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />

        {/* Content */}
        <div className="relative z-20 text-center max-w-3xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Bakın önce<br />Sonra yatırım yapın.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            En iyi işlemler önce araştırma, sonra kararlılık gerektirir.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-100 transition">
              Ücretsiz Başla
            </button>
            <span className="text-gray-400 text-sm">Sonsuza kadar 0₺, kredi kartı gerekmez</span>
          </div>
        </div>
      </section>

      {/* Market Overview */}
      <section className="bg-black py-16 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Dünya piyasaları nerede?</h2>
          <TradingViewMarketOverview />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-black py-20 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Neden PiyasaIQ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-xl font-bold">Profesyonel Analiz</h3>
              <p className="text-gray-400">Gerçek zamanlı piyasa verileri ve derinlemesine analizler</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold">AI Asistanı</h3>
              <p className="text-gray-400">Yapay zeka destekli öneriler ve piyasa öngörüleri</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-bold">Global Piyasalar</h3>
              <p className="text-gray-400">Dünyadaki tüm önemli borsalara anında erişim</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant Section */}
      <section className="bg-gradient-to-b from-black via-purple-950/20 to-black py-20 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Akıllı Asistan ile Yatırım Yapın</h2>
              <p className="text-gray-400 mb-8 text-lg">
                PiyazaIQ AI asistanı, piyasa analizlerini 24/7 yaparak size en iyi yatırım kararlarında yardımcı olur.
              </p>
              <ul className="space-y-4 text-gray-300">
                <li className="flex gap-3">
                  <span className="text-purple-500">✓</span>
                  <span>Gerçek zamanlı piyasa tavsiyesi</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-500">✓</span>
                  <span>Kişiselleştirilmiş portföy analizi</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-500">✓</span>
                  <span>Risk yönetimi stratejileri</span>
                </li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 flex items-center justify-center">
              <img src="https://media.base44.com/images/public/6a15692cb8d91bb70ada2ad4/67c92ac20_Ekrangrnts2026-05-25143454.png" alt="AI Asistan" className="w-full h-auto object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Geleceği kendi ellerine alan milyonlara katılın</h2>
          <p className="text-gray-400 mb-8 text-lg">100 milyondan fazla yatırımcı PiyazaIQ'yu güveniyor</p>
          <button className="px-8 py-4 bg-purple-600 rounded-full font-bold text-lg hover:bg-purple-700 transition">
            Şimdi Başla
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 border-t border-white/10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-bold mb-4">Ürünler</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Grafik</a></li>
                <li><a href="#" className="hover:text-white transition">Tarayıcı</a></li>
                <li><a href="#" className="hover:text-white transition">AI Asistanı</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Şirket</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Hakkında</a></li>
                <li><a href="#" className="hover:text-white transition">İş Ortaklıkları</a></li>
                <li><a href="#" className="hover:text-white transition">Kariyer</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Yasal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Gizlilik</a></li>
                <li><a href="#" className="hover:text-white transition">Koşullar</a></li>
                <li><a href="#" className="hover:text-white transition">Disclaimer</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">İletişim</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Destek</a></li>
                <li><a href="#" className="hover:text-white transition">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2026 PiyazaIQ. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
