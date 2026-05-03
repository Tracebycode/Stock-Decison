const ResultCard = ({ result }) => {
  if (!result) return null;

  const { decision, explanation, price, ma } = result;

  const getDecisionColor = (decision) => {
    switch (decision) {
      case 'BUY':
        return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'SELL':
        return 'text-red-400 bg-red-500/10 border-red-500/20';
      default:
        return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg transform transition-all animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Analysis Result</h2>
        <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${getDecisionColor(decision)}`}>
          {decision}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
          <p className="text-sm text-slate-400 mb-1">Current Price</p>
          <p className="text-2xl font-bold text-white">${price}</p>
        </div>
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
          <p className="text-sm text-slate-400 mb-1">Moving Avg</p>
          <p className="text-2xl font-bold text-slate-200">${ma}</p>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-slate-400 mb-2">Explanation</h3>
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
          <p className="text-slate-300 leading-relaxed text-sm">
            {explanation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
