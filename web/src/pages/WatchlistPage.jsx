import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Plus, GripVertical, TrendingUp, TrendingDown, MoreVertical, LayoutGrid, List as ListIcon, BookmarkPlus } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import pb from '@/lib/pocketbaseClient';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

const WatchlistPage = () => {
  const [watchlists, setWatchlists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const isAuthenticated = pb.authStore.isValid;

  useEffect(() => {
    const fetchWatchlists = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }
      try {
        const records = await pb.collection('watchlists').getFullList({
          sort: '-created',
          $autoCancel: false
        });
        setWatchlists(records);
      } catch (err) {
        console.error("Watchlist fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlists();
  }, [isAuthenticated]);

  const handleCreateMock = async () => {
    if (!isAuthenticated) {
      toast.error("Lütfen giriş yapın.");
      return;
    }
    try {
      const data = {
        "name": "Yeni Liste " + Math.floor(Math.random() * 100),
        "userId": pb.authStore.model.id,
        "assets": ["BTCUSDT", "ETHUSDT"],
        "performance": 0,
        "isPublic": false
      };
      const record = await pb.collection('watchlists').create(data, { $autoCancel: false });
      setWatchlists([record, ...watchlists]);
      toast.success("Liste oluşturuldu.");
    } catch (err) {
      toast.error("Hata oluştu.");
    }
  };

  return (
    <>
      <Helmet>
        <title>İzleme Listelerim | PiyasaIQ</title>
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
                İzleme Listelerim
              </h1>
              <p className="text-muted-foreground">Favori varlıklarınızı ve portföylerinizi takip edin.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex p-1 rounded-lg bg-black/40 border border-white/5 mr-2 hidden sm:flex">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white/10 text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  <LayoutGrid size={16} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white/10 text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  <ListIcon size={16} />
                </button>
              </div>
              <Button onClick={handleCreateMock} className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus size={16} className="mr-2" /> Yeni Liste
              </Button>
            </div>
          </div>

          {!isAuthenticated ? (
            <div className="rounded-3xl border border-white/5 bg-card p-12 text-center max-w-2xl mx-auto mt-12">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <BookmarkPlus size={24} className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Giriş Yapmanız Gerekiyor</h3>
              <p className="text-muted-foreground mb-8">İzleme listesi oluşturmak ve yönetmek için lütfen hesabınıza giriş yapın.</p>
              <Button>Giriş Yap</Button>
            </div>
          ) : loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-48 rounded-2xl" />)}
            </div>
          ) : watchlists.length === 0 ? (
            <div className="rounded-3xl border border-white/5 bg-card p-12 text-center border-dashed">
              <h3 className="text-xl font-bold mb-2">Henüz listeniz yok</h3>
              <p className="text-muted-foreground mb-6">Piyasaları takip etmek için ilk izleme listenizi oluşturun.</p>
              <Button onClick={handleCreateMock} variant="outline" className="border-white/10">Liste Oluştur</Button>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
              {watchlists.map((list, i) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  key={list.id}
                  className="group rounded-2xl border border-white/5 bg-card p-6 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 text-muted-foreground hover:text-foreground"><MoreVertical size={16}/></button>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-1 truncate pr-8">{list.name}</h3>
                  <p className="text-sm text-muted-foreground mb-6">{list.assets?.length || 0} varlık</p>
                  
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Toplam Performans</p>
                      <div className="flex items-center gap-1.5">
                        {list.performance >= 0 ? (
                          <TrendingUp size={16} className="text-success" />
                        ) : (
                          <TrendingDown size={16} className="text-danger" />
                        )}
                        <span className={`font-semibold ${list.performance >= 0 ? 'text-success' : 'text-danger'}`}>
                          {list.performance > 0 ? '+' : ''}{list.performance || 0}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex -space-x-2">
                      {(list.assets || []).slice(0,3).map((asset, idx) => (
                        <div key={idx} className="w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-[10px] font-bold text-foreground z-10" style={{ zIndex: 10 - idx }}>
                          {asset.substring(0,3)}
                        </div>
                      ))}
                      {(list.assets?.length || 0) > 3 && (
                        <div className="w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-[10px] font-bold text-muted-foreground z-0">
                          +{(list.assets.length - 3)}
                        </div>
                      )}
                    </div>
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

export default WatchlistPage;