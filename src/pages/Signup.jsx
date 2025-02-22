import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaGraduationCap, FaChalkboardTeacher } from 'react-icons/fa';

const Signup = () => {
  const [role, setRole] = useState('student');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialization: '' // For teachers only
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('Signing up as:', role, formData);
      // Add your registration logic here
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error('Signup error:', error);
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
            Join Our AI-Powered Learning Platform
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Experience the future of education with personalized AI mentoring and interactive learning experiences. Choose your role and begin your journey today.
          </p>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl">
          <h2 className="text-3xl font-semibold text-center mb-8 text-white">Create Account</h2>

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
                <FaUser className="mr-2" />
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                <FaEnvelope className="mr-2" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
                placeholder="Create a password"
              />
            </div>

            {role === 'teacher' && (
              <div>
                <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                  <FaGraduationCap className="mr-2" />
                  Specialization
                </label>
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
                  placeholder="Your field of expertise"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:opacity-90 transition duration-200 font-medium transform hover:scale-[1.02]"
            >
              Create Account
            </button>
          </form>
          
          <p className="text-center mt-6 text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup; 