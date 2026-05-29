import React from 'react';
import { motion } from 'framer-motion';
import { getAIScoreColor } from '@/utils/getAIScoreColor';

const AIScoreBadge = ({ score, size = 'md', showLabel = true }) => {
  const colors = getAIScoreColor(score);
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`inline-flex items-center gap-2 rounded-xl border ${colors.bg} ${colors.text} ${colors.border} ${sizeClasses[size]} font-semibold`}
    >
      {showLabel && <span className="text-xs opacity-70">AI Score</span>}
      <span>{score !== null && score !== undefined ? Math.round(score) : '-'}</span>
    </motion.div>
  );
};

export default AIScoreBadge;