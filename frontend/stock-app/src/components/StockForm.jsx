import { useState } from 'react';

const StockForm = ({ onAnalyze, isLoading }) => {
  const [symbol, setSymbol] = useState('');
  const [risk, setRisk] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!symbol.trim()) return;
    onAnalyze({ symbol: symbol.toUpperCase(), risk });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-white">Analyze Stock</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="symbol" className="block text-sm font-medium text-slate-400 mb-1">
            Stock Symbol
          </label>
          <input
            id="symbol"
            type="text"
            placeholder="e.g. AAPL"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            required
          />
        </div>
        
        <div>
          <label htmlFor="risk" className="block text-sm font-medium text-slate-400 mb-1">
            Risk Level
          </label>
          <select
            id="risk"
            value={risk}
            onChange={(e) => setRisk(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            'Analyze'
          )}
        </button>
      </form>
    </div>
  );
};

export default StockForm;
