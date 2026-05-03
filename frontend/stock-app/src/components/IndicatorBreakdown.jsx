const IndicatorBreakdown = ({ indicators }) => {
  if (!indicators) return null;

  const getScoreColor = (score) => {
    const num = parseInt(score);
    if (num > 0) return 'text-green-600';
    if (num < 0) return 'text-red-600';
    return 'text-slate-500';
  };

  const getIndicatorLabel = (key) => {
    const labels = {
      ma_signal: "Moving Average Signal",
      rsi_signal: "RSI Signal",
      trend_signal: "Price Trend"
    };
    return labels[key] || key;
  };

  const getIndicatorDescription = (key, score) => {
    const num = parseInt(score);
    if (key === 'ma_signal') return num > 0 ? 'Price > MA (Bullish)' : num < 0 ? 'Price < MA (Bearish)' : 'Neutral';
    if (key === 'rsi_signal') return num > 0 ? 'Oversold' : num < 0 ? 'Overbought' : 'Neutral';
    if (key === 'trend_signal') return num > 0 ? 'Uptrend' : num < 0 ? 'Downtrend' : 'Sideways';
    return '';
  };

  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-700 mb-2">Indicator Breakdown</h3>
      <div className="space-y-2">
        {Object.entries(indicators).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center p-2.5 bg-slate-50 rounded-lg border border-slate-200">
            <div>
              <p className="font-medium text-slate-900 text-sm">{getIndicatorLabel(key)}</p>
              <p className="text-xs text-slate-500">{getIndicatorDescription(key, value)}</p>
            </div>
            <div className={`font-bold text-base ${getScoreColor(value)}`}>
              {parseInt(value) > 0 ? `+${value.replace('+', '')}` : value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndicatorBreakdown;
