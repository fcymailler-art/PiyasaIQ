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
}
