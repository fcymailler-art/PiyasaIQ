import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Twitter, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    Ürün: [
      { label: 'Piyasalar', path: '/piyasalar' },
      { label: 'AI Analiz', path: '/ai-analiz' },
      { label: 'Haberler', path: '/haberler' },
      { label: 'Topluluk', path: '/topluluk' },
    ],
    Şirket: [
      { label: 'Hakkımızda', path: '/hakkimizda' },
      { label: 'Fiyatlandırma', path: '/fiyatlandirma' },
      { label: 'Blog', path: '/blog' },
      { label: 'Kariyer', path: '/kariyer' },
    ],
    Destek: [
      { label: 'Yardım Merkezi', path: '/yardim' },
      { label: 'API Dokümantasyonu', path: '/api-docs' },
      { label: 'İletişim', path: '/iletisim' },
      { label: 'Durum', path: '/durum' },
    ],
    Yasal: [
      { label: 'Gizlilik Politikası', path: '/gizlilik' },
      { label: 'Kullanım Koşulları', path: '/kosullar' },
      { label: 'Çerez Politikası', path: '/cerezler' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:info@piyasaiq.com', label: 'Email' },
  ];

  return (
    <footer className="border-t border-white/10 bg-card text-card-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Sparkles size={24} className="text-primary" />
              <span className="text-lg font-bold" style={{ fontFamily: 'Sora, sans-serif' }}>
                PiyasaIQ
              </span>
            </Link>
            <p className="text-sm text-card-foreground/70 mb-6 max-w-xs">
              AI destekli piyasa istihbaratı platformu. Kripto, forex ve finansal piyasalar için gerçek zamanlı analiz ve tahminler.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-hover text-card-foreground/70 hover:bg-primary/20 hover:text-primary transition-all duration-200"
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <span className="text-sm font-semibold mb-4 block">{category}</span>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-card-foreground/70 hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-card-foreground/70">
              © 2026 PiyasaIQ. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/gizlilik" className="text-sm text-card-foreground/70 hover:text-primary transition-colors duration-200">
                Gizlilik Politikası
              </Link>
              <Link to="/kosullar" className="text-sm text-card-foreground/70 hover:text-primary transition-colors duration-200">
                Kullanım Koşulları
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;