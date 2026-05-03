import IndicatorBreakdown from './IndicatorBreakdown';
import ScoreVisualization from './ScoreVisualization';
import ExplanationPanel from './ExplanationPanel';

const ResultCard = ({ result }) => {
  if (!result) return null;

  const { decision, score, confidence, price, ma, indicators, explanation } = result;

  const getDecisionColor = (decision) => {
    switch (decision) {
      case 'BUY':
        return 'text-green-700 bg-green-100 border-green-200';
      case 'SELL':
        return 'text-red-700 bg-red-100 border-red-200';
      default:
        return 'text-amber-700 bg-amber-100 border-amber-200';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm transform transition-all animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Side: Key Info */}
        <div className="flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Analysis Result</h2>
              <p className="text-sm text-slate-500 mt-0.5">Confidence: <span className="font-semibold text-slate-700">{confidence}</span></p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-bold border ${getDecisionColor(decision)}`}>
              {decision}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <p className="text-xs text-slate-500 mb-1 font-medium">Current Price</p>
              <p className="text-xl font-bold text-slate-900">${price}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <p className="text-xs text-slate-500 mb-1 font-medium">Moving Avg</p>
              <p className="text-xl font-bold text-slate-700">${ma}</p>
            </div>
          </div>

          {score !== undefined && (
            <div className="mt-auto pb-2">
              <ScoreVisualization score={score} />
            </div>
          )}
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
