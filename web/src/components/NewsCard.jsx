import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import SentimentBadge from './SentimentBadge';

const NewsCard = ({ article, index = 0 }) => {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} dakika önce`;
    } else if (diffHours < 24) {
      return `${diffHours} saat önce`;
    } else if (diffDays < 7) {
      return `${diffDays} gün önce`;
    } else {
      return date.toLocaleDateString('tr-TR');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <a 
        href={article.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block group"
      >
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
          {article.image && (
            <div className="relative h-48 overflow-hidden">
              <img 
                src={article.image} 
                alt={article.headline}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
            </div>
          )}
          
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-secondary font-medium">{article.source}</span>
              <span className="text-xs text-secondary/50">•</span>
              <span className="text-xs text-secondary/70">{formatTimestamp(article.timestamp)}</span>
            </div>

            <h3 className="text-lg font-bold text-text mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-200">
              {article.headline}
            </h3>

            <div className="flex items-center justify-between">
              {article.aiSentiment && (
                <SentimentBadge sentiment={article.aiSentiment} size="sm" />
              )}
              <ExternalLink size={16} className="text-secondary/50 group-hover:text-primary transition-colors duration-200" />
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      </a>
    </motion.div>
  );
};

export default NewsCard;