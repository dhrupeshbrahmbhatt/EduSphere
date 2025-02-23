import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaTwitter, FaGoogle, FaGithub } from 'react-icons/fa';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
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
              Welcome to EduSphere
            </h1>
            <p className="text-gray-300 text-xl mb-8">
              Transform your learning experience with AI-powered education platform. Join thousands of students worldwide.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              {[
                { stat: "1M+", label: "Active Students" },
                { stat: "50+", label: "Countries" },
                { stat: "95%", label: "Success Rate" },
                { stat: "24/7", label: "AI Support" }
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

      {/* Right Login Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-black">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-md w-full"
        >
          <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 block text-center mb-8">
            EduSphere
          </Link>

          <h2 className="text-3xl font-bold text-white mb-2 text-center">Sign in to EduSphere</h2>
          <p className="text-gray-500 text-center mb-8">Enter your details below</p>

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

          {/* Social Login Buttons */}
          <div className="space-y-4 mb-8">
            <button className="w-full bg-white text-black rounded-full py-3 font-semibold flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors">
              <FaGoogle className="text-xl" />
              Continue with Google
            </button>
            <button className="w-full bg-[#24292F] text-white rounded-full py-3 font-semibold flex items-center justify-center gap-3 hover:bg-gray-800 transition-colors">
              <FaGithub className="text-xl" />
              Continue with GitHub
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
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-gray-800 bg-black text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-400">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-blue-500 hover:text-blue-400">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black rounded-full py-3 font-semibold hover:bg-gray-100 transition-all"
            >
              Sign In
            </button>
          </form>

          <p className="text-gray-500 text-center mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:text-blue-400">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Login; 