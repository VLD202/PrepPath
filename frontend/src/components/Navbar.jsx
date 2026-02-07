import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="relative z-50 border-b border-slate-800/50 backdrop-blur-xl bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <span className="text-white font-black text-2xl">P</span>
              </div>
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              PrepPath
            </span>
          </Link>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <Link 
              to="/profile" 
              className="px-5 py-2.5 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-slate-600 rounded-xl text-sm font-semibold text-slate-300 hover:text-white transition-all duration-300"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="relative group/btn overflow-hidden px-6 py-2.5 rounded-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-red-600 transition-all" />
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-red-500 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
              <span className="relative text-sm font-semibold text-white flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;