import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import MarketsPage from './pages/MarketsPage';
import MarketDetailPage from './pages/MarketDetailPage';
import HeatMapPage from './pages/HeatMapPage';
import NewsPage from './pages/NewsPage';
import CommunityPage from './pages/CommunityPage';
import ProfilePage from './pages/ProfilePage';
import PricingPage from './pages/PricingPage';
import ScreenerPage from './pages/ScreenerPage';
import WatchlistPage from './pages/WatchlistPage';
import AlertsPage from './pages/AlertsPage';
import AboutUsPage from './pages/AboutUsPage';
import AIAnalysisPage from './pages/AIAnalysisPage';
import AIAssistant from './components/AIAssistant';
import { Toaster } from 'sonner';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/piyasalar" element={<MarketsPage />} />
        <Route path="/piyasalar/:symbol" element={<MarketDetailPage />} />
        <Route path="/piyasalar/isı-haritası" element={<HeatMapPage />} />
        <Route path="/haberler" element={<NewsPage />} />
        <Route path="/topluluk" element={<CommunityPage />} />
        <Route path="/topluluk/profil/:userId" element={<ProfilePage />} />
        <Route path="/fiyatlandirma" element={<PricingPage />} />
        <Route path="/screener" element={<ScreenerPage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/hakkimizda" element={<AboutUsPage />} />
        <Route path="/ai-analiz" element={<AIAnalysisPage />} />
        
        <Route path="*" element={
          <div className="min-h-screen bg-background text-foreground flex items-center justify-center flex-col">
            <div className="text-center p-8 bg-card rounded-3xl border border-white/5 max-w-md">
              <h1 className="text-6xl font-bold mb-4 text-primary">404</h1>
              <p className="text-lg font-semibold mb-2">Sayfa Bulunamadı</p>
              <p className="text-muted-foreground mb-8">Aradığınız sayfa taşınmış veya silinmiş olabilir.</p>
              <a href="/" className="inline-flex items-center justify-center h-10 px-6 font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Ana Sayfaya Dön
              </a>
            </div>
          </div>
        } />
      </Routes>
      <AIAssistant />
      <Toaster theme="dark" />
    </Router>
  );
}

export default App;
