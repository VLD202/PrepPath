import { useState } from "react";
import { checkEligibility } from "../api/eligibility";

export default function EligibilityForm({ onResult }) {
  const [cgpa, setCgpa] = useState("");
  const [targetCompany, setTargetCompany] = useState("Product");
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await checkEligibility({
        cgpa: Number(cgpa),
        domain: "Backend",
        targetCompany
      });
      onResult(res);
    } finally {
      setIsLoading(false);
    }
  };

  const companyTypes = [
    { value: "Service", label: "Service", icon: "🏢", desc: "TCS, Wipro, Infosys" },
    { value: "Product", label: "Product", icon: "💼", desc: "Startups, Mid-size" },
    { value: "FAANG", label: "FAANG", icon: "🚀", desc: "Google, Meta, Amazon" }
  ];

  return (
    <div className="relative group">
      {/* Animated gradient glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-all duration-500" />
      
      <div className="relative bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl overflow-hidden">
        {/* Decorative corner accents */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        {/* Header */}
        <div className="relative flex items-center gap-4 mb-8">
          <div className="relative group/icon">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl blur-md opacity-50 group-hover/icon:opacity-75 transition-opacity" />
            <div className="relative w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover/icon:scale-110 group-hover/icon:rotate-6 transition-all duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white mb-1">
              Eligibility Check
            </h3>
            <p className="text-sm text-slate-400">Find your perfect career match</p>
          </div>
        </div>
        
        <form onSubmit={submit} className="relative space-y-7">
          {/* CGPA Input */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              Academic Performance (CGPA)
            </label>
            <div className="relative group/input">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl opacity-0 group-hover/input:opacity-20 blur transition-opacity" />
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                placeholder="7.5"
                value={cgpa}
                onChange={(e) => setCgpa(e.target.value)}
                className="relative w-full px-6 py-4 bg-slate-800/80 border border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-white placeholder-slate-500 text-lg font-medium backdrop-blur-sm"
                required
              />
              <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <span className="text-slate-600 text-sm font-bold">/ 10.0</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-1.5 ml-1">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Enter your current CGPA on a 10-point scale
            </p>
          </div>

          {/* Company Type Selector */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              Target Company Tier
            </label>
            <div className="grid grid-cols-3 gap-3">
              {companyTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setTargetCompany(type.value)}
                  className={`relative group/btn p-5 rounded-2xl border-2 transition-all duration-300 ${
                    targetCompany === type.value
                      ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/20'
                      : 'border-slate-700 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-800'
                  }`}
                >
                  {targetCompany === type.value && (
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl opacity-20 blur" />
                  )}
                  <div className="relative flex flex-col items-center gap-2">
                    <span className="text-3xl transform group-hover/btn:scale-110 transition-transform">
                      {type.icon}
                    </span>
                    <span className={`text-sm font-bold transition-colors ${
                      targetCompany === type.value ? 'text-cyan-400' : 'text-slate-300'
                    }`}>
                      {type.label}
                    </span>
                    <span className="text-xs text-slate-500">{type.desc}</span>
                  </div>
                  {targetCompany === type.value && (
                    <div className="absolute top-2 right-2">
                      <div className="w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !cgpa}
            className="relative w-full group/submit overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 rounded-2xl transition-all duration-300 group-hover/submit:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover/submit:opacity-100 transition-opacity blur-xl" />
            <div className="relative px-8 py-4 flex items-center justify-center gap-3 text-white font-bold text-lg">
              {isLoading ? (
                <>
                  <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <span>Check Eligibility</span>
                  <svg className="w-5 h-5 transform group-hover/submit:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}