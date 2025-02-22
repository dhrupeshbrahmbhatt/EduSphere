import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FaChartBar,
  FaUserCheck,
  FaTasks,
  FaBrain,
  FaGraduationCap,
  FaLaptopCode,
  FaClock,
  FaRobot,
  FaBook,
  FaCalendarAlt,
  FaComments,
  FaCog,
  FaUserGraduate,
  FaChartLine,
  FaCheckCircle,
  FaRocket,
  FaStar,
  FaAtom,
  FaFlask,
  FaMicroscope,
  FaLaptop,
  FaFileAlt,
  FaVideo,
  FaBookOpen,
  FaDownload,
  FaFilePdf,
  FaImage,
  FaChevronLeft,
  FaChevronRight,
  FaUserFriends,
  FaTrophy,
  FaEnvelope,
  FaChalkboardTeacher,
  FaBullhorn
} from 'react-icons/fa'

function StudentDashboard() {
  const [activeSection, setActiveSection] = useState('overview')
  const [isLoading, setIsLoading] = useState(false)
  
  // Student-specific states
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      subject: "Mathematics",
      title: "Quadratic Equations Practice",
      dueDate: "2024-03-25",
      status: "pending",
      progress: 65,
      priority: "high"
    },
    {
      id: 2,
      subject: "Physics",
      title: "Newton's Laws Assignment",
      dueDate: "2024-03-28",
      status: "completed",
      progress: 100,
      priority: "medium"
    },
    {
      id: 3,
      subject: "Chemistry",
      title: "Periodic Table Quiz",
      dueDate: "2024-03-30",
      status: "in-progress",
      progress: 45,
      priority: "high"
    },
    {
      id: 4,
      subject: "English",
      title: "Shakespeare Essay",
      dueDate: "2024-04-02",
      status: "pending",
      progress: 20,
      priority: "medium"
    }
  ])

  // Add these animation variants
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

  const gradientColors = {
    blue: 'from-blue-500/20 to-blue-600/20',
    green: 'from-green-500/20 to-emerald-600/20',
    purple: 'from-purple-500/20 to-purple-600/20',
    yellow: 'from-yellow-500/20 to-yellow-600/20'
  }

  // Add new states for streak data
  const [currentStreak, setCurrentStreak] = useState(12);
  const [bestStreak, setBestStreak] = useState(21);
  const [streakDetails, setStreakDetails] = useState([
    {
      type: "Attendance",
      days: 12,
      icon: <FaUserCheck />,
      color: "from-green-500/20 to-emerald-600/20",
      lastUpdated: "Today"
    },
    {
      type: "Study Buddy",
      days: 8,
      icon: <FaUserFriends />,
      color: "from-blue-500/20 to-cyan-600/20",
      partner: "Alex Johnson",
      lastUpdated: "Today"
    },
    {
      type: "Top Performer",
      days: 5,
      icon: <FaTrophy />,
      color: "from-yellow-500/20 to-orange-600/20",
      subject: "Mathematics",
      lastUpdated: "Yesterday"
    }
  ]);

  // Add new state for messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Mrs. Smith",
      role: "Physics Teacher",
      avatar: "S",
      message: "Don't forget to submit your Physics lab report by Friday!",
      time: "10:30 AM",
      unread: true,
      subject: "Physics Lab Report Reminder"
    },
    {
      id: 2,
      sender: "Mr. Johnson",
      role: "Mathematics Teacher",
      avatar: "J",
      message: "Great work on your recent Algebra test! Keep it up!",
      time: "Yesterday",
      unread: false,
      subject: "Test Performance"
    },
    {
      id: 3,
      sender: "Study Group",
      role: "Chemistry Group",
      avatar: "C",
      message: "Alex: Are we meeting today for chemistry revision?",
      time: "Yesterday",
      unread: true,
      subject: "Group Study Plan"
    },
    {
      id: 4,
      sender: "Ms. Williams",
      role: "Class Teacher",
      avatar: "W",
      message: "Parent-teacher meeting scheduled for next week",
      time: "2 days ago",
      unread: false,
      subject: "Parent-Teacher Meeting"
    }
  ]);

  // Add this section right after the stats grid in OverviewSection
  const StreakSection = () => (
    <motion.div
      variants={itemVariants}
      className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-2xl p-8 
        border border-blue-500/20 overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-grid-white/5 bg-grid animate-grid-flow"/>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent 
              bg-gradient-to-r from-blue-400 to-purple-400">
              Achievement Streak
            </h2>
            <p className="text-gray-400">Keep the momentum going! 🔥</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-400">Current Streak</p>
              <p className="text-3xl font-bold text-white">{currentStreak} days</p>
            </div>
            <div className="h-10 w-px bg-gray-700"/>
            <div className="text-center">
              <p className="text-sm text-gray-400">Best Streak</p>
              <p className="text-3xl font-bold text-white">{bestStreak} days</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {streakDetails.map((streak, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`bg-gradient-to-br ${streak.color} backdrop-blur-sm rounded-2xl p-6 
                hover:scale-105 transition-all duration-300 shadow-xl shadow-gray-900/20 
                border border-gray-700/30 relative overflow-hidden group`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 
                group-hover:opacity-100 transition-opacity duration-500"/>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-gray-300 font-medium text-sm">{streak.type}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {streak.partner && `With ${streak.partner}`}
                      {streak.subject && `In ${streak.subject}`}
                    </p>
                  </div>
                  <div className={`text-2xl p-2 rounded-xl bg-white/5`}>
                    {streak.icon}
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-bold bg-clip-text text-transparent 
                    bg-gradient-to-r from-white to-gray-400">
                    {streak.days}
                  </h3>
                  <span className="text-gray-400">days</span>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 
                        border-2 border-gray-900 flex items-center justify-center text-xs text-white">
                        🔥
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-400 text-sm">Last updated: {streak.lastUpdated}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Streak Rewards */}
        <div className="mt-8 bg-gray-800/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Upcoming Rewards</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { days: 15, reward: "Achievement Badge", icon: "🏅" },
              { days: 20, reward: "Special Recognition", icon: "🌟" },
              { days: 30, reward: "Excellence Certificate", icon: "📜" }
            ].map((reward, index) => (
              <div key={index} className="flex items-center gap-3 bg-gray-700/20 rounded-lg p-3">
                <span className="text-2xl">{reward.icon}</span>
                <div>
                  <p className="text-white font-medium">{reward.reward}</p>
                  <p className="text-sm text-gray-400">at {reward.days} days</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Update OverviewSection to include StreakSection
  const OverviewSection = () => (
    <div className="space-y-8">
      {/* Quick Stats Grid - Neural Interface Style */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { 
            title: "Neural Performance", 
            value: "98.5", 
            unit: "NQ",
            icon: <FaBrain />, 
            color: "from-cyan-500/20 to-blue-600/20",
            trend: "+2.3%"
          },
          { 
            title: "Learning Velocity", 
            value: "2.4x", 
            unit: "AVG",
            icon: <FaChartLine />, 
            color: "from-purple-500/20 to-pink-600/20",
            trend: "+0.3x"
          },
          { 
            title: "Knowledge Base", 
            value: "89.2", 
            unit: "TB",
            icon: <FaLaptopCode />, 
            color: "from-emerald-500/20 to-teal-600/20",
            trend: "+5.7%"
          },
          { 
            title: "Synaptic Score", 
            value: "950", 
            unit: "pts",
            icon: <FaGraduationCap />, 
            color: "from-amber-500/20 to-orange-600/20",
            trend: "+75"
          }
        ].map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`bg-gradient-to-br ${stat.color} backdrop-blur-sm rounded-2xl p-6 
              hover:scale-105 transition-all duration-300 shadow-xl shadow-gray-900/20 
              border border-gray-700/30 relative overflow-hidden group`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 
              group-hover:opacity-100 transition-opacity duration-500"/>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <p className="text-gray-400 font-medium text-sm">{stat.title}</p>
                <div className={`text-2xl p-2 rounded-xl bg-white/5`}>
                  {stat.icon}
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold bg-clip-text text-transparent 
                  bg-gradient-to-r from-white to-gray-400">{stat.value}</h3>
                <span className="text-gray-500 font-medium">{stat.unit}</span>
              </div>
              <p className="text-green-400 text-sm mt-2 font-medium">{stat.trend}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Streak Section */}
      <StreakSection />

      {/* AI Study Assistant - Neuralink Style */}
      <motion.div
        variants={itemVariants}
        className="relative bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-2xl p-8 
          border border-blue-500/20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-white/5 bg-grid animate-grid-flow"/>
        <div className="relative z-10">
          <div className="flex items-center gap-6 mb-8">
            <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
              <FaRobot className="text-4xl text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent 
                bg-gradient-to-r from-blue-400 to-purple-400">
                Neuralink Learning Assistant
              </h2>
              <p className="text-gray-400">Quantum-enhanced learning recommendations</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Neural Focus",
                content: "Quantum Computing Principles",
                icon: <FaLaptopCode className="text-cyan-400" />,
                color: "from-cyan-500/10 to-blue-500/10"
              },
              {
                title: "Synaptic Link",
                content: "Neural Network Architecture",
                icon: <FaBrain className="text-purple-400" />,
                color: "from-purple-500/10 to-pink-500/10"
              },
              {
                title: "Time Optimization",
                content: "Recommended: 2.5 hours today",
                icon: <FaClock className="text-emerald-400" />,
                color: "from-emerald-500/10 to-teal-500/10"
              }
            ].map((item, index) => (
              <div key={index} 
                className={`bg-gradient-to-br ${item.color} rounded-xl p-6 border border-gray-700/30
                  hover:border-gray-600/50 transition-all duration-300`}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 bg-gray-900/50 rounded-xl">
                    {item.icon}
                  </div>
                  <h3 className="font-medium text-gray-300">{item.title}</h3>
                </div>
                <p className="text-white font-medium">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Active Courses - Tesla Interface Style */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          variants={itemVariants}
          className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold bg-clip-text text-transparent 
              bg-gradient-to-r from-white to-gray-400">Active Neural Links</h2>
            <button className="px-4 py-2 bg-white/5 rounded-xl hover:bg-white/10 
              transition-colors duration-300 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-5">
            {[
              { name: "Quantum Computing", progress: 78, instructor: "Dr. Quantum", color: "from-cyan-500 to-blue-500" },
              { name: "Neural Interfaces", progress: 65, instructor: "Prof. Neuralink", color: "from-purple-500 to-pink-500" },
              { name: "Space Engineering", progress: 92, instructor: "Dr. Starship", color: "from-red-500 to-orange-500" }
            ].map((course, index) => (
              <div key={index} className="bg-gray-800/30 rounded-xl p-5 hover:bg-gray-800/50 
                transition-all duration-300 group">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-white group-hover:text-blue-400 
                    transition-colors duration-300">{course.name}</h3>
                  <span className="text-sm text-gray-400">{course.instructor}</span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${course.color} 
                      transition-all duration-500 ease-out`}
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <div className="mt-2 text-right">
                  <span className="text-sm font-medium text-gray-400">
                    {course.progress}% Synaptic Transfer
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Add more sections as needed */}
      </div>
    </div>
  )

  // Add this new section component
  const CoursesSection = () => (
    <div className="space-y-8">
      {/* Active Courses Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {[
          {
            name: "Mathematics",
            instructor: "Mr. Johnson",
            progress: 78,
            nextLesson: "Quadratic Equations",
            color: "from-cyan-500 to-blue-500",
            icon: <FaBook />,
            status: "In Progress",
            dueDate: "Mar 25, 2024"
          },
          {
            name: "Physics",
            instructor: "Mrs. Smith",
            progress: 65,
            nextLesson: "Laws of Motion",
            color: "from-purple-500 to-pink-500",
            icon: <FaAtom />,
            status: "In Progress",
            dueDate: "Mar 28, 2024"
          },
          {
            name: "Chemistry",
            instructor: "Ms. Williams",
            progress: 92,
            nextLesson: "Periodic Table",
            color: "from-green-500 to-emerald-500",
            icon: <FaFlask />,
            status: "Near Completion",
            dueDate: "Mar 30, 2024"
          },
          {
            name: "English",
            instructor: "Mr. Davis",
            progress: 85,
            nextLesson: "Shakespeare's Sonnets",
            color: "from-yellow-500 to-orange-500",
            icon: <FaBook />,
            status: "In Progress",
            dueDate: "Apr 2, 2024"
          },
          {
            name: "Biology",
            instructor: "Mr. Wilson",
            progress: 70,
            nextLesson: "Cell Structure",
            color: "from-red-500 to-orange-500",
            icon: <FaMicroscope />,
            status: "In Progress",
            dueDate: "Apr 5, 2024"
          },
          {
            name: "Computer Science",
            instructor: "Mrs. Anderson",
            progress: 88,
            nextLesson: "Basic Programming",
            color: "from-blue-500 to-cyan-500",
            icon: <FaLaptop />,
            status: "In Progress",
            dueDate: "Apr 8, 2024"
          }
        ].map((course, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/30 
              overflow-hidden group hover:border-gray-700/50 transition-all duration-300"
          >
            <div className={`bg-gradient-to-r ${course.color} h-1`} />
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 
                    transition-colors duration-300">{course.name}</h3>
                  <p className="text-gray-400 text-sm">{course.instructor}</p>
                </div>
                <div className={`p-3 rounded-xl bg-gray-800/50 text-xl 
                  ${course.color.split(' ')[1].replace('to-', 'text-')}`}>
                  {course.icon}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white">{course.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r ${course.color} 
                        transition-all duration-500 ease-out`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Next Lesson</span>
                    <span className={`px-2 py-1 rounded-full text-xs 
                      ${course.progress >= 90 ? 'bg-green-500/20 text-green-400' :
                        'bg-blue-500/20 text-blue-400'}`}>
                      {course.status}
                    </span>
                  </div>
                  <p className="text-white text-sm">{course.nextLesson}</p>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-gray-400 text-sm">Due: {course.dueDate}</span>
                  <button className="px-4 py-2 bg-white/5 rounded-xl hover:bg-white/10 
                    transition-colors duration-300 text-sm font-medium">
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Course Statistics */}
      <motion.div
        variants={itemVariants}
        className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/30"
      >
        <h2 className="text-xl font-bold mb-6 bg-clip-text text-transparent 
          bg-gradient-to-r from-white to-gray-400">Learning Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Study Hours",
              value: "42.5",
              unit: "hours",
              icon: <FaClock className="text-blue-400" />,
              trend: "+8.5 this week"
            },
            {
              title: "Completion Rate",
              value: "85",
              unit: "%",
              icon: <FaChartLine className="text-green-400" />,
              trend: "+2.4%"
            },
            {
              title: "Average Score",
              value: "92",
              unit: "%",
              icon: <FaStar className="text-yellow-400" />,
              trend: "+3.2%"
            }
          ].map((stat, index) => (
            <div key={index} 
              className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-gray-700/30">
                  {stat.icon}
                </div>
                <p className="text-gray-400">{stat.title}</p>
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                <span className="text-gray-500">{stat.unit}</span>
              </div>
              <p className="text-green-400 text-sm mt-2">+{stat.trend} vs. last month</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recommended Study Material */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-2xl p-6 
          border border-blue-500/20"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold bg-clip-text text-transparent 
              bg-gradient-to-r from-blue-400 to-purple-400">
              Recommended Study Material
            </h2>
            <p className="text-gray-400">Based on your current topics</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              name: "Mathematics Practice Set",
              topic: "Quadratic Equations",
              duration: "45 mins",
              rating: 4.8,
              icon: <FaBook className="text-blue-400" />
            },
            {
              name: "Physics Lab Guide",
              topic: "Laws of Motion",
              duration: "30 mins",
              rating: 4.9,
              icon: <FaAtom className="text-purple-400" />
            }
          ].map((material, index) => (
            <div key={index} 
              className="bg-gray-800/30 rounded-xl p-4 hover:bg-gray-800/50 
                transition-all duration-300 group border border-gray-700/30"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gray-700/30">
                  {material.icon}
                </div>
                <div>
                  <h3 className="font-medium text-white group-hover:text-blue-400 
                    transition-colors duration-300">{material.name}</h3>
                  <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
                    <span>{material.topic}</span>
                    <span>•</span>
                    <span>{material.duration}</span>
                    <span>•</span>
                    <span>★ {material.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const AssignmentsSection = () => (
    <div className="space-y-8">
      {/* Active Assignments Overview */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        {[
          {
            title: "Due Soon",
            value: "4",
            icon: <FaClock />,
            color: "from-red-500/20 to-orange-600/20",
            trend: "2 tomorrow"
          },
          {
            title: "In Progress",
            value: "6",
            icon: <FaTasks />,
            color: "from-blue-500/20 to-cyan-600/20",
            trend: "75% avg progress"
          },
          {
            title: "Completed",
            value: "12",
            icon: <FaCheckCircle />,
            color: "from-green-500/20 to-emerald-600/20",
            trend: "+3 this week"
          },
          {
            title: "Success Rate",
            value: "94%",
            icon: <FaChartLine />,
            color: "from-purple-500/20 to-pink-600/20",
            trend: "+2.5% up"
          }
        ].map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`bg-gradient-to-br ${stat.color} backdrop-blur-sm rounded-2xl p-6 
              hover:scale-105 transition-all duration-300 shadow-xl shadow-gray-900/20 
              border border-gray-700/30 relative overflow-hidden group`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 
              group-hover:opacity-100 transition-opacity duration-500"/>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <p className="text-gray-400 font-medium text-sm">{stat.title}</p>
                <div className={`text-2xl p-2 rounded-xl bg-white/5`}>
                  {stat.icon}
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold bg-clip-text text-transparent 
                  bg-gradient-to-r from-white to-gray-400">{stat.value}</h3>
              </div>
              <p className="text-green-400 text-sm mt-2 font-medium">{stat.trend}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Current Assignments */}
      <motion.div
        variants={itemVariants}
        className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/30 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-800/50">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold bg-clip-text text-transparent 
              bg-gradient-to-r from-white to-gray-400">Neural Tasks Queue</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 
                transition-colors duration-300 text-sm font-medium">
                Filter
              </button>
              <button className="px-4 py-2 bg-blue-500/10 rounded-xl border border-blue-500/20 
                hover:bg-blue-500/20 transition-all duration-300 text-sm font-medium text-blue-400">
                Sort
              </button>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-800/50">
          {[
            {
              id: 1,
              subject: "Mathematics",
              title: "Quadratic Equations Practice",
              dueDate: "2024-03-25",
              status: "pending",
              progress: 65,
              priority: "high",
              color: "from-red-500 to-orange-500"
            },
            {
              id: 2,
              subject: "Physics",
              title: "Newton's Laws Assignment",
              dueDate: "2024-03-28",
              status: "completed",
              progress: 100,
              priority: "medium",
              color: "from-blue-500 to-cyan-500"
            },
            {
              id: 3,
              subject: "Chemistry",
              title: "Periodic Table Quiz",
              dueDate: "2024-03-30",
              status: "in-progress",
              progress: 45,
              priority: "high",
              color: "from-purple-500 to-pink-500"
            },
            {
              id: 4,
              subject: "English",
              title: "Shakespeare Essay",
              dueDate: "2024-04-02",
              status: "pending",
              progress: 20,
              priority: "medium",
              color: "from-yellow-500 to-orange-500"
            }
          ].map((assignment, index) => (
            <div key={index} className="p-6 hover:bg-gray-800/30 transition-colors duration-300">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{assignment.title}</h3>
                  <p className="text-gray-400 text-sm">{assignment.subject}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm 
                  ${assignment.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                    assignment.status === 'pending' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-blue-500/20 text-blue-400'}`}>
                  {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white">{assignment.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r ${assignment.color} 
                        transition-all duration-500 ease-out`}
                      style={{ width: `${assignment.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400">Due: {assignment.dueDate}</span>
                    <span className={`px-2 py-1 rounded-full text-xs 
                      ${assignment.priority === 'high' ? 'bg-red-500/20 text-red-400' : 
                        'bg-yellow-500/20 text-yellow-400'}`}>
                      {assignment.priority.toUpperCase()}
                    </span>
                  </div>
                  <button className="px-4 py-2 bg-white/5 rounded-xl hover:bg-white/10 
                    transition-colors duration-300 text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* AI Assistant Insights */}
      <motion.div
        variants={itemVariants}
        className="relative bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-2xl p-8 
          border border-blue-500/20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-white/5 bg-grid animate-grid-flow"/>
        <div className="relative z-10">
          <div className="flex items-center gap-6 mb-8">
            <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
              <FaRobot className="text-4xl text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent 
                bg-gradient-to-r from-blue-400 to-purple-400">
                Neural Task Analysis
              </h2>
              <p className="text-gray-400">AI-powered assignment insights and recommendations</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Priority Focus",
                content: "Quantum Computing Assignment due soon",
                icon: <FaBrain className="text-cyan-400" />,
                action: "Start Now"
              },
              {
                title: "Time Estimate",
                content: "3.5 hours needed for completion",
                icon: <FaClock className="text-purple-400" />,
                action: "Schedule"
              },
              {
                title: "Success Probability",
                content: "92% based on your performance",
                icon: <FaChartLine className="text-emerald-400" />,
                action: "View Details"
              }
            ].map((insight, index) => (
              <div key={index} 
                className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/30 
                  hover:bg-gray-800/50 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 bg-gray-900/50 rounded-xl">
                    {insight.icon}
                  </div>
                  <h3 className="font-medium text-gray-300">{insight.title}</h3>
                </div>
                <p className="text-white font-medium mb-4">{insight.content}</p>
                <button className="w-full px-4 py-2 bg-blue-500/10 rounded-xl 
                  hover:bg-blue-500/20 transition-all duration-300 text-sm font-medium text-blue-400">
                  {insight.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );

  // Add the new Grades section
  const GradesSection = () => (
    <div className="space-y-8">
      {/* Performance Overview */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        {[
          {
            title: "Current GPA",
            value: "9.2",
            icon: <FaGraduationCap />,
            color: "from-blue-500/20 to-cyan-600/20",
            trend: "+0.3 this term"
          },
          {
            title: "Class Rank",
            value: "#3",
            icon: <FaTrophy />,
            color: "from-yellow-500/20 to-orange-600/20",
            trend: "Top 5%"
          },
          {
            title: "Attendance",
            value: "96%",
            icon: <FaUserCheck />,
            color: "from-green-500/20 to-emerald-600/20",
            trend: "Excellent"
          },
          {
            title: "Overall Score",
            value: "92.5",
            icon: <FaChartLine />,
            color: "from-purple-500/20 to-pink-600/20",
            trend: "+2.3%"
          }
        ].map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`bg-gradient-to-br ${stat.color} backdrop-blur-sm rounded-2xl p-6 
              hover:scale-105 transition-all duration-300 shadow-xl shadow-gray-900/20 
              border border-gray-700/30 relative overflow-hidden group`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 
              group-hover:opacity-100 transition-opacity duration-500"/>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <p className="text-gray-400 font-medium text-sm">{stat.title}</p>
                <div className={`text-2xl p-2 rounded-xl bg-white/5`}>
                  {stat.icon}
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold bg-clip-text text-transparent 
                  bg-gradient-to-r from-white to-gray-400">{stat.value}</h3>
              </div>
              <p className="text-green-400 text-sm mt-2 font-medium">{stat.trend}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Current Semester Grades */}
      <motion.div
        variants={itemVariants}
        className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/30 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-800/50">
          <h2 className="text-xl font-bold bg-clip-text text-transparent 
            bg-gradient-to-r from-white to-gray-400">Current Term Performance</h2>
        </div>
        <div className="divide-y divide-gray-800/50">
          {[
            {
              subject: "Mathematics",
              grade: "A+",
              percentage: 95,
              instructor: "Mr. Johnson",
              color: "from-blue-500 to-cyan-500"
            },
            {
              subject: "Physics",
              grade: "A",
              percentage: 92,
              instructor: "Mrs. Smith",
              color: "from-purple-500 to-pink-500"
            },
            {
              subject: "Chemistry",
              grade: "A+",
              percentage: 98,
              instructor: "Ms. Williams",
              color: "from-green-500 to-emerald-500"
            },
            {
              subject: "English",
              grade: "A",
              percentage: 94,
              instructor: "Mr. Davis",
              color: "from-yellow-500 to-orange-500"
            },
            {
              subject: "Computer Science",
              grade: "A+",
              percentage: 96,
              instructor: "Mrs. Anderson",
              color: "from-red-500 to-orange-500"
            },
            {
              subject: "Biology",
              grade: "A",
              percentage: 91,
              instructor: "Mr. Wilson",
              color: "from-teal-500 to-cyan-500"
            }
          ].map((course, index) => (
            <div key={index} className="p-6 hover:bg-gray-800/30 transition-colors duration-300">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">{course.subject}</h3>
                  <p className="text-gray-400 text-sm">{course.instructor}</p>
                </div>
                <div className="text-2xl font-bold bg-clip-text text-transparent 
                  bg-gradient-to-r from-white to-gray-400">
                  {course.grade}
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Performance</span>
                  <span className="text-white">{course.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${course.color} 
                      transition-all duration-500 ease-out`}
                    style={{ width: `${course.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Academic Progress */}
      <motion.div
        variants={itemVariants}
        className="relative bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-2xl p-8 
          border border-blue-500/20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-white/5 bg-grid animate-grid-flow"/>
        <div className="relative z-10">
          <div className="flex items-center gap-6 mb-8">
            <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
              <FaBook className="text-4xl text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent 
                bg-gradient-to-r from-blue-400 to-purple-400">
                Academic Highlights
              </h2>
              <p className="text-gray-400">Your progress this term</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Best Subject",
                content: "Chemistry (98%)",
                icon: <FaStar className="text-yellow-400" />,
                action: "View Details"
              },
              {
                title: "Most Improved",
                content: "Physics (+5.2%)",
                icon: <FaChartLine className="text-green-400" />,
                action: "See Progress"
              },
              {
                title: "Achievement Status",
                content: "Honor Roll Eligible",
                icon: <FaTrophy className="text-orange-400" />,
                action: "View Criteria"
              }
            ].map((insight, index) => (
              <div key={index} 
                className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/30 
                  hover:bg-gray-800/50 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 bg-gray-900/50 rounded-xl">
                    {insight.icon}
                  </div>
                  <h3 className="font-medium text-gray-300">{insight.title}</h3>
                </div>
                <p className="text-white font-medium mb-4">{insight.content}</p>
                <button className="w-full px-4 py-2 bg-blue-500/10 rounded-xl 
                  hover:bg-blue-500/20 transition-all duration-300 text-sm font-medium text-blue-400">
                  {insight.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );

  const ResourcesSection = () => (
    <div className="space-y-8">
      {/* Quick Access Resources */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        {[
          {
            title: "Study Materials",
            count: "24",
            icon: <FaBook />,
            color: "from-blue-500/20 to-cyan-600/20",
            link: "View All"
          },
          {
            title: "Practice Tests",
            count: "12",
            icon: <FaFileAlt />,
            color: "from-purple-500/20 to-pink-600/20",
            link: "Start Practice"
          },
          {
            title: "Video Lessons",
            count: "36",
            icon: <FaVideo />,
            color: "from-green-500/20 to-emerald-600/20",
            link: "Watch Now"
          },
          {
            title: "Reference Books",
            count: "8",
            icon: <FaBookOpen />,
            color: "from-yellow-500/20 to-orange-600/20",
            link: "Browse"
          }
        ].map((resource, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`bg-gradient-to-br ${resource.color} backdrop-blur-sm rounded-2xl p-6 
              hover:scale-105 transition-all duration-300 shadow-xl shadow-gray-900/20 
              border border-gray-700/30 relative overflow-hidden group cursor-pointer`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 
              group-hover:opacity-100 transition-opacity duration-500"/>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <p className="text-gray-400 font-medium text-sm">{resource.title}</p>
                <div className={`text-2xl p-2 rounded-xl bg-white/5`}>
                  {resource.icon}
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold bg-clip-text text-transparent 
                  bg-gradient-to-r from-white to-gray-400">{resource.count}</h3>
                <span className="text-gray-500 font-medium">items</span>
              </div>
              <p className="text-blue-400 text-sm mt-2 font-medium">{resource.link} →</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Subject Resources */}
      <motion.div
        variants={itemVariants}
        className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/30 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-800/50">
          <h2 className="text-xl font-bold bg-clip-text text-transparent 
            bg-gradient-to-r from-white to-gray-400">Subject Resources</h2>
        </div>
        <div className="divide-y divide-gray-800/50">
          {[
            {
              subject: "Mathematics",
              resources: [
                { type: "Notes", title: "Quadratic Equations Complete Guide", format: "PDF" },
                { type: "Practice", title: "Algebra Problem Set", format: "DOC" },
                { type: "Video", title: "Trigonometry Basics", format: "MP4" }
              ],
              icon: <FaBook />,
              color: "text-blue-400"
            },
            {
              subject: "Physics",
              resources: [
                { type: "Notes", title: "Newton's Laws of Motion", format: "PDF" },
                { type: "Lab Guide", title: "Force and Motion Experiments", format: "PDF" },
                { type: "Practice", title: "Mechanics Problems", format: "DOC" }
              ],
              icon: <FaAtom />,
              color: "text-purple-400"
            },
            {
              subject: "Chemistry",
              resources: [
                { type: "Notes", title: "Periodic Table Guide", format: "PDF" },
                { type: "Lab Manual", title: "Chemical Reactions", format: "PDF" },
                { type: "Quiz", title: "Elements and Compounds", format: "QUIZ" }
              ],
              icon: <FaFlask />,
              color: "text-green-400"
            },
            {
              subject: "Biology",
              resources: [
                { type: "Notes", title: "Cell Structure and Function", format: "PDF" },
                { type: "Diagrams", title: "Human Anatomy", format: "PDF" },
                { type: "Video", title: "Photosynthesis Process", format: "MP4" }
              ],
              icon: <FaMicroscope />,
              color: "text-red-400"
            }
          ].map((subject, index) => (
            <div key={index} className="p-6 hover:bg-gray-800/30 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className={`text-2xl ${subject.color}`}>{subject.icon}</div>
                <h3 className="text-lg font-semibold text-white">{subject.subject}</h3>
              </div>
              <div className="space-y-3">
                {subject.resources.map((resource, idx) => (
                  <div key={idx} className="flex items-center justify-between 
                    bg-gray-800/30 rounded-xl p-4 hover:bg-gray-800/50 transition-all duration-300">
                    <div>
                      <p className="text-white font-medium">{resource.title}</p>
                      <p className="text-gray-400 text-sm">{resource.type}</p>
                    </div>
                    <button className="px-4 py-2 bg-white/5 rounded-xl hover:bg-white/10 
                      transition-colors duration-300 text-sm font-medium flex items-center gap-2">
                      <span>Download</span>
                      <FaDownload className="text-xs" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Downloads */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-2xl p-6 
          border border-blue-500/20"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold bg-clip-text text-transparent 
              bg-gradient-to-r from-blue-400 to-purple-400">Recent Downloads</h2>
            <p className="text-gray-400">Last accessed study materials</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              name: "Mathematics Formula Sheet",
              downloadDate: "Today",
              size: "2.4 MB",
              icon: <FaFilePdf className="text-red-400" />
            },
            {
              name: "Physics Lab Manual",
              downloadDate: "Yesterday",
              size: "3.8 MB",
              icon: <FaFilePdf className="text-red-400" />
            },
            {
              name: "Chemistry Notes",
              downloadDate: "2 days ago",
              size: "1.7 MB",
              icon: <FaFileAlt className="text-blue-400" />
            },
            {
              name: "Biology Diagrams",
              downloadDate: "3 days ago",
              size: "5.2 MB",
              icon: <FaImage className="text-green-400" />
            }
          ].map((download, index) => (
            <div key={index} 
              className="bg-gray-800/30 rounded-xl p-4 flex items-center justify-between 
                hover:bg-gray-800/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gray-700/30">
                  {download.icon}
                </div>
                <div>
                  <p className="text-white font-medium">{download.name}</p>
                  <p className="text-gray-400 text-sm">{download.downloadDate} • {download.size}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaDownload />
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const CalendarSection = () => (
    <div className="space-y-8">
      {/* Quick Stats */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        {[
          {
            title: "Upcoming Tests",
            count: "3",
            icon: <FaFileAlt />,
            color: "from-red-500/20 to-orange-600/20",
            trend: "This Week"
          },
          {
            title: "Assignments Due",
            count: "4",
            icon: <FaTasks />,
            color: "from-blue-500/20 to-cyan-600/20",
            trend: "Next 7 days"
          },
          {
            title: "School Events",
            count: "2",
            icon: <FaCalendarAlt />,
            color: "from-purple-500/20 to-pink-600/20",
            trend: "This Month"
          },
          {
            title: "Parent Meetings",
            count: "1",
            icon: <FaComments />,
            color: "from-green-500/20 to-emerald-600/20",
            trend: "Next Week"
          }
        ].map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`bg-gradient-to-br ${stat.color} backdrop-blur-sm rounded-2xl p-6 
              hover:scale-105 transition-all duration-300 shadow-xl shadow-gray-900/20 
              border border-gray-700/30 relative overflow-hidden group`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 
              group-hover:opacity-100 transition-opacity duration-500"/>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <p className="text-gray-400 font-medium text-sm">{stat.title}</p>
                <div className={`text-2xl p-2 rounded-xl bg-white/5`}>
                  {stat.icon}
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold bg-clip-text text-transparent 
                  bg-gradient-to-r from-white to-gray-400">{stat.count}</h3>
              </div>
              <p className="text-blue-400 text-sm mt-2 font-medium">{stat.trend}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Upcoming Events */}
      <motion.div
        variants={itemVariants}
        className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/30 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-800/50">
          <h2 className="text-xl font-bold bg-clip-text text-transparent 
            bg-gradient-to-r from-white to-gray-400">Upcoming Events</h2>
        </div>
        <div className="divide-y divide-gray-800/50">
          {[
            {
              title: "Mathematics Test",
              type: "Exam",
              subject: "Mathematics",
              date: "March 25, 2024",
              time: "9:00 AM",
              location: "Room 201",
              icon: <FaFileAlt />,
              color: "text-blue-400",
              priority: "high"
            },
            {
              title: "Physics Lab Experiment",
              type: "Practical",
              subject: "Physics",
              date: "March 27, 2024",
              time: "11:00 AM",
              location: "Science Lab",
              icon: <FaFlask />,
              color: "text-purple-400",
              priority: "medium"
            },
            {
              title: "Parent-Teacher Meeting",
              type: "Meeting",
              subject: "All Subjects",
              date: "March 30, 2024",
              time: "2:00 PM",
              location: "Conference Hall",
              icon: <FaComments />,
              color: "text-green-400",
              priority: "medium"
            },
            {
              title: "Chemistry Quiz",
              type: "Quiz",
              subject: "Chemistry",
              date: "April 2, 2024",
              time: "10:30 AM",
              location: "Room 203",
              icon: <FaFileAlt />,
              color: "text-yellow-400",
              priority: "high"
            }
          ].map((event, index) => (
            <div key={index} className="p-6 hover:bg-gray-800/30 transition-colors duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`text-2xl ${event.color}`}>{event.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                    <p className="text-gray-400 text-sm">{event.subject}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs 
                  ${event.priority === 'high' ? 'bg-red-500/20 text-red-400' : 
                    'bg-yellow-500/20 text-yellow-400'}`}>
                  {event.type}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <FaCalendarAlt className="text-sm" />
                  <span className="text-sm">{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <FaClock className="text-sm" />
                  <span className="text-sm">{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <FaBook className="text-sm" />
                  <span className="text-sm">{event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Monthly Overview */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-2xl p-6 
          border border-blue-500/20"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold bg-clip-text text-transparent 
              bg-gradient-to-r from-blue-400 to-purple-400">Monthly Overview</h2>
            <p className="text-gray-400">March 2024</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 
              transition-colors duration-300">
              <FaChevronLeft className="text-gray-400" />
            </button>
            <button className="p-2 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 
              transition-colors duration-300">
              <FaChevronRight className="text-gray-400" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              title: "Tests & Quizzes",
              count: "5",
              completed: "2",
              icon: <FaFileAlt className="text-blue-400" />
            },
            {
              title: "Lab Sessions",
              count: "4",
              completed: "1",
              icon: <FaFlask className="text-purple-400" />
            },
            {
              title: "Assignments",
              count: "8",
              completed: "5",
              icon: <FaTasks className="text-green-400" />
            },
            {
              title: "Events",
              count: "3",
              completed: "1",
              icon: <FaCalendarAlt className="text-yellow-400" />
            }
          ].map((item, index) => (
            <div key={index} 
              className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30 
                hover:bg-gray-800/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-gray-700/30">
                  {item.icon}
                </div>
                <p className="text-gray-300 font-medium">{item.title}</p>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">{item.completed}</span>
                <span className="text-gray-400">/ {item.count}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const MessagesSection = () => (
    <div className="space-y-8">
      {/* Quick Stats */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        {[
          {
            title: "Unread Messages",
            count: "2",
            icon: <FaEnvelope />,
            color: "from-blue-500/20 to-cyan-600/20",
            trend: "New"
          },
          {
            title: "Teacher Messages",
            count: "3",
            icon: <FaChalkboardTeacher />,
            color: "from-purple-500/20 to-pink-600/20",
            trend: "View All"
          },
          {
            title: "Study Groups",
            count: "2",
            icon: <FaUserFriends />,
            color: "from-green-500/20 to-emerald-600/20",
            trend: "Active"
          },
          {
            title: "Announcements",
            count: "1",
            icon: <FaBullhorn />,
            color: "from-yellow-500/20 to-orange-600/20",
            trend: "Important"
          }
        ].map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`bg-gradient-to-br ${stat.color} backdrop-blur-sm rounded-2xl p-6 
              hover:scale-105 transition-all duration-300 shadow-xl shadow-gray-900/20 
              border border-gray-700/30 relative overflow-hidden group cursor-pointer`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 
              group-hover:opacity-100 transition-opacity duration-500"/>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <p className="text-gray-400 font-medium text-sm">{stat.title}</p>
                <div className={`text-2xl p-2 rounded-xl bg-white/5`}>
                  {stat.icon}
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold bg-clip-text text-transparent 
                  bg-gradient-to-r from-white to-gray-400">{stat.count}</h3>
              </div>
              <p className="text-blue-400 text-sm mt-2 font-medium">{stat.trend}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Messages List */}
      <motion.div
        variants={itemVariants}
        className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/30 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-800/50 flex justify-between items-center">
          <h2 className="text-xl font-bold bg-clip-text text-transparent 
            bg-gradient-to-r from-white to-gray-400">Messages</h2>
          <button className="px-4 py-2 bg-blue-500/10 rounded-xl hover:bg-blue-500/20 
            transition-all duration-300 text-sm font-medium text-blue-400">
            New Message
          </button>
        </div>
        <div className="divide-y divide-gray-800/50">
          {messages.map((msg, index) => (
            <div key={index} 
              className={`p-6 hover:bg-gray-800/30 transition-colors duration-300 cursor-pointer
                ${msg.unread ? 'bg-blue-500/5' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 
                    flex items-center justify-center text-white font-bold">
                    {msg.avatar}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      {msg.sender}
                      {msg.unread && (
                        <span className="w-2 h-2 rounded-full bg-blue-500"/>
                      )}
                    </h3>
                    <p className="text-gray-400 text-sm">{msg.role}</p>
                  </div>
                </div>
                <span className="text-gray-400 text-sm">{msg.time}</span>
              </div>
              <div className="mt-4">
                <h4 className="text-gray-300 font-medium mb-2">{msg.subject}</h4>
                <p className="text-gray-400">{msg.message}</p>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="px-4 py-2 bg-blue-500/10 rounded-xl hover:bg-blue-500/20 
                  transition-all duration-300 text-sm font-medium text-blue-400">
                  Reply
                </button>
                <button className="px-4 py-2 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 
                  transition-all duration-300 text-sm font-medium text-gray-400">
                  Mark as Read
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          {
            title: "Study Groups",
            description: "Join or create study groups",
            icon: <FaUserFriends className="text-blue-400" />,
            action: "Browse Groups"
          },
          {
            title: "Teacher Consultations",
            description: "Schedule a meeting with teachers",
            icon: <FaChalkboardTeacher className="text-purple-400" />,
            action: "Book Slot"
          },
          {
            title: "Announcements",
            description: "View all school announcements",
            icon: <FaBullhorn className="text-yellow-400" />,
            action: "View All"
          }
        ].map((action, index) => (
          <div key={index} 
            className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/30 
              hover:bg-gray-800/50 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-gray-700/30">
                {action.icon}
              </div>
              <div>
                <h3 className="font-medium text-white">{action.title}</h3>
                <p className="text-sm text-gray-400">{action.description}</p>
              </div>
            </div>
            <button className="w-full px-4 py-2 bg-blue-500/10 rounded-xl hover:bg-blue-500/20 
              transition-all duration-300 text-sm font-medium text-blue-400">
              {action.action}
            </button>
          </div>
        ))}
      </motion.div>
    </div>
  );

  // Update renderSection to include MessagesSection
  const renderSection = () => {
    switch(activeSection) {
      case 'overview':
        return <OverviewSection />;
      case 'courses':
        return <CoursesSection />;
      case 'assignments':
        return <AssignmentsSection />;
      case 'grades':
        return <GradesSection />;
      case 'resources':
        return <ResourcesSection />;
      case 'calendar':
        return <CalendarSection />;
      case 'messages':
        return <MessagesSection />;
      case 'settings':
        return <div>Settings section coming soon...</div>;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="min-h-screen bg-[#0A0A0F] bg-gradient-to-br from-gray-900 to-black text-white flex"
    >
      {/* Sidebar - Neuralink Style */}
      <motion.div
        variants={itemVariants}
        className="w-72 bg-gray-900/50 backdrop-blur-lg h-screen fixed left-0 top-0 
          border-r border-gray-800/30 shadow-xl overflow-y-auto"
      >
        <div className="flex items-center gap-4 px-6 py-8 mb-6 border-b border-gray-800/30">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 
            flex items-center justify-center border border-blue-400/20 group-hover:border-blue-400/40 
            transition-all duration-300">
            <FaUserGraduate className="text-2xl text-blue-400" />
          </div>
          <div>
            <h3 className="font-bold text-lg bg-clip-text text-transparent 
              bg-gradient-to-r from-blue-400 to-purple-400">EduSphere</h3>
            <p className="text-sm text-gray-400">Student Portal</p>
          </div>
        </div>

        <nav className="space-y-1 px-2">
          {[
            { id: 'overview', icon: FaChartBar, label: 'Dashboard' },
            { id: 'courses', icon: FaLaptopCode, label: 'My Courses' },
            { id: 'assignments', icon: FaTasks, label: 'Assignments' },
            { id: 'grades', icon: FaChartLine, label: 'Grades' },
            { id: 'resources', icon: FaBook, label: 'Resources' },
            { id: 'calendar', icon: FaCalendarAlt, label: 'Calendar' },
            { id: 'messages', icon: FaComments, label: 'Messages' },
            { id: 'settings', icon: FaCog, label: 'Settings' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-200 
                ${activeSection === item.id 
                  ? 'bg-blue-600/80 text-white shadow-lg shadow-blue-500/20' 
                  : 'hover:bg-[#2A2C3E] text-gray-300 hover:text-white'}`}
            >
              <item.icon className={`text-xl transition-transform duration-200 ${
                activeSection === item.id ? 'transform scale-110' : ''
              }`} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </motion.div>

      {/* Main Content Area */}
      <div className="flex-1 ml-72">
        <div className="max-w-7xl mx-auto px-8 py-6">
          {renderSection()}
        </div>
      </div>
    </motion.div>
  )
}

// Add this to your CSS/Tailwind
const customStyles = `
  @keyframes grid-flow {
    0% { transform: translateY(0); }
    100% { transform: translateY(-50%); }
  }
  
  .animate-grid-flow {
    animation: grid-flow 20s linear infinite;
  }
  
  .bg-grid {
    background-size: 30px 30px;
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  }
`

export default StudentDashboard 