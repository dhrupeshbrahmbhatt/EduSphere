import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FaChalkboardTeacher, FaUserGraduate, FaBook, FaChartBar,
  FaTasks, FaFolder, FaComments, FaCog, FaCalendarAlt,
  FaUserCheck, FaBell, FaVideo, FaFileAlt, FaRobot,
  FaBrain, FaChartLine, FaUsers,
  FaLaptopCode, FaGraduationCap, FaClock, FaCheckCircle,
  FaExclamationCircle, FaDownload, FaLock
} from 'react-icons/fa'

function TeacherDashboard() {
  const [activeSection, setActiveSection] = useState('overview')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
      offset: 100
    })
  }, [])

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

  // Mock data
  const quickStats = [
    { title: "Total Students", value: "150", icon: <FaUsers />, color: "blue" },
    { title: "Average Attendance", value: "92%", icon: <FaUserCheck />, color: "green" },
    { title: "Active Assignments", value: "8", icon: <FaTasks />, color: "purple" },
    { title: "Upcoming Tests", value: "3", icon: <FaFileAlt />, color: "yellow" }
  ]

  const todaySchedule = [
    {
      time: "09:00 AM",
      subject: "Mathematics",
      class: "Grade 10-A",
      topic: "Quadratic Equations",
      status: "Completed"
    },
    {
      time: "11:00 AM",
      subject: "Physics",
      class: "Grade 11-B",
      topic: "Quantum Mechanics",
      status: "In Progress"
    },
    {
      time: "02:00 PM",
      subject: "Chemistry",
      class: "Grade 10-C",
      topic: "Organic Chemistry",
      status: "Upcoming"
    }
  ]

  const recentActivities = [
    {
      type: "assignment",
      title: "Physics Quiz Submitted",
      student: "John Doe",
      time: "10 minutes ago",
      icon: <FaFileAlt className="text-blue-500" />
    },
    {
      type: "attendance",
      title: "Marked Attendance",
      student: "Class 10-A",
      time: "30 minutes ago",
      icon: <FaUserCheck className="text-green-500" />
    },
    {
      type: "message",
      title: "New Parent Message",
      student: "Emma's Parent",
      time: "1 hour ago",
      icon: <FaComments className="text-purple-500" />
    }
  ]

  const gradientColors = {
    blue: 'from-blue-500/20 to-blue-600/20',
    green: 'from-green-500/20 to-green-600/20',
    purple: 'from-purple-500/20 to-purple-600/20',
    yellow: 'from-yellow-500/20 to-yellow-600/20'
  }

  const OverviewSection = () => (
    <div className="space-y-8">
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`bg-gradient-to-br ${gradientColors[stat.color]} backdrop-blur-sm rounded-xl p-6 
              hover:scale-105 transition-all duration-300 shadow-xl shadow-gray-900/20 border border-gray-700/30`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 font-medium">{stat.title}</p>
                <h3 className="text-3xl font-bold mt-2 text-white">{stat.value}</h3>
              </div>
              <div className={`text-3xl text-${stat.color}-400 bg-${stat.color}-500/10 p-3 rounded-lg`}>
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Schedule Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 shadow-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <FaCalendarAlt className="text-blue-400" />
              Today's Schedule
            </h2>
            <button className="bg-blue-500/10 text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-500/20 transition-all">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {todaySchedule.map((session, index) => (
              <div 
                key={index} 
                className="bg-gray-700/30 rounded-lg p-4 hover:bg-gray-700/50 transition-all border border-gray-600/20"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">{session.subject}</h3>
                    <p className="text-gray-400">{session.class} - {session.topic}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-blue-400 font-medium">{session.time}</div>
                    <div className={`text-sm px-3 py-1 rounded-full inline-block mt-1 ${
                      session.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                      session.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {session.status}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          variants={itemVariants}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 shadow-xl"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <FaBell className="text-purple-400" />
            Recent Activities
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="group flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-700/30 transition-all"
              >
                <div className="p-2 rounded-lg bg-gray-700/30 group-hover:scale-110 transition-all">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-200">{activity.title}</h3>
                  <p className="text-sm text-gray-400">{activity.student}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )

  const AttendanceSection = () => (
    <div className="space-y-8">
      <motion.div
        variants={itemVariants}
        className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Today's Attendance</h2>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center">
            <FaRobot className="mr-2" /> Auto-Mark with AI
          </button>
        </div>
        <div className="space-y-4">
          {[
            { name: "Grade 10-A", present: 28, total: 30, time: "09:00 AM" },
            { name: "Grade 11-B", present: 25, total: 27, time: "10:30 AM" },
            { name: "Grade 9-C", present: 22, total: 24, time: "02:00 PM" }
          ].map((classData, index) => (
            <div key={index} className="bg-gray-700/50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{classData.name}</h3>
                  <p className="text-gray-400">{classData.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-400">
                    {classData.present}/{classData.total}
                  </p>
                  <p className="text-sm text-gray-400">
                    {Math.round((classData.present/classData.total) * 100)}% Present
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Attendance Trends */}
      <motion.div
        variants={itemVariants}
        className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6"
      >
        <h2 className="text-2xl font-bold mb-6">Attendance Trends</h2>
        <div className="h-64 bg-gray-700/50 rounded-lg p-4">
          {/* Placeholder for attendance graph */}
          <div className="text-center text-gray-400">
            Attendance graph visualization would go here
          </div>
        </div>
      </motion.div>
    </div>
  )

  const LessonPlannerSection = () => (
    <div className="space-y-8">
      <motion.div
        variants={itemVariants}
        className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Lesson Plans</h2>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
            Create New Plan
          </button>
        </div>
        <div className="space-y-4">
          {[
            {
              subject: "Mathematics",
              topic: "Quadratic Equations",
              resources: ["PDF", "Video", "Quiz"],
              status: "Ready"
            },
            {
              subject: "Physics",
              topic: "Wave Motion",
              resources: ["Simulation", "PDF"],
              status: "Draft"
            }
          ].map((plan, index) => (
            <div key={index} className="bg-gray-700/50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{plan.subject}</h3>
                  <p className="text-gray-400">{plan.topic}</p>
                  <div className="flex gap-2 mt-2">
                    {plan.resources.map((resource, i) => (
                      <span key={i} className="text-xs bg-gray-600 px-2 py-1 rounded">
                        {resource}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    plan.status === 'Ready' ? 'bg-green-500/20 text-green-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {plan.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* AI Recommendations */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-6"
      >
        <div className="flex items-center mb-6">
          <FaRobot className="text-3xl text-blue-500 mr-4" />
          <div>
            <h2 className="text-2xl font-bold">AI Teaching Assistant</h2>
            <p className="text-gray-400">Get personalized lesson improvement suggestions</p>
          </div>
        </div>
        <div className="space-y-4">
          {[
            "Consider adding interactive elements to the Quadratic Equations lesson",
            "Students might benefit from real-world physics examples",
            "Recommended: Include a pre-assessment quiz"
          ].map((suggestion, index) => (
            <div key={index} className="bg-gray-800/50 rounded-lg p-4 flex items-center">
              <FaBrain className="text-blue-500 mr-3" />
              <p>{suggestion}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )

  const StudentPerformanceSection = () => (
    <div className="space-y-8">
      <motion.div
        variants={itemVariants}
        className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6"
      >
        <h2 className="text-2xl font-bold mb-6">Class Performance Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Class Average", value: "78%", trend: "↑ 3%" },
            { label: "Completion Rate", value: "92%", trend: "↑ 5%" },
            { label: "Engagement Score", value: "85%", trend: "↑ 2%" }
          ].map((metric, index) => (
            <div key={index} className="bg-gray-700/50 rounded-lg p-4">
              <p className="text-gray-400">{metric.label}</p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold">{metric.value}</span>
                <span className="text-green-400">{metric.trend}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Individual Student Performance */}
      <motion.div
        variants={itemVariants}
        className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6"
      >
        <h2 className="text-2xl font-bold mb-6">Student Progress</h2>
        <div className="space-y-4">
          {[
            { name: "John Doe", performance: 92, trend: "positive" },
            { name: "Jane Smith", performance: 88, trend: "stable" },
            { name: "Mike Johnson", performance: 75, trend: "negative" }
          ].map((student, index) => (
            <div key={index} className="bg-gray-700/50 rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{student.name}</h3>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-gray-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${student.performance}%` }}
                    ></div>
                  </div>
                  <span>{student.performance}%</span>
                </div>
              </div>
              <span className={`text-2xl ${
                student.trend === 'positive' ? 'text-green-400' :
                student.trend === 'negative' ? 'text-red-400' :
                'text-yellow-400'
              }`}>
                {student.trend === 'positive' ? '↑' : student.trend === 'negative' ? '↓' : '→'}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )

  const AssignmentsSection = () => (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
      <h2 className="text-2xl font-bold">Assignments</h2>
      <p className="text-gray-400">Assignments section coming soon...</p>
    </div>
  )

  const ResourceLibrarySection = () => (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
      <h2 className="text-2xl font-bold">Resource Library</h2>
      <p className="text-gray-400">Resource library section coming soon...</p>
    </div>
  )

  const CommunicationSection = () => (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
      <h2 className="text-2xl font-bold">Communication</h2>
      <p className="text-gray-400">Communication section coming soon...</p>
    </div>
  )

  const AnalyticsSection = () => (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
      <h2 className="text-2xl font-bold">Analytics</h2>
      <p className="text-gray-400">Analytics section coming soon...</p>
    </div>
  )

  const SettingsSection = () => (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
      <h2 className="text-2xl font-bold">Settings</h2>
      <p className="text-gray-400">Settings section coming soon...</p>
    </div>
  )

  const renderSection = () => {
    switch(activeSection) {
      case 'overview':
        return <OverviewSection />;
      case 'attendance':
        return <AttendanceSection />;
      case 'lessons':
        return <LessonPlannerSection />;
      case 'performance':
        return <StudentPerformanceSection />;
      case 'assignments':
        return <AssignmentsSection />;
      case 'resources':
        return <ResourceLibrarySection />;
      case 'communication':
        return <CommunicationSection />;
      case 'analytics':
        return <AnalyticsSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white"
    >
      {/* Hero Section */}
      <motion.section
        variants={itemVariants}
        className="h-[40vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
        <div data-aos="fade-up" data-aos-delay="200">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Teacher Dashboard
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-8">
            Empowering Education Through AI-Enhanced Teaching Tools
          </p>
        </div>
      </motion.section>

      {/* Main Dashboard Layout */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <motion.div
            variants={itemVariants}
            className="md:w-72 bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 h-[calc(100vh-12rem)] sticky top-8 
              border border-gray-700/30 shadow-xl"
          >
            <div className="flex items-center gap-3 px-4 py-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 
                flex items-center justify-center border border-blue-400/20">
                <FaChalkboardTeacher className="text-2xl text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Teacher Portal</h3>
                <p className="text-sm text-gray-400">Dashboard & Tools</p>
              </div>
            </div>

            <nav className="space-y-1 px-2">
              {[
                { id: 'overview', label: 'Overview', icon: <FaChalkboardTeacher /> },
                { id: 'attendance', label: 'Attendance', icon: <FaUserCheck /> },
                { id: 'lessons', label: 'Lesson Planner', icon: <FaBook /> },
                { id: 'performance', label: 'Student Performance', icon: <FaChartBar /> },
                { id: 'assignments', label: 'Assignments', icon: <FaTasks /> },
                { id: 'resources', label: 'Resource Library', icon: <FaFolder /> },
                { id: 'communication', label: 'Communication', icon: <FaComments /> },
                { id: 'analytics', label: 'Analytics', icon: <FaChartLine /> },
                { id: 'settings', label: 'Settings', icon: <FaCog /> }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-200 
                    ${activeSection === item.id 
                      ? 'bg-blue-600/80 text-white shadow-lg shadow-blue-500/20' 
                      : 'hover:bg-gray-700/50 text-gray-300 hover:text-white'}`}
                >
                  <span className={`text-xl transition-transform duration-200 ${
                    activeSection === item.id ? 'transform scale-110' : ''
                  }`}>
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </motion.div>

          {/* Main Content Area */}
          <div className="flex-1 min-h-[calc(100vh-12rem)]">
            {renderSection()}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default TeacherDashboard 