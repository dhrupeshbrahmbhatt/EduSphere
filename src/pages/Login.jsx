import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaGraduationCap, FaChalkboardTeacher } from 'react-icons/fa';

const Login = () => {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Here you would implement your actual login logic
    try {
      console.log('Logging in as:', role, email);
      // Add your authentication logic here
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex bg-gradient-to-b from-gray-900 to-black">
      <div className="flex-1 px-16 py-8 flex flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
        <div className="relative">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Welcome Back to the Future
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Continue your journey with AI-powered education. Your personalized learning experience awaits.
          </p>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl">
          <h2 className="text-3xl font-semibold text-center mb-8 text-white">Login</h2>

          {/* Role Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-900/50 p-2 rounded-xl flex gap-2">
              <button
                onClick={() => setRole('student')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                  role === 'student'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <FaGraduationCap className="text-xl" />
                Student
              </button>
              <button
                onClick={() => setRole('teacher')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                  role === 'teacher'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <FaChalkboardTeacher className="text-xl" />
                Teacher
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                <FaEnvelope className="mr-2" />
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                <FaLock className="mr-2" />
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-400">
                <input type="checkbox" className="mr-2 rounded border-gray-600 text-blue-600 focus:ring-blue-500 bg-gray-900/50" />
                Remember me
              </label>
              <a href="#" className="text-blue-400 hover:text-blue-300">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:opacity-90 transition duration-200 font-medium transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
          <p className="text-center mt-6 text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-400 hover:text-blue-300">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; 