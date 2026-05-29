import { useEffect, useRef } from 'react';

export default function TradingViewMarketOverview() {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && ref.current.children.length === 0) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
      script.async = true;
      script.innerHTML = JSON.stringify({
        colorTheme: 'dark',
        dateRange: '12M',
        showChart: true,
        locale: 'tr',
        largeChartUrl: '',
        isTransparent: true,
        showSymbolLogo: true,
        showFloatingTooltip: false,
        width: '100%',
        height: '660',
        tabs: [
          {
            title: 'Endeksler',
            symbols: [
              { s: 'FOREXCOM:SPXUSD', d: 'S&P 500' },
              { s: 'FOREXCOM:NSXUSD', d: 'Nasdaq 100' },
              { s: 'BIST:XU100', d: 'BIST 100' },
              { s: 'FOREXCOM:DJI', d: 'Dow Jones' },
            ],
          },
          {
            title: 'Döviz',
            symbols: [
              { s: 'FX_IDC:USDTRY', d: 'USD/TRY' },
              { s: 'FX_IDC:EURUSD', d: 'EUR/USD' },
              { s: 'FX_IDC:EURTRY', d: 'EUR/TRY' },
            ],
          },
          {
            title: 'Kripto',
            symbols: [
              { s: 'BITSTAMP:BTCUSD', d: 'Bitcoin' },
              { s: 'BITSTAMP:ETHUSD', d: 'Ethereum' },
            ],
          },
        ],
      });
      ref.current.appendChild(script);
    }
  }, []);

  return (
    <div className="tradingview-widget-container" ref={ref}>
      <div className="tradingview-widget-container__widget" />
    </div>
  );
}
