import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, AlertCircle } from 'lucide-react';

const RiskBadge = ({ level, size = 'md' }) => {
  const getRiskConfig = () => {
    const lower = level?.toLowerCase() || '';
    
    if (lower.includes('low') || lower.includes('düşük')) {
      return {
        icon: Shield,
        label: 'Düşük Risk',
        bg: 'bg-emerald-500/20',
        text: 'text-emerald-400',
        border: 'border-emerald-500/30',
      };
    } else if (lower.includes('high') || lower.includes('yüksek')) {
      return {
        icon: AlertTriangle,
        label: 'Yüksek Risk',
        bg: 'bg-red-500/20',
        text: 'text-red-400',
        border: 'border-red-500/30',
      };
    } else {
      return {
        icon: AlertCircle,
        label: 'Orta Risk',
        bg: 'bg-amber-500/20',
        text: 'text-amber-400',
        border: 'border-amber-500/30',
      };
    }
  };

  const config = getRiskConfig();
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
    </motion.div>
  );
};

export default RiskBadge;