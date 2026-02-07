import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function ReadinessChart({ data }) {
  const pieData = [
    { name: "Ready", value: data.readinessScore },
    { name: "Remaining", value: 100 - data.readinessScore }
  ];

  const barData = [
    { name: "CGPA", value: Math.round(data.breakdown.cgpa), color: "#06b6d4" },
    { name: "DSA", value: Math.round(data.breakdown.dsa), color: "#8b5cf6" },
    { name: "Roadmap", value: Math.round(data.breakdown.roadmap), color: "#10b981" }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 shadow-xl">
          <p className="text-white font-bold">{payload[0].name}</p>
          <p className="text-cyan-400 text-sm">{payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 rounded-3xl opacity-20 blur-2xl" />
      
      <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <span className="text-2xl">📊</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Readiness Breakdown</h2>
            <p className="text-sm text-slate-400">Score: <span className="text-cyan-400 font-bold">{data.readinessScore}%</span></p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Overall Progress</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  innerRadius={60}
                  outerRadius={90}
                  startAngle={90}
                  endAngle={450}
                >
                  <Cell fill="#06b6d4" />
                  <Cell fill="#1e293b" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="text-center mt-4">
              <p className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {data.readinessScore}%
              </p>
              <p className="text-sm text-slate-400">Ready for Placement</p>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Category Scores</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <XAxis 
                  dataKey="name" 
                  stroke="#64748b"
                  style={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <YAxis 
                  stroke="#64748b"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }} />
                <Bar 
                  dataKey="value" 
                  radius={[8, 8, 0, 0]}
                >
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          {barData.map((item) => (
            <div key={item.name} className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${item.color}20` }}>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">{item.name}</p>
                  <p className="text-lg font-black text-white">{item.value}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}