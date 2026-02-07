import { useState } from "react";

export default function StudyCalendar() {
  const [progress, setProgress] = useState({});
  const today = new Date().toISOString().split("T")[0];

  const toggleDay = (date) => {
    setProgress((prev) => ({
      ...prev,
      [date]: !prev[date]
    }));
  };

  const getStreak = () => {
    let streak = 0;
    let date = new Date();

    while (true) {
      const key = date.toISOString().split("T")[0];
      if (progress[key]) {
        streak++;
        date.setDate(date.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  // Last 7 days
  const days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return {
      date: d.toISOString().split("T")[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' })
    };
  });

  const streak = getStreak();

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-3xl opacity-20 blur-2xl group-hover:opacity-30 transition-opacity" />
      
      <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
        
        <div className="relative">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/30">
              <span className="text-2xl">📅</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Study Tracker</h3>
              <p className="text-sm text-slate-400">Build consistency, achieve goals</p>
            </div>
          </div>

          {/* Streak Display */}
          <div className="relative mb-8 overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-red-500/10 blur-xl" />
            <div className="relative bg-gradient-to-br from-amber-500/10 to-red-500/10 border border-amber-500/30 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 mb-1 font-medium">Current Streak</p>
                  <p className="text-5xl font-black bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                    {streak}
                  </p>
                  <p className="text-sm text-slate-400 mt-1">
                    {streak === 1 ? 'day' : 'days'} in a row
                  </p>
                </div>
                <div className="text-7xl animate-bounce-slow">
                  {streak >= 7 ? '🔥' : streak >= 3 ? '⚡' : '📚'}
                </div>
              </div>
              {streak >= 7 && (
                <div className="mt-4 pt-4 border-t border-amber-500/20">
                  <p className="text-sm text-amber-400 font-medium">
                    🎉 Amazing! You're on fire! Keep the momentum going!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Calendar Days */}
          <div className="space-y-3">
            {days.map(({ date, dayName, dayNumber, month }) => {
              const isDone = progress[date];
              const isToday = date === today;
              
              return (
                <div
                  key={date}
                  className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isDone 
                      ? 'bg-emerald-500/5 border-emerald-500/30 hover:bg-emerald-500/10' 
                      : isToday
                      ? 'bg-cyan-500/5 border-cyan-500/30 hover:bg-cyan-500/10'
                      : 'bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50'
                  }`}
                >
                  {isDone && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5" />
                  )}
                  {isToday && !isDone && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5" />
                  )}
                  
                  <div className="relative flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center font-bold transition-all ${
                        isDone 
                          ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30' 
                          : isToday
                          ? 'bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}>
                        <span className="text-lg">{dayNumber}</span>
                        <span className="text-xs opacity-75">{month}</span>
                      </div>
                      <div>
                        <p className="font-bold text-white text-lg">{dayName}</p>
                        <p className="text-xs text-slate-500">{date}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleDay(date)}
                      className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                        isDone
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30'
                          : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30'
                      }`}
                    >
                      {isDone ? '✓ Done' : '○ Mark'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Motivational Message */}
          <div className="mt-8 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-5 backdrop-blur-sm">
            <p className="text-sm text-center font-medium bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {streak === 0 
                ? '💡 Start your study streak today!' 
                : streak < 3
                ? '🎯 Keep going! Consistency is key.'
                : streak < 7
                ? '🚀 Great progress! You\'re building a strong habit.'
                : '⭐ Outstanding dedication! You\'re unstoppable!'}
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}