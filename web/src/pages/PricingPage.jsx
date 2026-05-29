import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import { CreditCard } from 'lucide-react';

const PricingPage = () => {
  return (
    <>
      <Helmet>
        <title>Fiyatlandırma - PiyasaIQ</title>
        <meta name="description" content="PiyasaIQ fiyatlandırma planları ve özellikler." />
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
            <CreditCard size={64} className="mx-auto mb-6 text-primary" />
            <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
              Fiyatlandırma
            </h1>
            <p className="text-secondary text-lg mb-8 max-w-2xl mx-auto">
              Detaylı fiyatlandırma sayfası yakında kullanıma sunulacak. Ana sayfadaki fiyatlandırma bölümünden planları inceleyebilirsiniz.
            </p>
          </motion.div>
        </div>

        <Footer />
        <AIAssistant />
      </div>
    </>
  );
};

export default PricingPage;