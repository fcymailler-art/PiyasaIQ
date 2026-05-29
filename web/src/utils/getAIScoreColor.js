/**
 * Returns color class based on AI score
 * @param {number} score - AI score (0-100)
 * @returns {object} Object with bg, text, and border color classes
 */
export function getAIScoreColor(score) {
  if (score === null || score === undefined || isNaN(score)) {
    return {
      bg: 'bg-gray-500/20',
      text: 'text-gray-400',
      border: 'border-gray-500/30',
    };
  }

  const numScore = Number(score);

  if (numScore >= 67) {
    return {
      bg: 'bg-emerald-500/20',
      text: 'text-emerald-400',
      border: 'border-emerald-500/30',
    };
  } else if (numScore >= 34) {
    return {
      bg: 'bg-amber-500/20',
      text: 'text-amber-400',
      border: 'border-amber-500/30',
    };
  } else {
    return {
      bg: 'bg-red-500/20',
      text: 'text-red-400',
      border: 'border-red-500/30',
    };
  }
}