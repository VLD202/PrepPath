const StatCard = ({ title, value, icon, gradient = "from-cyan-600 to-blue-600", iconBg = "from-cyan-500 to-blue-500" }) => {
  return (
    <div className="group relative">
      {/* Animated glow */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`} />
      
      <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm transform group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-300 overflow-hidden">
        {/* Background decoration */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${iconBg} opacity-5 rounded-full blur-2xl`} />
        
        <div className="relative flex items-start justify-between mb-3">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{title}</p>
          {icon && (
            <div className={`w-10 h-10 bg-gradient-to-br ${iconBg} rounded-xl flex items-center justify-center text-xl shadow-lg transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
              {icon}
            </div>
          )}
        </div>
        <h2 className="relative text-4xl font-black text-white group-hover:scale-105 transition-transform">{value}</h2>
      </div>
    </div>
  );
};

export default StatCard;