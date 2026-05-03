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

const dummyData = [
  { time: '10:00', price: 102, ma: 104 },
  { time: '11:00', price: 105, ma: 104 },
  { time: '12:00', price: 108, ma: 104.5 },
  { time: '13:00', price: 107, ma: 105 },
  { time: '14:00', price: 110, ma: 105.5 },
  { time: '15:00', price: 112, ma: 105 },
  { time: '16:00', price: 112, ma: 105 },
];

const ChartSection = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm h-[350px] flex flex-col">
      <h2 className="text-lg font-bold text-slate-900 mb-3">Price Chart (Dummy Data)</h2>
      <div className="flex-1 w-full bg-slate-50 rounded-lg p-2 border border-slate-200">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dummyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '0.5rem', color: '#0f172a', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }}
              itemStyle={{ color: '#0f172a' }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
            <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Price" />
            <Line type="monotone" dataKey="ma" stroke="#f59e0b" strokeWidth={2} dot={false} strokeDasharray="5 5" name="Moving Avg" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartSection;
