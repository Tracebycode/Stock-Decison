import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const ChartSection = ({ history }) => {
  if (!history || history.length === 0) return null;

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-sm h-[350px] flex flex-col">
      <h2 className="text-lg font-bold text-white mb-3">Live Price Chart</h2>
      <div className="flex-1 w-full bg-slate-900 rounded-lg p-2 border border-slate-700">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', borderRadius: '0.5rem', color: '#f8fafc', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ color: '#f8fafc' }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px', color: '#f8fafc' }} />
            <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 6 }} name="Price" />
            <Line type="monotone" dataKey="ma" stroke="#f59e0b" strokeWidth={2} dot={false} strokeDasharray="5 5" name="Moving Avg" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartSection;
