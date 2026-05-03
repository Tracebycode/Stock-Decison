const PortfolioCard = () => {
  const dummyHistory = [
    { id: 1, type: 'BUY', symbol: 'AAPL', amount: 10, price: 145.20, date: '2026-05-01' },
    { id: 2, type: 'SELL', symbol: 'TSLA', amount: 2, price: 905.10, date: '2026-04-28' },
    { id: 3, type: 'BUY', symbol: 'NVDA', amount: 5, price: 820.50, date: '2026-04-25' },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col gap-5">
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-3">Paper Trading Portfolio</h2>
        <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
          <p className="text-xs text-slate-500 mb-1 font-medium">Total Balance</p>
          <p className="text-2xl font-bold text-slate-900">$100,000.00</p>
          <p className="text-xs text-green-600 mt-1 flex items-center gap-1 font-medium">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            +$2,450.00 (2.45%) All Time
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-2">Current Holdings</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-lg border border-slate-200">
            <div>
              <p className="font-bold text-slate-900 text-sm">AAPL</p>
              <p className="text-xs text-slate-500">10 shares</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-slate-900 text-sm">$1,500.00</p>
              <p className="text-xs font-medium text-green-600">+2.5%</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-lg border border-slate-200">
            <div>
              <p className="font-bold text-slate-900 text-sm">TSLA</p>
              <p className="text-xs text-slate-500">5 shares</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-slate-900 text-sm">$950.00</p>
              <p className="text-xs font-medium text-red-600">-1.2%</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-2">Recent Trade History</h3>
        <div className="space-y-2">
          {dummyHistory.map((trade) => (
            <div key={trade.id} className="flex justify-between items-center p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-sm">
              <div className="flex items-center gap-2.5">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider ${
                  trade.type === 'BUY' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {trade.type}
                </span>
                <span className="font-bold text-slate-900 text-xs">{trade.symbol}</span>
              </div>
              <div className="text-right">
                <p className="text-slate-700 text-xs font-medium">{trade.amount} @ ${trade.price.toFixed(2)}</p>
                <p className="text-[10px] text-slate-500">{trade.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
