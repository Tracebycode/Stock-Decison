const ExplanationPanel = ({ explanation, score, decision }) => {
  if (!explanation || !Array.isArray(explanation)) return null;

  const getDecisionColor = (decision) => {
    switch (decision) {
      case 'BUY':
        return 'text-green-600';
      case 'SELL':
        return 'text-red-600';
      default:
        return 'text-amber-600';
    }
  };

  return (
    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
      <h3 className="text-sm font-semibold text-slate-700 mb-2">Structured Explanation</h3>
      <div className="space-y-2">
        <p className="font-medium text-slate-900 pb-1 border-b border-slate-200 text-sm">
          Final Score = <span className={score > 0 ? 'text-green-600' : score < 0 ? 'text-red-600' : 'text-slate-500'}>{score > 0 ? `+${score}` : score}</span>
        </p>
        <div className="py-1">
          <p className="text-xs font-medium text-slate-600 mb-1">Signals:</p>
          <ul className="list-disc pl-4 space-y-0.5 text-xs text-slate-600">
            {explanation.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        <p className="font-bold pt-1.5 border-t border-slate-200 text-sm text-slate-900">
          Decision: <span className={getDecisionColor(decision)}>{decision}</span>
        </p>
      </div>
    </div>
  );
};

export default ExplanationPanel;
