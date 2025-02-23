import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaUser, FaGoogle, FaGithub } from 'react-icons/fa';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup attempt:', formData);
    navigate(formData.role === 'student' ? '/dashboard' : '/teacher-dashboard');
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Left Content Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-gray-900 to-black items-center justify-center p-12">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
        <div className="relative z-10 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Join EduSphere Today
            </h1>
            <p className="text-gray-300 text-xl mb-8">
              Unlock your potential with AI-powered learning. Join our global community of successful learners.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              {[
                { stat: "500+", label: "AI-Powered Courses" },
                { stat: "98%", label: "Completion Rate" },
                { stat: "45+", label: "Industry Partners" },
                { stat: "4.9/5", label: "Student Rating" }
              ].map((item, index) => (
                <div key={index} className="bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold text-white">{item.stat}</h3>
                  <p className="text-gray-400">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Signup Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-black">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-md w-full"
        >
          <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 block text-center mb-8">
            EduSphere
          </Link>

          <h2 className="text-3xl font-bold text-white mb-2 text-center">Create your account</h2>
          <p className="text-gray-500 text-center mb-8">Start your learning journey today</p>

          {/* Role Selection */}
          <div className="flex gap-4 mb-8">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'student' })}
              className={`flex-1 py-3 rounded-full font-semibold transition-all ${
                formData.role === 'student'
                  ? 'bg-white text-black'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'teacher' })}
              className={`flex-1 py-3 rounded-full font-semibold transition-all ${
                formData.role === 'teacher'
                  ? 'bg-white text-black'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Teacher
            </button>
          </div>

          {/* Social Signup Buttons */}
          <div className="space-y-4 mb-8">
            <button className="w-full bg-white text-black rounded-full py-3 font-semibold flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors">
              <FaGoogle className="text-xl" />
              Sign up with Google
            </button>
            <button className="w-full bg-[#24292F] text-white rounded-full py-3 font-semibold flex items-center justify-center gap-3 hover:bg-gray-800 transition-colors">
              <FaGithub className="text-xl" />
              Sign up with GitHub
            </button>
          </div>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-black text-gray-500">or continue with</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2">Full Name</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-black border border-gray-800 rounded-lg px-10 py-3 focus:outline-none focus:border-blue-500 text-white"
                  placeholder="Enter your name"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-black border border-gray-800 rounded-lg px-10 py-3 focus:outline-none focus:border-blue-500 text-white"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-black border border-gray-800 rounded-lg px-10 py-3 focus:outline-none focus:border-blue-500 text-white"
                  placeholder="Create a password"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Confirm Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full bg-black border border-gray-800 rounded-lg px-10 py-3 focus:outline-none focus:border-blue-500 text-white"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4 rounded border-gray-800 bg-black text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-400">
                I agree to the <a href="#" className="text-blue-500 hover:text-blue-400">Terms of Service</a> and{' '}
                <a href="#" className="text-blue-500 hover:text-blue-400">Privacy Policy</a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black rounded-full py-3 font-semibold hover:bg-gray-100 transition-all"
            >
              Create Account
            </button>
          </form>

          <p className="text-gray-500 text-center mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:text-blue-400">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Signup; 