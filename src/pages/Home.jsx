import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Canvas } from '@react-three/fiber'
import { Stars, Float } from '@react-three/drei'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FaRobot, FaChalkboardTeacher, FaAward, FaUsers, FaLaptopCode, FaBrain, FaGraduationCap, FaChartLine, FaGlobe, FaRocket, FaMedal, FaCertificate, FaUserGraduate } from 'react-icons/fa'
import { useNavigate, Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

// function FloatingIcon({ children, speed = 1 }) {
//   return (
//     <Float
//       speed={speed}
//       rotationIntensity={0.5}
//       floatIntensity={0.5}
//     >
//       {children}
//     </Float>
//   )
// }

function Home() {
  const navigate = useNavigate()
  const targetRef = useRef(null)
  const headerRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  })

  // Parallax effect
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
      offset: 100
    })

    // GSAP Animations
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
      })

      // Scroll-triggered animations
      gsap.utils.toArray('.feature-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          },
          opacity: 0,
          y: 50,
          rotation: 5,
          duration: 0.8,
          ease: "power3.out",
          delay: i * 0.1
        })
      })
    })

    // Mouse move effect
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      ctx.revert()
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Enhanced container animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  // Enhanced item animations
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  }

  // Hero section animations
  const heroTextVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
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
      ref={targetRef}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white relative"
    >
      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <Canvas>
          <Stars 
            radius={100} 
            depth={50} 
            count={5000} 
            factor={4} 
            saturation={0} 
            fade 
            speed={1}
          />
        </Canvas>
      </div>

      {/* Animated cursor gradient */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`
        }}
      />

      {/* Navbar */}
      <nav ref={headerRef} className="fixed w-full z-50 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800/50">
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

      {/* Hero Section with enhanced animations */}
      <motion.section 
        style={{ y, opacity }}
        className="h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden pt-16"
      >
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"
          />
        </AnimatePresence>

        <motion.div
          variants={heroTextVariants}
          className="relative z-10"
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
            animate={{
              backgroundPosition: ["0%", "100%"],
              transition: {
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          >
            EduTech AI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-8"
          >
            Revolutionizing Education Through Artificial Intelligence and Immersive Learning
          </motion.p>

          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 25px rgba(59, 130, 246, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 0.3,
              type: "spring",
              stiffness: 300
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all"
            onClick={() => navigate('/login')}
          >
            Get Started
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Features Section with new design and animations */}
      <motion.section 
        className="py-20 px-4 relative overflow-hidden"
      >
        {/* Animated background elements */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{
            background: [
              "radial-gradient(circle at 0% 0%, #4F46E5 0%, transparent 50%)",
              "radial-gradient(circle at 100% 100%, #4F46E5 0%, transparent 50%)",
              "radial-gradient(circle at 0% 100%, #4F46E5 0%, transparent 50%)",
              "radial-gradient(circle at 100% 0%, #4F46E5 0%, transparent 50%)",
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />

        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
              <span className="px-4 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium mb-4 block">
                Why Choose Us
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
              Transform Your Learning Journey
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Experience education reimagined through cutting-edge AI technology and personalized learning paths
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Learning",
                description: "Adaptive learning system that evolves with your progress",
                icon: <FaRobot className="text-4xl text-blue-500" />,
                color: "from-blue-600/20 to-blue-400/5"
              },
              {
                title: "Real-time Analytics",
                description: "Track your progress with detailed insights and metrics",
                icon: <FaChartLine className="text-4xl text-purple-500" />,
                color: "from-purple-600/20 to-purple-400/5"
              },
              {
                title: "Expert Mentorship",
                description: "Connect with industry professionals and educators",
                icon: <FaUserGraduate className="text-4xl text-green-500" />,
                color: "from-green-600/20 to-green-400/5"
              },
              {
                title: "Interactive Projects",
                description: "Learn by doing with hands-on project experiences",
                icon: <FaLaptopCode className="text-4xl text-yellow-500" />,
                color: "from-yellow-600/20 to-yellow-400/5"
              },
              {
                title: "Global Community",
                description: "Join a worldwide network of learners and educators",
                icon: <FaGlobe className="text-4xl text-red-500" />,
                color: "from-red-600/20 to-red-400/5"
              },
              {
                title: "Certified Courses",
                description: "Earn recognized certificates for your achievements",
                icon: <FaCertificate className="text-4xl text-cyan-500" />,
                color: "from-cyan-600/20 to-cyan-400/5"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className={`feature-card relative group rounded-2xl p-6 bg-gradient-to-br ${feature.color} 
                  backdrop-blur-xl border border-gray-800 hover:border-gray-700 
                  transition-all duration-300`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative mb-4 inline-block"
                >
                  {feature.icon}
                </motion.div>
                
                <h3 className="text-xl font-bold mb-2 relative">{feature.title}</h3>
                <p className="text-gray-400 relative">{feature.description}</p>

                <motion.div
                  className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full 
                font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300
                shadow-lg hover:shadow-blue-500/25"
            >
              Explore All Features
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

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