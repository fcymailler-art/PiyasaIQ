/**
 * Formats percentage with proper sign and decimals
 * @param {number} value - The percentage value
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted percentage string
 */
export function formatPercentage(value, decimals = 2) {
  if (value === null || value === undefined || isNaN(value)) {
    return '-';
  }

  const numValue = Number(value);
  const sign = numValue > 0 ? '+' : '';
  
  return `${sign}${numValue.toFixed(decimals)}%`;
}