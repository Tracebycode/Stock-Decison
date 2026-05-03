import { useState } from 'react';
import StockForm from '../components/StockForm';
import ResultCard from '../components/ResultCard';
import ChartSection from '../components/ChartSection';
import PortfolioCard from '../components/PortfolioCard';
import { analyzeStock } from '../services/api';

const Dashboard = () => {
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [portfolio, setPortfolio] = useState({
    balance: 100000,
    holdings: [],
    trades: []
  });

  const handleAnalyze = async (data) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setHistory([]);
    
    try {
      const response = await analyzeStock(data);
      // Ensure symbol is available for portfolio actions
      const finalResult = { ...response, symbol: data.symbol.toUpperCase() };
      setResult(finalResult);
      
      // Build a simulated history if none is provided, to make the chart dynamic and realistic
      if (response.history) {
        setHistory(response.history);
      } else {
        const mockHistory = Array.from({ length: 7 }).map((_, i) => {
          const time = new Date();
          time.setHours(time.getHours() - (6 - i));
          return {
            time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            price: response.price * (1 - ((6 - i) * 0.005) + (Math.random() * 0.01 - 0.005)),
            ma: response.ma * (1 - ((6 - i) * 0.002))
          };
        });
        setHistory(mockHistory);
      }
    } catch (err) {
      setError('Failed to analyze stock. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const buyStock = (symbol, price) => {
    const qty = 5;
    if (portfolio.balance < price * qty) {
      alert("Insufficient balance to buy");
      return;
    }

    setPortfolio(prev => ({
      balance: prev.balance - price * qty,
      holdings: [...prev.holdings, { symbol, qty, buyPrice: price }],
      trades: [...prev.trades, { type: "BUY", symbol, qty, price, timestamp: new Date().toISOString() }]
    }));
  };

  const sellStock = (symbol, price) => {
    const qty = 5;
    setPortfolio(prev => {
      let remainingQty = qty;
      const newHoldings = [];
      let hasSold = false;

      for (let h of prev.holdings) {
        if (h.symbol === symbol && remainingQty > 0) {
          if (h.qty > remainingQty) {
            newHoldings.push({ ...h, qty: h.qty - remainingQty });
            remainingQty = 0;
          } else {
            remainingQty -= h.qty;
          }
          hasSold = true;
        } else {
          newHoldings.push(h);
        }
      }

      if (!hasSold) {
        alert("Insufficient holdings to sell");
        return prev;
      }

      return {
        balance: prev.balance + price * qty,
        holdings: newHoldings,
        trades: [...prev.trades, { type: "SELL", symbol, qty, price, timestamp: new Date().toISOString() }]
      };
    });
  };

  return (
    <div className="w-full min-h-screen bg-slate-900 text-slate-50 p-4 md:p-6 font-sans">
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* Header */}
        <header className="border-b border-slate-800 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white mb-1">
              Explainable Stock Decision
            </h1>
            <p className="text-slate-400 text-sm">
              Rule-based insights & paper trading platform
            </p>
          </div>
          {result && result.timestamp && (
            <p className="text-sm font-medium text-slate-300 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-md shadow-sm">
              Last updated: {result.timestamp}
            </p>
          )}
        </header>

        {error && (
          <div className="bg-red-900/50 border border-red-800 text-red-200 p-4 rounded-lg flex items-center gap-3 shadow-sm">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Input & Portfolio */}
          <div className="lg:col-span-3 space-y-6 flex flex-col">
            <StockForm onAnalyze={handleAnalyze} isLoading={loading} />
            <PortfolioCard portfolio={portfolio} />
          </div>

          {/* Right Column - Results & Chart */}
          <div className="lg:col-span-9 space-y-6 flex flex-col">
            {loading ? (
               <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center text-slate-400 min-h-[250px] shadow-sm">
                  <svg className="animate-spin h-8 w-8 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="font-medium">Analyzing market data...</p>
               </div>
            ) : result ? (
              <ResultCard 
                result={result} 
                onBuy={() => buyStock(result.symbol, result.price)} 
                onSell={() => sellStock(result.symbol, result.price)} 
              />
            ) : (
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center text-slate-400 min-h-[250px] text-center border-dashed shadow-sm">
                <svg className="w-12 h-12 mb-3 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p className="text-base font-semibold text-slate-300">No analysis yet</p>
                <p className="text-sm mt-1 text-slate-500">Enter a stock symbol and select your risk level to begin</p>
              </div>
            )}
            
            {history.length > 0 && <ChartSection history={history} movingAvg={[]} />}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
