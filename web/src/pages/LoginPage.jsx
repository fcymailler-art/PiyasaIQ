import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import pb from '@/lib/pocketbaseClient';
import { toast } from 'sonner';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) { toast.error('Lütfen tüm alanları doldurun.'); return; }
    setLoading(true);
    try {
      await pb.collection('users').authWithPassword(email, password);
      toast.success('Giriş başarılı!');
      navigate('/');
    } catch (err) {
      toast.error('Email veya şifre hatalı.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet><title>Giriş Yap | PiyasaIQ</title></Helmet>
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <img src="https://horizons-cdn.hostinger.com/eae5894d-bf92-4992-92ae-fc225b74637a/a6ee22f74ed0df941087def6045bcd2f.png" alt="PiyasaIQ" className="w-12 h-12 object-contain" />
              <span className="text-2xl font-bold" style={{ fontFamily: 'Sora, sans-serif' }}>PiyasaIQ</span>
            </Link>
            <h1 className="text-3xl font-bold text-foreground mb-2">Hoş Geldiniz</h1>
            <p className="text-muted-foreground">Hesabınıza giriş yapın</p>
          </div>

          <div className="glass-card p-8">
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="ornek@email.com"
                    className="w-full pl-10 pr-4 py-3 bg-muted/30 border border-white/10 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Şifre</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 bg-muted/30 border border-white/10 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all" />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                Hesabınız yok mu?{' '}
                <Link to="/register" className="text-primary hover:text-primary/80 font-medium transition-colors">
                  Ücretsiz Kayıt Ol
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="w-3 h-3 text-primary" />
              <span>PiyasaIQ — Piyasanın Zekası</span>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
