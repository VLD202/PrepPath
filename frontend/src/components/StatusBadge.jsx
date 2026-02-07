const StatusBadge = ({ status }) => {
  const getConfig = () => {
    const lower = status.toLowerCase();
    if (lower.includes("ready") || lower.includes("eligible") || lower.includes("high")) {
      return {
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/30",
        text: "text-emerald-400",
        dot: "bg-emerald-400"
      };
    } else if (lower.includes("almost") || lower.includes("medium")) {
      return {
        bg: "bg-amber-500/10",
        border: "border-amber-500/30",
        text: "text-amber-400",
        dot: "bg-amber-400"
      };
    } else {
      return {
        bg: "bg-rose-500/10",
        border: "border-rose-500/30",
        text: "text-rose-400",
        dot: "bg-rose-400"
      };
    }
  };

  const config = getConfig();

  return (
    <span className={`inline-flex items-center gap-2 px-4 py-2 ${config.bg} border ${config.border} ${config.text} rounded-full text-xs font-bold transition-all hover:scale-105 backdrop-blur-sm`}>
      <span className={`w-1.5 h-1.5 ${config.dot} rounded-full animate-pulse`} />
      {status}
    </span>
  );
};

export default StatusBadge;