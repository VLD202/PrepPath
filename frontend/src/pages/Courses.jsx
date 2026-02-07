import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const courses = [
  { id: 1, title: "DSA with Java", level: "Intermediate", progress: 60, modules: 12, icon: "☕", gradient: "from-orange-600 to-orange-800" },
  { id: 2, title: "Frontend Development", level: "Beginner", progress: 30, modules: 10, icon: "🎨", gradient: "from-blue-600 to-blue-800" },
  { id: 3, title: "DevOps Basics", level: "Beginner", progress: 10, modules: 8, icon: "🚀", gradient: "from-purple-600 to-purple-800" },
  { id: 4, title: "System Design", level: "Advanced", progress: 0, modules: 15, icon: "🏗️", gradient: "from-green-600 to-green-800" },
  { id: 5, title: "React Mastery", level: "Intermediate", progress: 0, modules: 14, icon: "⚛️", gradient: "from-cyan-600 to-cyan-800" },
  { id: 6, title: "Database Design", level: "Intermediate", progress: 0, modules: 11, icon: "🗄️", gradient: "from-pink-600 to-pink-800" }
];

const Courses = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          Your Courses
        </h1>
        <p className="text-gray-400">Continue learning and master new skills</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="group relative cursor-pointer"
            onClick={() => navigate(`/courses/${course.id}`)}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${course.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500`} />
            
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 transform group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-500">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  {course.icon}
                </div>
                <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                  course.level === 'Beginner' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                  course.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                  'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  {course.level}
                </span>
              </div>

              <h2 className="text-xl font-black text-white mb-2">{course.title}</h2>
              <p className="text-sm text-gray-400 mb-4">{course.modules} modules</p>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400 font-semibold">Progress</span>
                  <span className="text-white font-bold">{course.progress}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/20 transform group-hover:scale-105">
                {course.progress > 0 ? 'Continue →' : 'Start Course →'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Courses;