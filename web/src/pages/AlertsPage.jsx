import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Bell, Plus, CheckCircle2, AlertCircle, Clock, Trash2, Power, Activity } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import pb from '@/lib/pocketbaseClient';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

const AlertsPage = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = pb.authStore.isValid;

  useEffect(() => {
    const fetchAlerts = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }
      try {
        const records = await pb.collection('alerts').getFullList({
          sort: '-created',
          $autoCancel: false
        });
        setAlerts(records);
      } catch (err) {
        console.error("Alerts fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, [isAuthenticated]);

  const handleCreateMock = async () => {
    if (!isAuthenticated) {
      toast.error("Lütfen giriş yapın.");
      return;
    }
    try {
      const data = {
        "userId": pb.authStore.model.id,
        "assetSymbol": "BTCUSDT",
        "alertType": "price_above",
        "targetValue": 70000,
        "isActive": true
      };
      const record = await pb.collection('alerts').create(data, { $autoCancel: false });
      setAlerts([record, ...alerts]);
      toast.success("Alarm oluşturuldu.");
    } catch (err) {
      toast.error("Hata oluştu.");
    }
  };

  const getAlertIcon = (type) => {
    if (type.includes('price')) return <Bell size={18} className="text-secondary" />;
    if (type.includes('rsi') || type.includes('macd') || type.includes('ma')) return <Activity size={18} className="text-accent" />;
    return <AlertCircle size={18} className="text-primary" />;
  };

  const getAlertLabel = (alert) => {
    switch (alert.alertType) {
      case 'price_above': return `Fiyat $${alert.targetValue} üzerine çıkarsa`;
      case 'price_below': return `Fiyat $${alert.targetValue} altına düşerse`;
      case 'rsi_overbought': return `RSI Aşırı Alım (>70)`;
      case 'volume_spike': return `Hacim Patlaması`;
      default: return alert.alertType;
    }
  };

  return (
    <>
      <Helmet>
        <title>Alarmlarım | PiyasaIQ</title>
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />

        <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
                Alarmlarım
              </h1>
              <p className="text-muted-foreground">Piyasa hareketlerini asla kaçırmayın.</p>
            </div>
            <Button onClick={handleCreateMock} className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus size={16} className="mr-2" /> Yeni Alarm
            </Button>
          </div>

          {!isAuthenticated ? (
            <div className="rounded-3xl border border-white/5 bg-card p-12 text-center">
              <Bell size={32} className="text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Giriş Yapın</h3>
              <p className="text-muted-foreground">Alarm kurmak için hesabınıza giriş yapın.</p>
            </div>
          ) : loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-20 rounded-2xl" />)}
            </div>
          ) : alerts.length === 0 ? (
            <div className="rounded-3xl border border-white/5 bg-card p-12 text-center border-dashed">
              <h3 className="text-xl font-bold mb-2">Aktif alarmınız yok</h3>
              <p className="text-muted-foreground mb-6">Fiyat veya indikatör hedefleri için hemen bir alarm kurun.</p>
              <Button onClick={handleCreateMock} variant="outline" className="border-white/10">Alarm Kur</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {alerts.map((alert, i) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={alert.id}
                  className={`flex items-center justify-between p-5 rounded-2xl border ${alert.isActive ? 'border-white/10 bg-card' : 'border-white/5 bg-card/50 opacity-70'} transition-all`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${alert.isActive ? 'bg-white/5' : 'bg-transparent'}`}>
                      {alert.isActive ? (
                        <Bell size={20} className="text-primary" />
                      ) : (
                        <Power size={20} className="text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-foreground">{alert.assetSymbol}</span>
                        {alert.isActive && (
                          <span className="flex items-center text-[10px] uppercase font-bold text-success bg-success/10 px-2 py-0.5 rounded">
                            Aktif
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {getAlertLabel(alert)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors">
                      <Power size={16} />
                    </button>
                    <button className="p-2 rounded-lg text-muted-foreground hover:text-danger hover:bg-danger/10 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default AlertsPage;