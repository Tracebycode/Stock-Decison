const PortfolioCard = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-6">Paper Trading Portfolio</h2>
      
      <div className="mb-6">
        <p className="text-sm text-slate-400 mb-1">Total Balance</p>
        <p className="text-3xl font-bold text-white">$100,000.00</p>
        <p className="text-sm text-green-500 mt-1 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          +0.00% Today
        </p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-slate-400 mb-3">Current Holdings</h3>
        <div className="space-y-3">
          {/* Static holdings for now */}
          <div className="flex justify-between items-center p-3 bg-slate-950 rounded-lg border border-slate-800">
            <div>
              <p className="font-bold text-white">AAPL</p>
              <p className="text-xs text-slate-400">10 shares</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-white">$1,500.00</p>
              <p className="text-xs text-green-500">+2.5%</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-slate-950 rounded-lg border border-slate-800">
            <div>
              <p className="font-bold text-white">TSLA</p>
              <p className="text-xs text-slate-400">5 shares</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-white">$950.00</p>
              <p className="text-xs text-red-500">-1.2%</p>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-xs text-slate-500 italic">Mock data for preview</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
