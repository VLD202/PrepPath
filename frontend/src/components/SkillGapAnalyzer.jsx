export default function SkillGapAnalyzer({ completedSkills }) {
  const requiredSkills = [
    { name: "JavaScript", category: "Frontend", priority: "High" },
    { name: "Node.js", category: "Backend", priority: "High" },
    { name: "Express", category: "Backend", priority: "Medium" },
    { name: "MongoDB", category: "Database", priority: "Medium" },
    { name: "Authentication", category: "Security", priority: "High" },
    { name: "System Design", category: "Architecture", priority: "High" }
  ];

  const missingSkills = requiredSkills.filter(skill => !completedSkills.includes(skill.name));
  const completionPercentage = Math.round(((requiredSkills.length - missingSkills.length) / requiredSkills.length) * 100);

  const getCategoryColor = (category) => {
    const colors = {
      Frontend: "from-blue-500 to-cyan-500",
      Backend: "from-purple-500 to-pink-500",
      Database: "from-emerald-500 to-teal-500",
      Security: "from-rose-500 to-red-500",
      Architecture: "from-amber-500 to-orange-500"
    };
    return colors[category] || "from-slate-500 to-slate-600";
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-3xl opacity-20 blur-2xl group-hover:opacity-30 transition-opacity" />
      
      <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
        
        <div className="relative">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
              <span className="text-2xl">🧠</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Skill Gap Analysis</h3>
              <p className="text-sm text-slate-400">Track your learning progress</p>
            </div>
          </div>

          {/* Progress Circle */}
          <div className="relative w-48 h-48 mx-auto mb-8">
            <svg className="transform -rotate-90 w-48 h-48">
              <circle cx="96" cy="96" r="88" stroke="rgba(148,163,184,0.1)" strokeWidth="16" fill="transparent" />
              <circle 
                cx="96" 
                cy="96" 
                r="88" 
                stroke="url(#skill-gradient)" 
                strokeWidth="16" 
                fill="transparent" 
                strokeDasharray={`${2 * Math.PI * 88}`} 
                strokeDashoffset={`${2 * Math.PI * 88 * (1 - completionPercentage / 100)}`} 
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="skill-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-black bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {completionPercentage}%
              </span>
              <span className="text-sm text-slate-400 mt-1">Complete</span>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="space-y-3 mb-8">
            {requiredSkills.map((skill) => {
              const isCompleted = completedSkills.includes(skill.name);
              return (
                <div 
                  key={skill.name}
                  className={`group/skill relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-emerald-500/5 border-emerald-500/30 hover:bg-emerald-500/10' 
                      : 'bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50'
                  }`}
                >
                  {isCompleted && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5" />
                  )}
                  
                  <div className="relative flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all ${
                        isCompleted 
                          ? 'bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30' 
                          : 'bg-slate-800 border border-slate-700'
                      }`}>
                        {isCompleted ? '✓' : '○'}
                      </div>
                      <div>
                        <h4 className={`font-bold transition-colors ${isCompleted ? 'text-white' : 'text-slate-300'}`}>
                          {skill.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            skill.priority === 'High' 
                              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}>
                            {skill.priority}
                          </span>
                          <span className="text-xs text-slate-500">•</span>
                          <span className="text-xs text-slate-500">{skill.category}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      isCompleted 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      {isCompleted ? 'Completed' : 'Pending'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary Card */}
          <div className={`relative overflow-hidden rounded-2xl p-6 border ${
            missingSkills.length === 0 
              ? 'bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/30' 
              : 'bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/30'
          }`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-400 mb-1">Skills Remaining</p>
                <p className={`text-4xl font-black ${
                  missingSkills.length === 0 ? 'text-emerald-400' : 'text-amber-400'
                }`}>
                  {missingSkills.length}
                </p>
                <p className="text-sm text-slate-400 mt-2">
                  {missingSkills.length === 0 
                    ? '🎉 All skills mastered!' 
                    : `Focus on ${missingSkills.length} skill${missingSkills.length > 1 ? 's' : ''} to complete`
                  }
                </p>
              </div>
              <div className="text-6xl">
                {missingSkills.length === 0 ? '🎯' : '📚'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}