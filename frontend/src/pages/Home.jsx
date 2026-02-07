import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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

    for (let i = 0; i < 50; i++) particles.push(new Particle());
    
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

  const features = [
    { icon: "🎯", title: "Smart Eligibility Check", desc: "Know where you stand instantly" },
    { icon: "📊", title: "Readiness Analytics", desc: "Track your placement preparation" },
    { icon: "🗺️", title: "Personalized Roadmap", desc: "Custom learning paths for you" },
    { icon: "💼", title: "Job Role Matching", desc: "Find your perfect career fit" },
    { icon: "📚", title: "Course Library", desc: "Curated learning resources" },
    { icon: "⚡", title: "Real-time Tracking", desc: "Monitor progress daily" }
  ];

  const stats = [
    { value: "10K+", label: "Students" },
    { value: "500+", label: "Companies" },
    { value: "92%", label: "Success Rate" },
    { value: "24/7", label: "Support" }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Dynamic Gradient */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.15), transparent 40%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />
      </div>

      {/* Floating Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed" />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 border-b border-slate-800/50 backdrop-blur-xl bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <span className="text-white font-black text-2xl">P</span>
                </div>
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                PrepPath
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Link 
                to="/login" 
                className="px-6 py-2.5 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-slate-600 rounded-xl text-sm font-semibold text-slate-300 hover:text-white transition-all duration-300"
              >
                Login
              </Link>
              <Link 
                to="/register"
                className="relative group/btn overflow-hidden px-6 py-2.5 rounded-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 transition-all" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                <span className="relative text-sm font-semibold text-white">Get Started →</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-32">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-8">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-sm font-bold text-cyan-400">Your Career Success Platform</span>
          </div>
          
          <h1 className="text-7xl md:text-8xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-slate-200 to-white bg-clip-text text-transparent">
              Master Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Placement Journey
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12">
            AI-powered preparation platform that gets you placement-ready with personalized roadmaps, skill tracking, and expert guidance
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link
              to="/register"
              className="relative group/cta overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl opacity-0 group-hover/cta:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-2xl opacity-0 group-hover/cta:opacity-50 blur-xl" />
              <div className="relative px-8 py-4 flex items-center gap-3 text-white font-bold text-lg">
                <span>Start Free Today</span>
                <svg className="w-5 h-5 transform group-hover/cta:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-slate-800/50 hover:bg-slate-700/50 border-2 border-slate-700 hover:border-slate-600 rounded-2xl text-white font-bold text-lg transition-all hover:scale-105"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, i) => (
            <div key={i} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all" />
              <div className="relative bg-slate-900/50 border border-slate-800 rounded-2xl p-6 text-center backdrop-blur-sm hover:border-slate-700 transition-all">
                <div className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400 font-semibold">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="mb-24">
          <h2 className="text-4xl font-black text-center mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Everything You Need
            </span>
          </h2>
          <p className="text-center text-slate-400 mb-12 text-lg">
            Comprehensive tools to accelerate your career success
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all" />
                <div className="relative bg-slate-900/50 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm hover:border-cyan-500/30 transition-all">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 rounded-3xl opacity-20 blur-2xl" />
          <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/50 rounded-3xl p-16 text-center backdrop-blur-xl">
            <h2 className="text-5xl font-black mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Ready to Get Started?
              </span>
            </h2>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
              Join thousands of students who are already on their path to success
            </p>
            <Link
              to="/register"
              className="inline-block relative group/final"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl opacity-0 group-hover/final:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-2xl opacity-0 group-hover/final:opacity-50 blur-2xl" />
              <div className="relative px-12 py-5 text-white font-bold text-xl">
                Create Free Account →
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/50 backdrop-blur-xl bg-slate-900/30 py-8">
        <div className="max-w-7xl mx-auto px-8 text-center text-slate-500">
          <p className="text-sm">© 2024 PrepPath. Empowering students to achieve their career goals.</p>
        </div>
      </footer>

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

export default Home;