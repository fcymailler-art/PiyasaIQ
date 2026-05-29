import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Minimize2, Sparkles } from 'lucide-react';
import IntegratedAiChat from '@/components/integrated-ai-chat';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const mascotUrl = "https://horizons-cdn.hostinger.com/eae5894d-bf92-4992-92ae-fc225b74637a/77e19236327cde3cfcb4b33104e4ba04.png";

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              width: isExpanded ? '80vw' : '400px',
              height: isExpanded ? '80vh' : '600px',
              maxWidth: isExpanded ? '1200px' : 'calc(100vw - 32px)'
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.4 }}
            className={`fixed ${isExpanded ? 'bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2' : 'bottom-20 right-4 md:bottom-24 md:right-6'} z-[60] flex flex-col rounded-3xl border border-white/10 bg-card shadow-2xl overflow-hidden`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-card to-secondary/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              
              <div className="flex items-center gap-3 relative z-10">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-black/40 border border-white/10 p-1 overflow-hidden">
                    <img src={mascotUrl} alt="Llama AI Mascot" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card bg-emerald-500 flex items-center justify-center">
                    <Sparkles size={8} className="text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                    PiyasaIQ AI
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-primary/20 text-primary uppercase">Alpha</span>
                  </h3>
                  <p className="text-xs text-muted-foreground">Piyasa Analisti</p>
                </div>
              </div>

              <div className="flex items-center gap-1 relative z-10">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 rounded-xl hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
                >
                  {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Chat Content Container */}
            <div className="flex-1 overflow-hidden relative bg-black/20">
              <IntegratedAiChat />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 p-0 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-[0_0_30px_rgba(0,217,255,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] hover:scale-105 transition-all duration-300 flex items-center justify-center group overflow-hidden"
      >
        {isOpen ? (
          <X size={24} className="group-hover:rotate-90 transition-transform duration-300 relative z-10" />
        ) : (
          <div className="relative w-full h-full p-1 z-10">
            <img src={mascotUrl} alt="AI Mascot" className="w-full h-full object-cover rounded-full drop-shadow-md" />
          </div>
        )}
        <div className="absolute inset-0 rounded-full border border-white/20 z-20 pointer-events-none" />
      </motion.button>
    </>
  );
};

export default AIAssistant;