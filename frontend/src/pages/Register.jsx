import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
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
    const particleCount = 30;

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
        ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
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

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters!");
      return;
    }

    setIsLoading(true);
    try {
      await api.post("/auth/register", { name, email, password });
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Email might already be in use.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Particle Canvas */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 pointer-events-none z-0"
      />

      {/* Dynamic Gradient Background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.3), transparent 50%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
      </div>

      {/* Floating Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6 py-12">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Branding */}
          <div className="hidden md:block">
            <Link to="/" className="inline-flex items-center space-x-3 mb-8 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  P
                </div>
              </div>
              <span className="text-3xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                PrepPath
              </span>
            </Link>
            
            <h1 className="text-5xl font-black mb-4 leading-tight">
              Start Your
              <br/>
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Success Story
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of students achieving their placement goals
            </p>

            <div className="space-y-4">
              {[
                { icon: "✨", text: "AI-powered personalized learning" },
                { icon: "📊", text: "Real-time progress tracking" },
                { icon: "🎯", text: "Job readiness assessment" }
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-3 group">
                  <div className="w-10 h-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-gray-300 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
              
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-black mb-2">Create Account</h2>
                  <p className="text-gray-400">Start your journey today</p>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm">
                    <p className="text-red-400 text-sm font-semibold flex items-center">
                      <span className="mr-2">⚠️</span>
                      {error}
                    </p>
                  </div>
                )}

                <form onSubmit={handleRegister} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all text-white placeholder-gray-500"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all text-white placeholder-gray-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all text-white placeholder-gray-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    {password && (
                      <div className="mt-2">
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-300 ${
                              password.length >= 10 ? 'bg-green-500 w-full' :
                              password.length >= 6 ? 'bg-yellow-500 w-2/3' :
                              'bg-red-500 w-1/3'
                            }`}
                          />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          {password.length >= 10 ? 'Strong password' : password.length >= 6 ? 'Medium strength' : 'Weak password'}
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all text-white placeholder-gray-500"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/20 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating account...
                      </span>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-gray-400">
                    Already have an account?{" "}
                    <Link to="/login" className="text-purple-400 hover:text-purple-300 font-bold transition-colors">
                      Sign in →
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              {[
                { icon: "✓", text: "100% Free" },
                { icon: "✓", text: "No Card" },
                { icon: "✓", text: "Instant Access" }
              ].map((item, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg py-2 px-3 hover:bg-white/10 transition-all">
                  <span className="text-green-400 font-bold mr-1">{item.icon}</span>
                  <span className="text-xs text-gray-300 font-semibold">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(5deg); }
          66% { transform: translate(-20px, 20px) rotate(-5deg); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-40px, 30px) rotate(-5deg); }
          66% { transform: translate(30px, -20px) rotate(5deg); }
        }

        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 10s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Register;