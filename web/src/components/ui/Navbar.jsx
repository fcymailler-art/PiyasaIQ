import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Menu, X, Sparkles, TrendingUp, BarChart3, Users, Newspaper, Grid3X3, SlidersHorizontal } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Piyasalar', path: '/piyasalar', icon: TrendingUp },
  { label: 'AI Analiz', path: '/ai-analiz', icon: Sparkles },
  { label: 'Haberler', path: '/haberler', icon: Newspaper },
  { label: 'Isı Haritası', path: '/isi-haritasi', icon: Grid3X3 },
  { label: 'Topluluk', path: '/topluluk', icon: Users },
  { label: 'Eleme', path: '/eleme', icon: SlidersHorizontal },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <img src="https://media.base44.com/images/public/6a155c8b37c8fb987c29578e/d22735383_logoolarakbu.png" alt="PiyasaIQ" className="h-10 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            <button className="hidden sm:flex w-9 h-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
              <Search className="w-4.5 h-4.5" />
            </button>
            <button className="hidden sm:flex w-9 h-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors relative">
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
            </button>
            <Link to="/login" className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Giriş Yap
            </Link>
            <Link to="/fiyatlandirma" className="hidden sm:inline-flex px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 transition-opacity">
              Premium
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-white/5 bg-background/95 backdrop-blur-xl"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    location.pathname === link.path ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 flex gap-2">
                <Link to="/login" onClick={() => setMobileOpen(false)} className="flex-1 text-center py-2.5 rounded-xl text-sm font-medium border border-white/10 text-foreground">Giriş Yap</Link>
                <Link to="/fiyatlandirma" onClick={() => setMobileOpen(false)} className="flex-1 text-center py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-primary to-secondary text-white">Premium</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}