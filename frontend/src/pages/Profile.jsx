import { useState } from "react";
import Layout from "../components/Layout";

const Profile = () => {
  const [form, setForm] = useState({
    name: "", email: "", cgpa: "", branch: "", skills: "", dsa: "", role: "", year: "", college: "", location: ""
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      console.log(form);
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1500);
  };

  const fields = ['name', 'email', 'cgpa', 'branch', 'skills', 'dsa', 'role', 'college'];
  const filledFields = fields.filter(field => form[field] && form[field].toString().trim() !== '').length;
  const completion = Math.round((filledFields / fields.length) * 100);

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          Student Profile
        </h1>
        <p className="text-gray-400">Complete your profile to get personalized recommendations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-5 group-hover:opacity-10 transition-opacity" />
              
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                <h3 className="text-xl font-black text-white mb-6">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField label="Full Name" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" />
                  <InputField label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" />
                  <InputField label="College" name="college" value={form.college} onChange={handleChange} placeholder="MIT" />
                  <InputField label="Location" name="location" value={form.location} onChange={handleChange} placeholder="New York, USA" />
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-5 group-hover:opacity-10 transition-opacity" />
              
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                <h3 className="text-xl font-black text-white mb-6">Academic Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField label="CGPA" name="cgpa" type="number" step="0.01" min="0" max="10" value={form.cgpa} onChange={handleChange} placeholder="8.5" />
                  <SelectField label="Branch" name="branch" value={form.branch} onChange={handleChange} options={["Computer Science", "IT", "Electronics", "Mechanical"]} />
                  <SelectField label="Year" name="year" value={form.year} onChange={handleChange} options={["1st Year", "2nd Year", "3rd Year", "4th Year"]} />
                  <InputField label="DSA Problems Solved" name="dsa" type="number" value={form.dsa} onChange={handleChange} placeholder="250" />
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-5 group-hover:opacity-10 transition-opacity" />
              
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                <h3 className="text-xl font-black text-white mb-6">Skills & Goals</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Skills (comma separated)</label>
                    <textarea
                      name="skills"
                      value={form.skills}
                      onChange={handleChange}
                      placeholder="React, Node.js, Python..."
                      rows={3}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all resize-none text-white placeholder-gray-500"
                    />
                  </div>
                  <SelectField label="Preferred Job Role" name="role" value={form.role} onChange={handleChange} options={["Frontend Developer", "Backend Developer", "Full Stack", "Data Scientist"]} />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                type="submit"
                disabled={isSaving}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 shadow-lg shadow-purple-500/20 transform hover:scale-105"
              >
                {isSaving ? "Saving..." : "Save Profile"}
              </button>
              {saved && (
                <span className="text-green-400 font-semibold flex items-center space-x-2">
                  <span className="text-xl">✓</span>
                  <span>Saved successfully!</span>
                </span>
              )}
            </div>
          </form>
        </div>

        <div className="space-y-6">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-10 group-hover:opacity-20 transition-opacity" />
            
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6">
              <h3 className="text-xl font-black text-white mb-4 text-center">Profile Completion</h3>
              <div className="relative w-40 h-40 mx-auto mb-4">
                <svg className="transform -rotate-90 w-40 h-40">
                  <circle cx="80" cy="80" r="70" stroke="rgba(255,255,255,0.1)" strokeWidth="12" fill="transparent" />
                  <circle 
                    cx="80" 
                    cy="80" 
                    r="70" 
                    stroke="url(#gradient)" 
                    strokeWidth="12" 
                    fill="transparent" 
                    strokeDasharray={`${2 * Math.PI * 70}`} 
                    strokeDashoffset={`${2 * Math.PI * 70 * (1 - completion / 100)}`} 
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {completion}%
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-400 text-center">{filledFields}/{fields.length} fields completed</p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-10 group-hover:opacity-20 transition-opacity" />
            
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6">
              <h3 className="text-xl font-black text-white mb-4">Quick Tips</h3>
              <div className="space-y-3">
                {[
                  { icon: "💡", text: "Higher CGPA improves readiness" },
                  { icon: "🎯", text: "Aim for 300+ DSA problems" },
                  { icon: "🚀", text: "Add diverse skills" }
                ].map((tip, i) => (
                  <div key={i} className="flex items-start space-x-3 p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all group/tip">
                    <span className="text-xl transform group-hover/tip:scale-125 transition-transform">{tip.icon}</span>
                    <p className="text-sm text-gray-300">{tip.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

function InputField({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-300 mb-2">{label}</label>
      <input 
        {...props} 
        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all text-white placeholder-gray-500" 
      />
    </div>
  );
}

function SelectField({ label, options, ...props }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-300 mb-2">{label}</label>
      <select 
        {...props} 
        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all text-white"
      >
        <option value="" className="bg-black">Select {label}</option>
        {options.map(opt => <option key={opt} value={opt} className="bg-black">{opt}</option>)}
      </select>
    </div>
  );
}

export default Profile;