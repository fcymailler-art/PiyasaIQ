import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const SentimentBadge = ({ sentiment, percentage, size = 'md' }) => {
  const getSentimentConfig = () => {
    const lower = sentiment?.toLowerCase() || '';
    
    if (lower.includes('bullish') || lower.includes('yükseliş')) {
      return {
        icon: TrendingUp,
        label: 'Yükseliş',
        bg: 'bg-emerald-500/20',
        text: 'text-emerald-400',
        border: 'border-emerald-500/30',
      };
    } else if (lower.includes('bearish') || lower.includes('düşüş')) {
      return {
        icon: TrendingDown,
        label: 'Düşüş',
        bg: 'bg-red-500/20',
        text: 'text-red-400',
        border: 'border-red-500/30',
      };
    } else {
      return {
        icon: Minus,
        label: 'Nötr',
        bg: 'bg-gray-500/20',
        text: 'text-gray-400',
        border: 'border-gray-500/30',
      };
    }
  };

  const config = getSentimentConfig();
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`inline-flex items-center gap-2 rounded-xl border ${config.bg} ${config.text} ${config.border} ${sizeClasses[size]} font-semibold`}
    >
      <Icon size={iconSizes[size]} />
      <span>{config.label}</span>
      {percentage && <span className="opacity-70">{percentage}%</span>}
    </motion.div>
  );
};

export default SentimentBadge;