import Navbar from "./Navbar";

export default function Roadmap({ data }) {
  if (!data) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <Navbar />
        <div className="relative z-10 max-w-7xl mx-auto px-8 py-16">
          <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-16 text-center shadow-2xl">
            <span className="text-8xl mb-6 block animate-bounce-slow">📋</span>
            <h2 className="text-3xl font-bold text-white mb-4">No Roadmap Available</h2>
            <p className="text-lg text-slate-400 mb-2">Complete your profile to generate a personalized learning path</p>
            <p className="text-sm text-slate-500">We'll create a custom roadmap based on your goals and current skills</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <Navbar />

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-full">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-sm font-bold text-slate-400">Personalized Learning Path</span>
          </div>
          <h1 className="text-5xl font-black bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3">
            {data.domain} Roadmap
          </h1>
          <p className="text-xl text-slate-400">Your journey to mastery, step by step</p>
        </div>

        {/* Roadmap Timeline */}
        <div className="mb-12 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-3xl opacity-20 blur-2xl" />
          
          <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                <span className="text-2xl">🗺️</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Learning Path</h2>
                <p className="text-sm text-slate-400">{data.roadmap.length} milestones to complete</p>
              </div>
            </div>

            <div className="space-y-4">
              {data.roadmap.map((step, index) => (
                <div
                  key={step.step}
                  className="group/step relative overflow-hidden"
                >
                  {/* Connector Line */}
                  {index < data.roadmap.length - 1 && (
                    <div className="absolute left-7 top-16 w-0.5 h-12 bg-gradient-to-b from-slate-700 to-transparent" />
                  )}
                  
                  <div className="relative bg-slate-800/30 border border-slate-700/50 rounded-2xl p-5 hover:bg-slate-800/50 hover:border-purple-500/30 transition-all duration-300">
                    <div className="flex items-start gap-5">
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl blur-md opacity-50" />
                          <div className="relative w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center font-black text-xl text-white shadow-lg transform group-hover/step:scale-110 group-hover/step:rotate-6 transition-all">
                            {step.step}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover/step:text-purple-400 transition-colors">
                          {step.topic}
                        </h3>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 text-sm text-slate-400">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">{step.duration}</span>
                          </div>
                          <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-full text-xs font-bold">
                            Step {step.step}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DSA Section */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl opacity-20 blur-2xl" />
          
          <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="text-2xl">💻</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">DSA Preparation</h2>
                <p className="text-sm text-slate-400">Master data structures and algorithms</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-6 backdrop-blur-sm">
                <p className="text-sm text-slate-400 uppercase mb-3 font-bold tracking-wider">Current Level</p>
                <p className="text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {data.dsa.level}
                </p>
                <p className="text-sm text-slate-500">Your proficiency stage</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6 backdrop-blur-sm">
                <p className="text-sm text-slate-400 uppercase mb-3 font-bold tracking-wider">Target</p>
                <p className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {data.dsa.questions}
                </p>
                <p className="text-sm text-slate-500">Problems to solve</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-5 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">💡</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Pro Tip</h4>
                  <p className="text-sm text-cyan-400">
                    Consistency is key! Try to solve at least 2-3 problems daily. Focus on understanding patterns rather than memorizing solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}