const PortfolioCard = ({ portfolio }) => {
  if (!portfolio) return null;
  const { balance, holdings, trades } = portfolio;

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-sm flex flex-col gap-5">
      <div>
        <h2 className="text-lg font-bold text-white mb-3">Paper Trading Portfolio</h2>
        <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-700">
          <p className="text-xs text-slate-400 mb-1 font-medium">Total Balance</p>
          <p className="text-2xl font-bold text-white">${balance.toFixed(2)}</p>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-2">Current Holdings</h3>
        <div className="space-y-2">
          {holdings.length === 0 ? (
            <p className="text-sm text-slate-500">No holdings yet.</p>
          ) : (
            holdings.map((h, i) => {
              const currentValue = h.qty * h.buyPrice; // Using buyPrice as current value proxy for now
              return (
                <div key={i} className="flex justify-between items-center p-2.5 bg-slate-900 rounded-lg border border-slate-700">
                  <div>
                    <p className="font-bold text-white text-sm">{h.symbol}</p>
                    <p className="text-xs text-slate-400">{h.qty} shares</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white text-sm">${currentValue.toFixed(2)}</p>
                    <p className="text-xs font-medium text-slate-400">Avg: ${h.buyPrice.toFixed(2)}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-2">Recent Trade History</h3>
        <div className="space-y-2">
          {trades.length === 0 ? (
            <p className="text-sm text-slate-500">No trades yet.</p>
          ) : (
            [...trades].reverse().map((trade, i) => (
              <div key={i} className="flex justify-between items-center p-2.5 bg-slate-900 rounded-lg border border-slate-700 text-sm">
                <div className="flex items-center gap-2.5">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider ${
                    trade.type === 'BUY' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                  }`}>
                    {trade.type}
                  </span>
                  <span className="font-bold text-white text-xs">{trade.symbol}</span>
                </div>
                <div className="text-right">
                  <p className="text-slate-300 text-xs font-medium">{trade.qty} @ ${trade.price.toFixed(2)}</p>
                  <p className="text-[10px] text-slate-500">{trade.timestamp ? new Date(trade.timestamp).toLocaleTimeString() : ''}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
