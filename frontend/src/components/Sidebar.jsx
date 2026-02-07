import { NavLink } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: "📊", gradient: "from-cyan-500 to-blue-500" },
    { path: "/profile", label: "Profile", icon: "👤", gradient: "from-purple-500 to-pink-500" },
    { path: "/readiness", label: "Readiness", icon: "🎯", gradient: "from-emerald-500 to-teal-500" },
    { path: "/courses", label: "Courses", icon: "📚", gradient: "from-amber-500 to-orange-500" },
  ];

  return (
    <div className={`relative bg-slate-900/30 backdrop-blur-xl border-r border-slate-800/50 min-h-screen transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-72'}`}>
      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 w-6 h-6 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all z-50"
      >
        <svg className={`w-3 h-3 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="p-6">
        {/* Navigation Header */}
        {!isCollapsed && (
          <div className="mb-8">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider px-4">
              Navigation
            </h2>
          </div>
        )}

        {/* Nav Items */}
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `relative group flex items-center gap-4 px-4 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300 ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white'
                } ${isCollapsed ? 'justify-center' : ''}`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <>
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-2xl opacity-10`} />
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-2xl opacity-20 blur-xl`} />
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-r-full" />
                    </>
                  )}
                  <span className={`relative text-2xl transform transition-all duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                    {item.icon}
                  </span>
                  {!isCollapsed && (
                    <span className="relative">{item.label}</span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Quick Stats */}
        {!isCollapsed && (
          <div className="mt-8 p-5 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl backdrop-blur-sm">
            <h3 className="text-xs font-bold text-slate-500 uppercase mb-4 tracking-wider">
              Quick Stats
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Overall Progress</span>
                <span className="text-sm font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  67%
                </span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg shadow-cyan-500/50" style={{ width: '67%' }} />
              </div>
              <div className="pt-3 border-t border-slate-700/50 flex items-center justify-between">
                <span className="text-xs text-slate-500">Streak</span>
                <span className="flex items-center gap-1 text-xs font-bold text-amber-400">
                  🔥 7 days
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;