const ScoreVisualization = ({ score }) => {
  // Score range: -5 to +5
  const normalizedScore = Math.max(-5, Math.min(5, score));
  const percentage = ((normalizedScore + 5) / 10) * 100;
  
  let colorClass = 'bg-slate-400';
  if (normalizedScore > 0) colorClass = 'bg-green-500';
  if (normalizedScore < 0) colorClass = 'bg-red-500';

  return (
    <div className="mt-2 mb-1 w-full">
      <div className="flex justify-between text-xs font-medium text-slate-500 mb-1.5">
        <span>Strong Sell (-5)</span>
        <span>Neutral (0)</span>
        <span>Strong Buy (+5)</span>
      </div>
      <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden relative shadow-inner">
        {/* Center line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-400 z-10" />
        {/* Score fill */}
        <div 
          className={`absolute top-0 bottom-0 ${colorClass} transition-all duration-1000 ease-out`}
          style={{ 
            left: normalizedScore < 0 ? `${percentage}%` : '50%',
            right: normalizedScore > 0 ? `${100 - percentage}%` : '50%'
          }}
        />
      </div>
      <div className="text-center mt-1.5 font-bold text-sm">
        <span className={colorClass.replace('bg-', 'text-')}>Score: {score > 0 ? `+${score}` : score}</span>
      </div>
    </div>
  );
};

export default ScoreVisualization;
