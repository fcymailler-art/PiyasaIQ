import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import { Construction } from 'lucide-react';

const HeatMapPage = () => {
  return (
    <>
      <Helmet>
        <title>Isı Haritası - PiyasaIQ</title>
        <meta name="description" content="Piyasa ısı haritası ile tüm varlıkların performansını görsel olarak takip edin." />
      </Helmet>

      <div className="min-h-screen bg-background text-text">
        <Navigation />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20"
          >
            <Construction size={64} className="mx-auto mb-6 text-primary" />
            <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
              Isı Haritası
            </h1>
            <p className="text-secondary text-lg mb-8 max-w-2xl mx-auto">
              Piyasa ısı haritası özelliği yakında kullanıma sunulacak. Tüm varlıkların performansını görsel olarak takip edebileceksiniz.
            </p>
          </motion.div>
        </div>

        <Footer />
        <AIAssistant />
      </div>
    </>
  );
};

export default HeatMapPage;