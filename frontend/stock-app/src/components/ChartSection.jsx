const ChartSection = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg h-[400px] flex flex-col">
      <h2 className="text-xl font-bold text-white mb-4">Price Chart</h2>
      <div className="flex-1 border-2 border-dashed border-slate-700 rounded-lg flex items-center justify-center bg-slate-950/50">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-slate-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
          <p className="text-slate-400 font-medium">Chart visualization placeholder</p>
          <p className="text-sm text-slate-500 mt-1">Interactive chart will be integrated here</p>
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
