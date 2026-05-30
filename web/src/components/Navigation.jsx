import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, Bell, User, LogOut, Settings, List, Activity, Sparkles, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import pb from '@/lib/pocketbaseClient';
import { useToast } from '@/hooks/use-toast';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    setIsAuthenticated(pb.authStore.isValid);
    
    const unsubscribe = pb.authStore.onChange((token) => {
      setIsAuthenticated(!!token);
    });
    
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    pb.authStore.clear();
    toast({
      title: "Çıkış yapıldı",
      description: "Başarıyla çıkış yaptınız.",
    });
    setUserMenuOpen(false);
  };

  const navLinks = [
    { path: '/piyasalar', label: 'Piyasalar' },
    { path: '/screener', label: 'Tarayıcı' },
    { path: '/ai-analiz', label: 'AI Analiz' },
    { path: '/watchlist', label: 'İzleme' },
    { path: '/alerts', label: 'Alarmlar' },
    { path: '/haberler', label: 'Haberler' },
    { path: '/hakkimizda', label: 'Hakkımızda' },
  ];

  const bottomNavLinks = [
    { path: '/piyasalar', icon: Activity, label: 'Piyasalar' },
    { path: '/ai-analiz', icon: Sparkles, label: 'AI Analiz' },
    { path: '/screener', icon: Search, label: 'Tarayıcı' },
    { path: '/haberler', icon: List, label: 'Haberler' },
  ];

  const isActive = (path) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path + '/'));

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-white/5 glass-panel">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <div className="relative w-12 h-12 overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-colors">
                <img 
                  src="/logo_olarak_bu.png" 
                  alt="PiyasaIQ Logo" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-text hidden xl:block tracking-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
                PiyasaIQ
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1 mx-4 flex-1 justify-center">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                    isActive(link.path) ? 'text-primary bg-primary/10' : 'text-secondary-foreground/70 hover:text-text hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-primary to-accent"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Global Search & Actions */}
            <div className="flex items-center gap-4 shrink-0">
              <div className="hidden md:flex relative group">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Ara..."
                  className="w-48 lg:w-64 pl-10 pr-4 py-2 rounded-full bg-black/20 border border-white/10 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted-foreground text-foreground"
                />
              </div>

              {isAuthenticated ? (
                <div className="relative">
                  <button 
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary/20 to-accent/20 border border-white/10 flex items-center justify-center hover:border-primary/50 transition-colors"
                  >
                    <User size={18} className="text-foreground" />
                  </button>
                  
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-56 rounded-2xl border border-white/10 bg-card shadow-xl overflow-hidden"
                      >
                        <div className="p-4 border-b border-white/10 bg-black/20">
                          <p className="text-sm font-medium text-foreground truncate">{pb.authStore.model?.email}</p>
                          <p className="text-xs text-muted-foreground mt-1">PRO Üye</p>
                        </div>
                        <div className="p-2 space-y-1">
                          <Link to="/profile" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-primary/10 rounded-xl transition-colors">
                            <User size={16} /> Profil
                          </Link>
                          <Link to="/watchlist" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-primary/10 rounded-xl transition-colors">
                            <List size={16} /> İzleme Listelerim
                          </Link>
                          <Link to="/alerts" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-primary/10 rounded-xl transition-colors">
                            <Bell size={16} /> Alarmlarım
                          </Link>
                          <Link to="/settings" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-primary/10 rounded-xl transition-colors">
                            <Settings size={16} /> Ayarlar
                          </Link>
                        </div>
                        <div className="p-2 border-t border-white/10">
                          <button 
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-xl transition-colors"
                          >
                            <LogOut size={16} /> Çıkış Yap
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-3">
                  <Button variant="ghost" size="sm" className="text-secondary-foreground hover:text-white" asChild>
                    <Link to="/login">Giriş Yap</Link>
                  </Button>
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium" asChild>
                    <Link to="/register">Ücretsiz Başla</Link>
                  </Button>
                </div>
              )}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-secondary-foreground hover:text-white transition-colors duration-200"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Top Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-white/10 bg-card/95 backdrop-blur-xl absolute w-full"
            >
              <div className="px-4 py-4 space-y-2">
                <div className="relative mb-4">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Ara..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/20 border border-white/10 text-sm focus:outline-none focus:border-primary/50 text-foreground"
                  />
                </div>
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors duration-200 ${
                      isActive(link.path)
                        ? 'bg-gradient-to-r from-primary/20 to-transparent text-primary border-l-2 border-primary'
                        : 'text-foreground/80 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                {!isAuthenticated && (
                  <div className="pt-6 pb-2 space-y-3">
                    <Button variant="outline" className="w-full border-white/10 text-foreground" asChild>
                      <Link to="/login">Giriş Yap</Link>
                    </Button>
                    <Button className="w-full bg-primary text-primary-foreground" asChild>
                      <Link to="/register">Ücretsiz Başla</Link>
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-white/10 pb-safe">
        <div className="flex items-center justify-around px-2 py-2">
          {bottomNavLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex flex-col items-center p-2 rounded-xl min-w-[64px] transition-all ${
                  active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className={`p-1.5 rounded-lg mb-1 ${active ? 'bg-primary/20' : ''}`}>
                  <Icon size={20} />
                </div>
                <span className="text-[10px] font-medium">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navigation;
