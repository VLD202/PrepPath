export default function EligibilityResult({ result }) {
  const isEligible = result.eligible;

  return (
    <div className="relative group">
      {/* Animated gradient glow */}
      <div className={`absolute -inset-1 rounded-3xl opacity-30 blur-2xl transition-all duration-500 group-hover:opacity-40 ${
        isEligible 
          ? 'bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500' 
          : 'bg-gradient-to-r from-rose-500 via-red-500 to-orange-500'
      }`} />
      
      <div className="relative bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-10 shadow-2xl overflow-hidden">
        {/* Decorative background elements */}
        <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 ${
          isEligible ? 'bg-emerald-500/10' : 'bg-rose-500/10'
        }`} />
        <div className={`absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 ${
          isEligible ? 'bg-teal-500/10' : 'bg-orange-500/10'
        }`} />

        {isEligible ? (
          <div className="relative text-center space-y-6">
            {/* Success Icon */}
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-emerald-500 rounded-full blur-2xl opacity-40 animate-pulse" />
              <div className="relative w-28 h-28 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/50 mx-auto transform hover:scale-110 transition-transform duration-500">
                <svg className="w-14 h-14 text-white animate-bounce-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Success Message */}
            <div className="space-y-3">
              <h3 className="text-5xl font-black bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
                Congratulations!
              </h3>
              <p className="text-xl text-slate-300 font-medium">
                You're <span className="text-emerald-400 font-bold">eligible</span> for placement
              </p>
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
                <span className="text-emerald-400 font-semibold">
                  ✓ {result.targetCompany || 'Target'} Companies
                </span>
              </div>
            </div>

            {/* Celebration decoration */}
            <div className="flex justify-center gap-4 text-4xl pt-4">
              <span className="animate-bounce" style={{ animationDelay: '0ms' }}>🎉</span>
              <span className="animate-bounce" style={{ animationDelay: '150ms' }}>🎊</span>
              <span className="animate-bounce" style={{ animationDelay: '300ms' }}>🎯</span>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-6 mt-8">
              <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                Next Steps
              </h4>
              <ul className="space-y-2 text-left text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">→</span>
                  <span>Start preparing for coding interviews</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">→</span>
                  <span>Build projects to showcase your skills</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">→</span>
                  <span>Practice system design concepts</span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="relative text-center space-y-6">
            {/* Warning Icon */}
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-rose-500 rounded-full blur-2xl opacity-30 animate-pulse" />
              <div className="relative w-28 h-28 bg-gradient-to-br from-rose-400 to-red-500 rounded-full flex items-center justify-center shadow-2xl shadow-rose-500/50 mx-auto transform hover:scale-110 transition-transform duration-500">
                <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>

            {/* Not Eligible Message */}
            <div className="space-y-3">
              <h3 className="text-4xl font-black bg-gradient-to-r from-rose-400 via-red-400 to-orange-400 bg-clip-text text-transparent">
                Not Eligible Yet
              </h3>
              <p className="text-lg text-slate-400">
                But don't worry! Here's what you need to improve
              </p>
            </div>

            {/* Stats Comparison */}
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-2xl p-8 space-y-5 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-6">
                {/* Required CGPA */}
                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-5 text-center">
                  <p className="text-xs font-semibold text-slate-400 uppercase mb-2 tracking-wider">
                    Required CGPA
                  </p>
                  <div className="text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    {result.requiredCgpa}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Minimum needed</p>
                </div>

                {/* Current CGPA */}
                <div className="bg-gradient-to-br from-rose-500/10 to-orange-500/10 border border-rose-500/20 rounded-xl p-5 text-center">
                  <p className="text-xs font-semibold text-slate-400 uppercase mb-2 tracking-wider">
                    Your CGPA
                  </p>
                  <div className="text-4xl font-black bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent">
                    {result.currentCgpa}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Current score</p>
                </div>
              </div>

              {/* Gap Indicator */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl blur-lg" />
                <div className="relative bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold text-amber-300">Performance Gap</p>
                        <p className="text-xs text-slate-400">Points needed to qualify</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                        {(result.requiredCgpa - result.currentCgpa).toFixed(2)}
                      </div>
                      <p className="text-xs text-slate-500">points</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Improvement Tips */}
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">💡</span>
                </div>
                <div className="text-left">
                  <h4 className="text-lg font-bold text-white mb-2">How to Improve</h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5">•</span>
                      <span>Focus on improving grades in upcoming semesters</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5">•</span>
                      <span>Build strong projects to compensate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5">•</span>
                      <span>Excel in coding competitions and hackathons</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
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