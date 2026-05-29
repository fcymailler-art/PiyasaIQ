import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Merhaba! Ben PiyasaIQ AI Asistanı. Piyasalar hakkında ne sormak istersiniz?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);
    try {
      const res = await base44.integrations.Core.InvokeLLM({
        prompt: `Sen PiyasaIQ AI Asistanısın. Finansal piyasalar, kripto, forex ve hisse senetleri konusunda uzman bir AI'sın. Kısa, net ve profesyonel yanıtlar ver. Türkçe yanıt ver. Kullanıcı sorusu: ${userMsg}`,
        response_json_schema: { type: 'object', properties: { answer: { type: 'string' } } }
      });
      setMessages(prev => [...prev, { role: 'ai', content: res.answer }]);
    } catch {
      setMessages(prev => [...prev, { role: 'ai', content: 'Üzgünüm, şu an yanıt veremedim. Lütfen tekrar deneyin.' }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center shadow-2xl glow-blue"
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] h-[480px] glass-card flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                <img src="https://media.base44.com/images/public/6a155c8b37c8fb987c29578e/da7f07211_Ekrangrnts2026-05-25143454.png" alt="AI" className="w-full h-full object-cover object-top" />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">PiyasaIQ AI</div>
                <div className="text-xs text-emerald-400">Çevrimiçi</div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary text-white rounded-br-md'
                      : 'bg-muted text-foreground rounded-bl-md'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                    <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/5">
              <div className="flex items-center gap-2 bg-muted/50 rounded-xl px-3 py-2">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && send()}
                  placeholder="AI'ya soru sor..."
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                />
                <button onClick={send} disabled={loading || !input.trim()} className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center disabled:opacity-40 transition-opacity">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}