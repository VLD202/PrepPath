const ProgressBar = ({ value, label, showPercentage = true, color = "cyan" }) => {
  const gradients = {
    cyan: "from-cyan-500 to-blue-500",
    green: "from-emerald-500 to-teal-500",
    blue: "from-blue-500 to-indigo-500",
    orange: "from-amber-500 to-orange-500",
    red: "from-rose-500 to-red-500",
    purple: "from-purple-500 to-pink-500"
  };

  const glows = {
    cyan: "shadow-cyan-500/50",
    green: "shadow-emerald-500/50",
    blue: "shadow-blue-500/50",
    orange: "shadow-amber-500/50",
    red: "shadow-rose-500/50",
    purple: "shadow-purple-500/50"
  };

  const gradient = gradients[color] || gradients.cyan;
  const glow = glows[color] || glows.cyan;

  return (
    <div className="w-full">
      {label && (
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-sm font-semibold text-slate-300 flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${gradient}`} />
            {label}
          </span>
          {showPercentage && (
            <span className={`text-sm font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
              {value}%
            </span>
          )}
        </div>
      )}
      <div className="relative h-3 bg-slate-800/50 rounded-full overflow-hidden border border-slate-700/50">
        <div 
          className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-1000 ease-out shadow-lg ${glow} relative`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;