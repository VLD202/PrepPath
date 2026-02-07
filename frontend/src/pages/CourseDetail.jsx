import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

const modules = [
  { id: 1, name: "Introduction", done: true, duration: "2h 30m", lessons: 8 },
  { id: 2, name: "Core Concepts", done: true, duration: "3h 15m", lessons: 12 },
  { id: 3, name: "Practice Problems", done: false, duration: "2h 45m", lessons: 10 },
  { id: 4, name: "Advanced Topics", done: false, duration: "4h 00m", lessons: 15 },
  { id: 5, name: "Mock Test", done: false, duration: "2h 00m", lessons: 20 }
];

const CourseDetail = () => {
  const { id } = useParams();
  const completedModules = modules.filter(m => m.done).length;
  const progress = Math.round((completedModules / modules.length) * 100);

  return (
    <Layout>
      <div className="mb-8 group relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
        
        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-full mb-3 shadow-lg shadow-purple-500/30">
                Intermediate
              </span>
              <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                DSA with Java
              </h1>
              <p className="text-gray-400 mb-4">Master Data Structures and Algorithms using Java</p>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <div className="flex items-center space-x-2 bg-white/5 px-3 py-1 rounded-lg">
                  <span>👨‍🏫</span>
                  <span>Dr. Anil Kumar</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/5 px-3 py-1 rounded-lg">
                  <span>⏱️</span>
                  <span>8 weeks</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/5 px-3 py-1 rounded-lg">
                  <span>📚</span>
                  <span>{modules.length} modules</span>
                </div>
              </div>
            </div>
            <span className="text-6xl">☕</span>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-300 font-semibold">Your Progress</span>
              <span className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {progress}%
              </span>
            </div>
            
            <div className="h-3 bg-white/10 rounded-full overflow-hidden mb-3">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 shadow-lg shadow-purple-500/50"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <p className="text-sm text-gray-400">
              {completedModules} of {modules.length} modules completed
            </p>
          </div>
        </div>
      </div>

      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-5 group-hover:opacity-10 transition-opacity" />
        
        <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
          <h2 className="text-2xl font-black text-white mb-6">Course Modules</h2>

          <div className="space-y-4">
            {modules.map((module, idx) => (
              <div
                key={module.id}
                className={`group/module border rounded-2xl p-5 transition-all duration-300 ${
                  module.done 
                    ? 'bg-green-500/10 border-green-500/30 hover:bg-green-500/20' 
                    : 'bg-white/5 border-white/10 hover:border-purple-500/50 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg transition-all ${
                      module.done 
                        ? 'bg-green-500 text-white shadow-lg shadow-green-500/50' 
                        : 'bg-white/10 text-gray-400 group-hover/module:bg-white/20'
                    }`}>
                      {module.done ? '✓' : idx + 1}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">{module.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>⏱️ {module.duration}</span>
                        <span>📚 {module.lessons} lessons</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      module.done 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                    }`}>
                      {module.done ? 'Completed' : 'Pending'}
                    </span>

                    <button className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${
                      module.done
                        ? 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/20'
                    }`}>
                      {module.done ? 'Review' : 'Start'} →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CourseDetail;