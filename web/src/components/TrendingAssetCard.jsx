import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatPrice } from '@/utils/formatPrice';
import { formatPercentage } from '@/utils/formatPercentage';

const TrendingAssetCard = ({ asset, index = 0 }) => {
  const isPositive = asset.priceChangePercent > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="flex-shrink-0 w-64"
    >
      <Link to={`/piyasalar/${asset.symbol}`}>
        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-base font-bold text-text">{asset.symbol}</h4>
            {isPositive ? (
              <TrendingUp size={18} className="text-emerald-400" />
            ) : (
              <TrendingDown size={18} className="text-red-400" />
            )}
          </div>

          <p className="text-xl font-bold text-text mb-2">{formatPrice(asset.price)}</p>

          <div className="flex items-center justify-between">
            <span className="text-xs text-secondary">24h</span>
            <span className={`text-sm font-semibold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
              {formatPercentage(asset.priceChangePercent)}
            </span>
          </div>

          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      </Link>
    </motion.div>
  );
};

export default TrendingAssetCard;