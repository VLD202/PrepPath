import Layout from "../components/Layout";

const Dashboard = () => {
  const cgpa = 7.8;
  const dsa = 180;
  const skills = 5;
  const readinessScore = cgpa * 5 + dsa * 0.2 + skills * 5;
  const status = readinessScore < 40 ? "Low" : readinessScore < 70 ? "Medium" : "High";

  const statusConfig = {
    Low: { bg: "from-red-600 to-red-800", text: "text-red-400", icon: "⚠️" },
    Medium: { bg: "from-yellow-600 to-yellow-800", text: "text-yellow-400", icon: "📈" },
    High: { bg: "from-green-600 to-green-800", text: "text-green-400", icon: "🎯" }
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          Dashboard
        </h1>
        <p className="text-gray-400">Welcome back! Here's your progress overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard 
          label="CGPA" 
          value={cgpa} 
          suffix="/10" 
          gradient="from-purple-600 to-purple-800"
          icon="📚"
        />
        
        <StatCard 
          label="DSA Solved" 
          value={dsa} 
          gradient="from-blue-600 to-blue-800"
          icon="💻"
        />
        
        <StatCard 
          label="Skills" 
          value={skills} 
          gradient="from-pink-600 to-pink-800"
          icon="⚡"
        />
        
        <div className="group relative">
          <div className={`absolute inset-0 bg-gradient-to-br ${statusConfig[status].bg} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity`} />
          <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transform group-hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Readiness</p>
              <span className="text-2xl">{statusConfig[status].icon}</span>
            </div>
            <h2 className={`text-3xl font-black ${statusConfig[status].text}`}>{status}</h2>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 group relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-10 group-hover:opacity-20 transition-opacity" />
          
          <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-black text-white mb-6">Overall Score</h2>
            
            <div className="flex items-baseline space-x-2 mb-4">
              <span className="text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {Math.round(readinessScore)}
              </span>
              <span className="text-3xl text-gray-500 font-black">/100</span>
            </div>
            
            <div className="h-4 bg-white/10 rounded-full overflow-hidden mb-6">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 shadow-lg shadow-purple-500/50" 
                style={{ width: `${readinessScore}%` }} 
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <ProgressMetric 
                label="Academic" 
                value={Math.round(cgpa * 5)} 
                max={50} 
                color="purple"
              />
              <ProgressMetric 
                label="DSA" 
                value={Math.round(dsa * 0.2)} 
                max={36} 
                color="blue"
              />
              <ProgressMetric 
                label="Skills" 
                value={skills * 5} 
                max={25} 
                color="pink"
              />
            </div>
          </div>
        </div>

        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-10 group-hover:opacity-20 transition-opacity" />
          
          <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6">
            <h3 className="text-xl font-black text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { text: "Completed DSA Module", time: "2h ago", icon: "✅" },
                { text: "Solved 5 LeetCode problems", time: "5h ago", icon: "💻" },
                { text: "Updated profile", time: "Yesterday", icon: "📝" }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="flex items-start space-x-3 p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 group/item cursor-pointer"
                >
                  <span className="text-xl transform group-hover/item:scale-125 transition-transform">{item.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-200">{item.text}</p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

function StatCard({ label, value, suffix = "", gradient, icon }) {
  return (
    <div className="group relative">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity`} />
      
      <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transform group-hover:scale-105 transition-all duration-300">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</p>
          <span className="text-2xl">{icon}</span>
        </div>
        <h2 className="text-4xl font-black text-white">
          {value}
          <span className="text-lg text-gray-500">{suffix}</span>
        </h2>
      </div>
    </div>
  );
}

function ProgressMetric({ label, value, max, color }) {
  const colors = {
    purple: "bg-purple-500",
    blue: "bg-blue-500",
    pink: "bg-pink-500"
  };

  return (
    <div>
      <div className="flex justify-between text-xs mb-2">
        <span className="text-gray-400 font-semibold">{label}</span>
        <span className="text-white font-bold">{value}/{max}</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div 
          className={`h-full ${colors[color]} rounded-full transition-all duration-1000`}
          style={{ width: `${(value / max) * 100}%` }} 
        />
      </div>
    </div>
  );
}

export default Dashboard;