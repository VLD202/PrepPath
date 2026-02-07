import Layout from "../components/Layout";

const Readiness = () => {
  const score = 68;
  const color = score < 40 ? "red" : score < 70 ? "yellow" : "green";
  const gradient = color === "red" 
    ? "from-red-600 to-red-800" 
    : color === "yellow" 
    ? "from-yellow-600 to-yellow-800" 
    : "from-green-600 to-green-800";
  
  const barColor = color === "red" ? "bg-red-500" : color === "yellow" ? "bg-yellow-500" : "bg-green-500";
  const textColor = color === "red" ? "text-red-400" : color === "yellow" ? "text-yellow-400" : "text-green-400";

  const recommendations = [
    { icon: "💻", title: "Increase DSA to 300+", priority: "High", impact: "+15 pts" },
    { icon: "🚀", title: "Add 1-2 projects", priority: "High", impact: "+12 pts" },
    { icon: "📚", title: "Complete System Design", priority: "Medium", impact: "+8 pts" }
  ];

  const roles = [
    { role: "Frontend Developer", match: 85, companies: 45 },
    { role: "Full Stack Developer", match: 72, companies: 38 },
    { role: "Backend Developer", match: 68, companies: 42 }
  ];

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          Job Readiness
        </h1>
        <p className="text-gray-400">Your path to placement success</p>
      </div>

      <div className="mb-8 group relative">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity`} />
        
        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
          <div className="text-center mb-6">
            <p className="text-sm font-semibold text-gray-400 uppercase mb-2">Overall Readiness Score</p>
            <div className={`text-7xl font-black ${textColor} mb-2`}>{score}</div>
            <p className="text-gray-400">Out of 100</p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="h-4 bg-white/10 rounded-full overflow-hidden">
              <div 
                className={`h-full ${barColor} rounded-full shadow-lg transition-all duration-1000`}
                style={{ width: `${score}%` }} 
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-10 group-hover:opacity-20 transition-opacity" />
          
          <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-black text-white mb-6">Recommendations</h2>
            <div className="space-y-4">
              {recommendations.map((rec, i) => (
                <div 
                  key={i} 
                  className="group/rec bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl transform group-hover/rec:scale-125 transition-transform">{rec.icon}</span>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        rec.priority === 'High' 
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                          : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      }`}>
                        {rec.priority}
                      </span>
                      <p className="text-xs text-gray-400 mt-1">{rec.impact}</p>
                    </div>
                  </div>
                  <h4 className="font-bold text-white">{rec.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-10 group-hover:opacity-20 transition-opacity" />
          
          <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-black text-white mb-6">Role Match</h2>
            <div className="space-y-4">
              {roles.map((role, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-pointer group/role">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-white">{role.role}</h4>
                      <p className="text-sm text-gray-400">{role.companies} companies hiring</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {role.match}%
                      </div>
                      <div className="text-xs text-gray-400">Match</div>
                    </div>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000" 
                      style={{ width: `${role.match}%` }} 
                    />
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

export default Readiness;