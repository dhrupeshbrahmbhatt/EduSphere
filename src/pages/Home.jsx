import { motion } from 'framer-motion'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FaRobot, FaChalkboardTeacher, FaAward, FaUsers, FaLaptopCode, FaBrain, FaGraduationCap, FaChartLine, FaGlobe, FaRocket, FaMedal, FaCertificate } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
      offset: 100
    })
  }, [])

  // Add container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  // Add item animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white"
    >
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                  EduSphere
                </span>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                <a href="#features" className="text-gray-300 hover:text-white transition-colors">
                  Features
                </a>
                <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">
                  How It Works
                </a>
                <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">
                  Testimonials
                </a>
                <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">
                  Pricing
                </a>
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Link 
                to="/login"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section 
        variants={itemVariants}
        className="h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden pt-16"
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
        <div data-aos="fade-up" data-aos-delay="200">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            EduTech AI
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-8">
            Revolutionizing Education Through Artificial Intelligence and Immersive Learning
          </p>
          <Link to="/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all"
            >
              Get Started
            </motion.button>
          </Link>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div data-aos="fade-up">
            <h2 className="text-4xl font-bold text-center mb-16">Revolutionary Features</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <FaRobot className="text-5xl text-blue-500 mb-4" />,
                title: "AI Mentor",
                description: "Personalized learning experience with our advanced AI mentor that adapts to your unique learning style."
              },
              {
                icon: <FaChalkboardTeacher className="text-5xl text-purple-500 mb-4" />,
                title: "Smart Analytics",
                description: "Track progress and gain insights with our comprehensive analytics dashboard."
              },
              {
                icon: <FaBrain className="text-5xl text-green-500 mb-4" />,
                title: "Adaptive Learning",
                description: "AI-powered system that adjusts difficulty and content based on your performance and learning pace."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-gray-800 p-8 rounded-2xl hover:bg-gray-700 transition-all transform hover:-translate-y-2"
              >
                {feature.icon}
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <motion.section 
        variants={itemVariants}
        className="py-20 bg-gray-900/50"
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Sign Up",
                description: "Create your account and set your learning goals",
                icon: <FaUsers className="text-4xl text-blue-500" />
              },
              {
                step: "2",
                title: "AI Assessment",
                description: "Our AI evaluates your current knowledge level",
                icon: <FaLaptopCode className="text-4xl text-purple-500" />
              },
              {
                step: "3",
                title: "Personalized Path",
                description: "Get a custom learning journey tailored to you",
                icon: <FaBrain className="text-4xl text-green-500" />
              },
              {
                step: "4",
                title: "Track Progress",
                description: "Earn rewards as you achieve your goals",
                icon: <FaAward className="text-4xl text-yellow-500" />
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        variants={itemVariants}
        className="py-20 bg-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-5xl font-bold text-blue-500">99%</h3>
              <p className="text-xl mt-2 text-gray-300">Student Satisfaction</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold text-purple-500">50K+</h3>
              <p className="text-xl mt-2 text-gray-300">Active Users</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold text-green-500">1000+</h3>
              <p className="text-xl mt-2 text-gray-300">Interactive Lessons</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
        variants={itemVariants}
        className="py-20 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Computer Science Student",
                content: "The AI mentor has completely transformed how I learn programming. It's like having a personal tutor available 24/7."
              },
              {
                name: "Michael Chen",
                role: "Data Science Professional",
                content: "The adaptive learning system helped me master complex concepts at my own pace. The personalization is incredible."
              },
              {
                name: "Emily Williams",
                role: "Web Developer",
                content: "The analytics dashboard gives me clear insights into my progress. I can see exactly where I need to focus."
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-gray-800 p-8 rounded-2xl"
              >
                <p className="text-gray-400 mb-6">"{testimonial.content}"</p>
                <h4 className="font-bold">{testimonial.name}</h4>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Technology Stack Section */}
      <section className="py-20 px-4 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/circuit.svg')] bg-center opacity-5"></div>
        <div className="max-w-7xl mx-auto relative">
          <div data-aos="fade-up">
            <h2 className="text-4xl font-bold text-center mb-16">Cutting-Edge Technology Stack</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                title: "Neural Networks",
                description: "Advanced AI models that understand and adapt to your learning patterns",
                icon: <FaBrain className="text-4xl text-blue-500" />
              },
              {
                title: "Real-time Analysis",
                description: "Instant feedback and performance metrics",
                icon: <FaChartLine className="text-4xl text-green-500" />
              },
              {
                title: "Global Learning",
                description: "Connect with learners worldwide",
                icon: <FaGlobe className="text-4xl text-purple-500" />
              },
              {
                title: "Future Ready",
                description: "Constantly evolving curriculum",
                icon: <FaRocket className="text-4xl text-red-500" />
              }
            ].map((item, index) => (
              <div
                key={index}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
                className="bg-gray-800/50 p-8 rounded-xl text-center backdrop-blur-sm hover:bg-gray-700/50 transition-all"
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievement Showcase */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="max-w-7xl mx-auto">
          <div data-aos="fade-up">
            <h2 className="text-4xl font-bold text-center mb-16">Student Success Stories</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                metric: "94%",
                title: "Employment Rate",
                description: "Of our graduates secure positions in top tech companies"
              },
              {
                metric: "127%",
                title: "Average Salary Increase",
                description: "Salary growth after completing our advanced courses"
              },
              {
                metric: "50+",
                title: "Industry Partners",
                description: "Leading companies hiring our graduates"
              }
            ].map((item, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 200}
                className="text-center transform hover:-translate-y-2 transition-transform"
              >
                <h3 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
                  {item.metric}
                </h3>
                <h4 className="text-2xl font-bold mb-2">{item.title}</h4>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Paths with Parallax */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/particles.svg')] bg-fixed opacity-5"></div>
        <div className="max-w-7xl mx-auto relative">
          <div data-aos="fade-up">
            <h2 className="text-4xl font-bold text-center mb-16">Professional Certification Paths</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI Development",
                features: ["Machine Learning", "Neural Networks", "Computer Vision", "NLP"],
                icon: <FaRobot className="text-5xl text-blue-500" />,
                price: "$999"
              },
              {
                title: "Data Science",
                features: ["Statistical Analysis", "Big Data", "Predictive Modeling", "Data Visualization"],
                icon: <FaChartLine className="text-5xl text-purple-500" />,
                price: "$899",
                featured: true
              },
              {
                title: "Cloud Computing",
                features: ["AWS", "Azure", "DevOps", "Microservices"],
                icon: <FaGlobe className="text-5xl text-green-500" />,
                price: "$799"
              }
            ].map((path, index) => (
              <div
                key={index}
                data-aos="flip-left"
                data-aos-delay={index * 100}
                className={`${
                  path.featured 
                    ? 'bg-gradient-to-b from-blue-600 to-purple-600' 
                    : 'bg-gray-800'
                } p-8 rounded-2xl relative transform hover:-translate-y-2 transition-transform`}
              >
                <div className="flex justify-center mb-6">{path.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{path.title}</h3>
                <ul className="space-y-3 mb-8">
                  {path.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <FaAward className="text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="text-3xl font-bold mb-6">{path.price}</p>
                <button className={`w-full py-3 rounded-full font-semibold ${
                  path.featured 
                    ? 'bg-white text-blue-600' 
                    : 'bg-blue-600 text-white'
                } hover:opacity-90 transition-opacity`}>
                  Enroll Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Impact */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-7xl mx-auto text-center">
          <div data-aos="fade-up">
            <h2 className="text-4xl font-bold mb-16">Global Impact</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {[
              { number: "120+", label: "Countries" },
              { number: "1M+", label: "Students" },
              { number: "500+", label: "Courses" },
              { number: "98%", label: "Success Rate" }
            ].map((stat, index) => (
              <div 
                key={index}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
                className="p-6 transform hover:scale-105 transition-transform"
              >
                <h3 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                  {stat.number}
                </h3>
                <p className="text-xl text-gray-400 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-fixed opacity-5"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <div data-aos="fade-up">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              The Future of Education is Here
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join thousands of students worldwide who are already transforming their careers with EduTech AI
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-full text-xl font-semibold hover:opacity-90 transition-all transform hover:scale-105">
              Begin Your Journey
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default Home 