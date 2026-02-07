import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      draw() {
        ctx.fillStyle = `rgba(6, 182, 212, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < 30; i++) particles.push(new Particle());
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      requestAnimationFrame(animate);
    }
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Dynamic Gradient */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.3), transparent 50%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />
      </div>

      {/* Floating Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6 py-12">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Branding */}
          <div className="hidden md:block">
            <Link to="/" className="inline-flex items-center space-x-3 mb-8 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-14 h-14 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  P
                </div>
              </div>
              <span className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                PrepPath
              </span>
            </Link>
            
            <h1 className="text-5xl font-black mb-4 leading-tight">
              Welcome
              <br/>
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Back!
              </span>
            </h1>
            
            <p className="text-xl text-slate-400 mb-8">
              Continue your journey to placement success
            </p>

            <div className="space-y-4">
              {[
                { icon: "📈", text: "Track your progress in real-time" },
                { icon: "🎯", text: "Follow your personalized roadmap" },
                { icon: "💼", text: "Prepare for your dream company" }
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-3 group">
                  <div className="w-10 h-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-slate-300 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
              
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-black mb-2">Sign In</h2>
                  <p className="text-slate-400">Access your dashboard</p>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl backdrop-blur-sm">
                    <p className="text-rose-400 text-sm font-semibold flex items-center">
                      <span className="mr-2">⚠️</span>
                      {error}
                    </p>
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-500 focus:bg-white/10 transition-all text-white placeholder-slate-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-500 focus:bg-white/10 transition-all text-white placeholder-slate-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer group/check">
                      <input type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-white/5 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 focus:ring-2" />
                      <span className="text-slate-400 group-hover/check:text-slate-300 transition-colors">Remember me</span>
                    </label>
                    <a href="#" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
                      Forgot password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                      </span>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-slate-400">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors">
                      Create one →
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              {[
                { icon: "🔒", text: "Secure" },
                { icon: "⚡", text: "Fast" },
                { icon: "✓", text: "Trusted" }
              ].map((item, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg py-2 px-3 hover:bg-white/10 transition-all">
                  <span className="text-cyan-400 font-bold mr-1">{item.icon}</span>
                  <span className="text-xs text-slate-300 font-semibold">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 30px) scale(0.95); }
          66% { transform: translate(30px, -20px) scale(1.05); }
        }
        .animate-float { animation: float 20s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 25s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Login;