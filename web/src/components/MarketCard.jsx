import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { formatPrice } from '@/utils/formatPrice';
import { formatPercentage } from '@/utils/formatPercentage';
import AIScoreBadge from './AIScoreBadge';

const MarketCard = ({ market, index = 0 }) => {
  const isPositive = market.priceChangePercent > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link to={`/piyasalar/${market.symbol}`}>
        <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-text mb-1">{market.symbol}</h3>
              <p className="text-2xl font-bold text-text">{formatPrice(market.price)}</p>
            </div>
            <AIScoreBadge score={market.aiScore} size="sm" showLabel={false} />
          </div>

          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-secondary">24h Değişim</span>
            <span className={`text-sm font-semibold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
              {formatPercentage(market.priceChangePercent)}
            </span>
          </div>

          {market.aiSummary && (
            <p className="text-sm text-secondary line-clamp-2 mb-3">{market.aiSummary}</p>
          )}

          <div className="flex items-center justify-between text-xs text-secondary/70">
            <span>Hacim</span>
            <span>{formatPrice(market.volume, 'USD')}</span>
          </div>

          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      </Link>
    </motion.div>
  );
};

export default MarketCard;