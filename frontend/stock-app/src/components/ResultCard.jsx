import IndicatorBreakdown from './IndicatorBreakdown';
import ScoreVisualization from './ScoreVisualization';
import ExplanationPanel from './ExplanationPanel';

const ResultCard = ({ result, onBuy, onSell }) => {
  if (!result) return null;

  const { decision, score, confidence, price, ma, indicators, explanation } = result;

  const getDecisionColor = (decision) => {
    switch (decision) {
      case 'BUY':
        return 'text-green-300 bg-green-900 border-green-700';
      case 'SELL':
        return 'text-red-300 bg-red-900 border-red-700';
      default:
        return 'text-amber-300 bg-amber-900 border-amber-700';
    }
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-sm transform transition-all animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Side: Key Info */}
        <div className="flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-lg font-bold text-white">Analysis Result</h2>
              <p className="text-sm text-slate-400 mt-0.5">Confidence: <span className="font-semibold text-slate-300">{confidence}</span></p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-bold border ${getDecisionColor(decision)}`}>
              {decision}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-400 mb-1 font-medium">Current Price</p>
              <p className="text-xl font-bold text-white">${price}</p>
            </div>
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-400 mb-1 font-medium">Moving Avg</p>
              <p className="text-xl font-bold text-slate-300">${ma}</p>
            </div>
          </div>

          {score !== undefined && (
            <div className="mt-auto pb-2">
              <ScoreVisualization score={score} />
            </div>
          )}

          <div className="flex gap-3 mt-4">
            <button 
              onClick={onBuy}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors shadow-sm"
            >
              Simulate Buy
            </button>
            <button 
              onClick={onSell}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors shadow-sm"
            >
              Simulate Sell
            </button>
          </div>
        </div>

        {/* Right Side: Breakdown & Explanation */}
        <div className="flex flex-col gap-4">
          <IndicatorBreakdown indicators={indicators} />
          <ExplanationPanel explanation={explanation} score={score} decision={decision} />
        </div>

      </div>
    </div>
  );
};

export default ResultCard;
