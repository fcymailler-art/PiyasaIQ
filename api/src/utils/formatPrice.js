/**
 * Formats price with proper decimals and currency symbols
 * @param {number} price - The price to format
 * @param {string} currency - Currency code (USD, TRY, etc.)
 * @returns {string} Formatted price string
 */
export function formatPrice(price, currency = 'USD') {
  if (price === null || price === undefined || isNaN(price)) {
    return '-';
  }

  const numPrice = Number(price);

  // Determine decimal places based on price magnitude
  let decimals = 2;
  if (numPrice < 0.01) {
    decimals = 6;
  } else if (numPrice < 1) {
    decimals = 4;
  } else if (numPrice >= 1000) {
    decimals = 0;
  }

  const formatted = new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(numPrice);

  const symbols = {
    USD: '$',
    TRY: '₺',
    EUR: '€',
    BTC: '₿',
  };

  const symbol = symbols[currency] || currency;

  return `${symbol}${formatted}`;
}