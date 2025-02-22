import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FaChalkboardTeacher, FaUserGraduate, FaBook, FaChartBar,
  FaTasks, FaFolder, FaComments, FaCog, FaCalendarAlt,
  FaUserCheck, FaBell, FaVideo, FaFileAlt, FaRobot,
  FaBrain, FaChartLine, FaUsers, FaBookOpen,
  FaLaptopCode, FaGraduationCap, FaClock, FaCheckCircle,
  FaExclamationCircle, FaDownload, FaLock, FaUpload, FaHistory, FaEye, FaTrash,
  FaSearch, FaFilter, FaPlus, FaFile, FaImage, FaFilePdf,
  FaEnvelope, FaBullhorn, FaPaperPlane, FaUserCircle, FaEllipsisV
} from 'react-icons/fa'
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts'

function TeacherDashboard() {
  const [activeSection, setActiveSection] = useState('overview')
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('upload')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [newResource, setNewResource] = useState({
    title: '',
    category: 'documents',
    tags: '',
    file: null
  })
  const messagesEndRef = useRef(null)
  
  const [messages, setMessages] = useState({
    1: [ // Parent - John Smith
      { id: 1, text: "Hello! I need to discuss my child's homework", sender: "them", time: "2:25 PM" },
      { id: 2, text: "Of course! How can I help you today?", sender: "me", time: "2:30 PM" },
      { id: 3, text: "I wanted to discuss the recent homework assignment.", sender: "them", time: "2:31 PM" },
    ],
    2: [ // Mrs. Williams
      { id: 1, text: "Don't forget about tomorrow's staff meeting", sender: "them", time: "1:00 PM" },
      { id: 2, text: "Thanks for the reminder! I'll be there", sender: "me", time: "1:05 PM" },
    ],
    3: [ // Principal Johnson
      { id: 1, text: "Please review the monthly report", sender: "them", time: "11:30 AM" },
      { id: 2, text: "I'll look at it right away", sender: "me", time: "11:35 AM" },
    ],
  })

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

  const assignmentHistory = [
    {
      id: 1,
      title: "Mathematics Assignment 1",
      class: "Grade 10-A",
      dueDate: "2024-03-25",
      submissions: 28,
      totalStudents: 30,
      status: "Active",
      uploadDate: "2024-03-18"
    },
    {
      id: 2,
      title: "Physics Lab Report",
      class: "Grade 11-B",
      dueDate: "2024-03-20",
      submissions: 25,
      totalStudents: 27,
      status: "Completed",
      uploadDate: "2024-03-13"
    },
    // Add more assignments as needed
  ]

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setNewResource(prev => ({ ...prev, file }))
      setIsUploading(true)
      // Simulate upload progress
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        setUploadProgress(progress)
        if (progress >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setUploadProgress(0)
        }
      }, 300)
    }
  }

  const handleSubmitResource = (e) => {
    e.preventDefault()
    // Here you would typically handle the actual upload to your backend
    const newResourceObj = {
      id: resources.length + 1,
      title: newResource.title,
      type: newResource.file?.type.includes('pdf') ? 'pdf' : 
            newResource.file?.type.includes('video') ? 'video' : 
            newResource.file?.type.includes('image') ? 'image' : 'document',
      category: newResource.category,
      size: `${(newResource.file?.size / (1024 * 1024)).toFixed(1)} MB`,
      uploadedAt: new Date().toISOString(),
      downloads: 0,
      tags: newResource.tags.split(',').map(tag => tag.trim())
    }

    setResources(prev => [...prev, newResourceObj])
    setIsUploadModalOpen(false)
    setNewResource({
      title: '',
      category: 'documents',
      tags: '',
      file: null
    })
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

  const AssignmentsSection = () => {
    return (
      <div className="space-y-6">
        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all
              ${activeTab === 'upload' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'}`}
          >
            <FaUpload />
            <span>Upload Assignment</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all
              ${activeTab === 'history' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'}`}
          >
            <FaHistory />
            <span>Assignment History</span>
          </button>
        </div>

        {/* Upload Section */}
        {activeTab === 'upload' && (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
            <h2 className="text-2xl font-bold mb-6">Upload New Assignment</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Assignment Title
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500"
                  placeholder="Enter assignment title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Class
                </label>
                <select className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500">
                  <option>Grade 10-A</option>
                  <option>Grade 10-B</option>
                  <option>Grade 11-A</option>
                  <option>Grade 11-B</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Assignment File
                </label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="assignment-file"
                  />
                  <label
                    htmlFor="assignment-file"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <FaUpload className="text-3xl text-gray-400 mb-2" />
                    <span className="text-gray-400">Click to upload or drag and drop</span>
                    <span className="text-sm text-gray-500">PDF, DOCX, or ZIP (max 10MB)</span>
                  </label>
                </div>
              </div>

              {isUploading && (
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}

              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition-colors">
                Upload Assignment
              </button>
            </div>
          </div>
        )}

        {/* History Section */}
        {activeTab === 'history' && (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
            <h2 className="text-2xl font-bold mb-6">Assignment History</h2>
            
            <div className="space-y-4">
              {assignmentHistory.map((assignment) => (
                <div
                  key={assignment.id}
                  className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700/70 transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{assignment.title}</h3>
                      <p className="text-gray-400">{assignment.class}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-gray-400">
                          Due: {new Date(assignment.dueDate).toLocaleDateString()}
                        </span>
                        <span className="text-sm text-gray-400">
                          Submissions: {assignment.submissions}/{assignment.totalStudents}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-600 rounded-lg transition-colors">
                        <FaEye className="text-gray-300" />
                      </button>
                      <button className="p-2 hover:bg-gray-600 rounded-lg transition-colors">
                        <FaDownload className="text-gray-300" />
                      </button>
                      <button className="p-2 hover:bg-red-600/30 rounded-lg transition-colors">
                        <FaTrash className="text-red-400" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className={`text-sm px-3 py-1 rounded-full ${
                      assignment.status === 'Active' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-gray-600/20 text-gray-400'
                    }`}>
                      {assignment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  const ResourceLibrarySection = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [resources, setResources] = useState([
      {
        id: 1,
        title: "Mathematics Fundamentals",
        type: "pdf",
        category: "documents",
        size: "2.4 MB",
        uploadedAt: "2024-03-15",
        downloads: 45,
        tags: ["math", "basics"]
      },
      {
        id: 2,
        title: "Physics Lab Demo",
        type: "video",
        category: "videos",
        size: "156 MB",
        uploadedAt: "2024-03-14",
        downloads: 28,
        tags: ["physics", "lab"]
      },
      {
        id: 3,
        title: "Chemistry Diagrams",
        type: "image",
        category: "images",
        size: "5.1 MB",
        uploadedAt: "2024-03-13",
        downloads: 32,
        tags: ["chemistry", "diagrams"]
      },
      // Add more resources as needed
    ]);

    const categories = [
      { id: 'all', label: 'All Files', icon: FaFolder },
      { id: 'documents', label: 'Documents', icon: FaFileAlt },
      { id: 'videos', label: 'Videos', icon: FaVideo },
      { id: 'images', label: 'Images', icon: FaImage },
      { id: 'pdfs', label: 'PDFs', icon: FaFilePdf },
    ];

    const getFileIcon = (type) => {
      switch(type) {
        case 'pdf':
          return <FaFilePdf className="text-red-400" />;
        case 'video':
          return <FaVideo className="text-blue-400" />;
        case 'image':
          return <FaImage className="text-green-400" />;
        default:
          return <FaFile className="text-gray-400" />;
      }
    };

    const filteredResources = resources.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Resource Library</h2>
          <button 
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <FaPlus />
            <span>Upload New Resource</span>
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap transition-all
                  ${selectedCategory === category.id 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'}`}
              >
                <category.icon />
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30 hover:bg-gray-700/50 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-3 bg-gray-700/50 rounded-lg">
                    {getFileIcon(resource.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold">{resource.title}</h3>
                    <p className="text-sm text-gray-400">
                      {resource.size} • {new Date(resource.uploadedAt).toLocaleDateString()}
                    </p>
                    <div className="flex gap-2 mt-2">
                      {resource.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-700/50 px-2 py-1 rounded-full text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-600 rounded-lg transition-colors">
                    <FaDownload className="text-gray-300" />
                  </button>
                  <button className="p-2 hover:bg-red-600/30 rounded-lg transition-colors">
                    <FaTrash className="text-red-400" />
                  </button>
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-400">
                {resource.downloads} downloads
              </div>
            </div>
          ))}
        </div>

        {/* Upload Modal */}
        {isUploadModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md m-4">
              <h3 className="text-xl font-bold mb-4">Upload New Resource</h3>
              <form onSubmit={handleSubmitResource} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Resource Title
                  </label>
                  <input
                    type="text"
                    value={newResource.title}
                    onChange={(e) => setNewResource(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500"
                    placeholder="Enter resource title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={newResource.category}
                    onChange={(e) => setNewResource(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="documents">Documents</option>
                    <option value="videos">Videos</option>
                    <option value="images">Images</option>
                    <option value="pdfs">PDFs</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={newResource.tags}
                    onChange={(e) => setNewResource(prev => ({ ...prev, tags: e.target.value }))}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500"
                    placeholder="math, basics, chapter1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Resource File
                  </label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="resource-file"
                      required
                    />
                    <label
                      htmlFor="resource-file"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <FaUpload className="text-3xl text-gray-400 mb-2" />
                      <span className="text-gray-400">Click to upload or drag and drop</span>
                      <span className="text-sm text-gray-500">PDF, DOCX, MP4, or Images (max 10MB)</span>
                    </label>
                    {newResource.file && (
                      <p className="mt-2 text-sm text-gray-400">{newResource.file.name}</p>
                    )}
                  </div>
                </div>

                {isUploading && (
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsUploadModalOpen(false)}
                    className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors"
                  >
                    Upload Resource
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  const CommunicationSection = () => {
    const [activeTab, setActiveTab] = useState('messages');
    const [newMessage, setNewMessage] = useState('');
    const [selectedContact, setSelectedContact] = useState(null);
    
    const contacts = [
      {
        id: 1,
        name: "Parent - John Smith",
        role: "Parent",
        lastMessage: "Regarding homework submission",
        unread: 2,
        lastActive: "2 hours ago",
        avatar: null
      },
      {
        id: 2,
        name: "Mrs. Williams",
        role: "Teacher",
        lastMessage: "Staff meeting tomorrow",
        unread: 0,
        lastActive: "1 hour ago",
        avatar: null
      },
      {
        id: 3,
        name: "Principal Johnson",
        role: "Admin",
        lastMessage: "Monthly report review",
        unread: 1,
        lastActive: "30 mins ago",
        avatar: null
      }
    ];

    const announcements = [
      {
        id: 1,
        title: "End of Term Exams",
        content: "Final exams will begin next week. Please ensure all grades are submitted by Friday.",
        date: "2024-03-20",
        priority: "high"
      },
      {
        id: 2,
        title: "Parent-Teacher Meeting",
        content: "Annual parent-teacher conference scheduled for next month.",
        date: "2024-03-18",
        priority: "medium"
      },
      {
        id: 3,
        title: "Professional Development Day",
        content: "Workshop on new teaching methodologies this weekend.",
        date: "2024-03-15",
        priority: "normal"
      }
    ];

    const notifications = [
      {
        id: 1,
        type: "message",
        content: "New message from John's parent",
        time: "5 mins ago",
        read: false
      },
      {
        id: 2,
        type: "announcement",
        content: "New school policy update",
        time: "1 hour ago",
        read: true
      },
      {
        id: 3,
        type: "reminder",
        content: "Grade submission deadline tomorrow",
        time: "2 hours ago",
        read: false
      }
    ];

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
      scrollToBottom();
    }, [messages, selectedContact]);

    const handleSendMessage = async (e) => {
      e.preventDefault();
      e.stopPropagation(); // Prevent event bubbling
      
      if (newMessage.trim() && selectedContact) {
        try {
          const newMsg = {
            id: messages[selectedContact.id].length + 1,
            text: newMessage,
            sender: "me",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };

          // Update messages state using functional update to ensure state consistency
          setMessages(prevMessages => ({
            ...prevMessages,
            [selectedContact.id]: [...prevMessages[selectedContact.id], newMsg]
          }));

          // Clear input after successful send
          setNewMessage('');
          
          // Force scroll to bottom after message is sent
          setTimeout(scrollToBottom, 100);
        } catch (error) {
          console.error('Error sending message:', error);
        }
      }
    };

    return (
      <div className="h-[calc(100vh-2rem)] bg-[#15202B] rounded-xl overflow-hidden">
        {/* Tab Navigation - Simplified, X-style */}
        <div className="flex border-b border-gray-800">
          <button
            onClick={() => setActiveTab('messages')}
            className={`flex-1 py-4 relative ${
              activeTab === 'messages' ? 'text-white' : 'text-gray-400'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <FaEnvelope />
              <span>Messages</span>
            </div>
            {activeTab === 'messages' && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-indigo-500 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('announcements')}
            className={`flex-1 py-4 relative ${
              activeTab === 'announcements' ? 'text-white' : 'text-gray-400'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <FaBullhorn />
              <span>Announcements</span>
            </div>
            {activeTab === 'announcements' && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-indigo-500 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex-1 py-4 relative ${
              activeTab === 'notifications' ? 'text-white' : 'text-gray-400'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <FaBell />
              <span>Notifications</span>
            </div>
            {activeTab === 'notifications' && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-indigo-500 rounded-full" />
            )}
          </button>
        </div>

        {/* Messages Section - X-style */}
        {activeTab === 'messages' && (
          <div className="grid grid-cols-3 h-[calc(100%-3.5rem)]">
            {/* Contacts List - Left Sidebar */}
            <div className="border-r border-gray-800 overflow-y-auto">
              <div className="p-4 border-b border-gray-800">
                <h3 className="text-xl font-bold text-white">Messages</h3>
              </div>
              <div>
                {contacts.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className={`w-full p-4 flex items-start gap-3 hover:bg-gray-800/50 transition-colors border-b border-gray-800
                      ${selectedContact?.id === contact.id ? 'bg-gray-800/50' : ''}`}
                  >
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                        <FaUserCircle className="w-8 h-8 text-gray-400" />
                      </div>
                      {contact.unread > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center text-xs font-bold">
                          {contact.unread}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-white">{contact.name}</h4>
                        <span className="text-xs text-gray-500">{contact.lastActive}</span>
                      </div>
                      <p className="text-gray-400 text-sm line-clamp-2">{contact.lastMessage}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area - Main Content */}
            <div className="col-span-2 flex flex-col h-full">
              {selectedContact ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                        <FaUserCircle className="w-7 h-7 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{selectedContact.name}</h3>
                        <p className="text-sm text-gray-400">{selectedContact.role}</p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                      <FaEllipsisV className="text-gray-400" />
                    </button>
                  </div>

                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages[selectedContact.id].map((message) => (
                      <div 
                        key={message.id}
                        className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`rounded-2xl px-4 py-2 max-w-[80%] ${
                            message.sender === 'me' 
                              ? 'bg-indigo-500 text-white rounded-tr-sm' 
                              : 'bg-gray-800 text-white rounded-tl-sm'
                          }`}
                        >
                          <p>{message.text}</p>
                          <span 
                            className={`text-xs mt-1 block ${
                              message.sender === 'me' ? 'text-indigo-200' : 'text-gray-400'
                            }`}
                          >
                            {message.time}
                          </span>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input - Fixed to prevent closing */}
                  <div className="p-4 border-t border-gray-800">
                    <form 
                      onSubmit={handleSendMessage} 
                      className="flex gap-2"
                      onClick={(e) => e.stopPropagation()} // Prevent click from bubbling
                    >
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 bg-gray-800 text-white rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onClick={(e) => e.stopPropagation()} // Prevent click from bubbling
                      />
                      <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className={`p-3 rounded-full transition-colors ${
                          newMessage.trim() 
                            ? 'bg-indigo-500 hover:bg-indigo-600 text-white' 
                            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent click from bubbling
                          handleSendMessage(e);
                        }}
                      >
                        <FaPaperPlane />
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-400">
                  Select a conversation to start messaging
                </div>
              )}
            </div>
          </div>
        )}

        {/* Announcements Section */}
        {activeTab === 'announcements' && (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Announcements</h3>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <FaPlus />
                <span>New Announcement</span>
              </button>
            </div>
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700/70 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{announcement.title}</h4>
                      <p className="text-gray-400 mt-1">{announcement.content}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-sm text-gray-500">
                          {new Date(announcement.date).toLocaleDateString()}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          announcement.priority === 'high' 
                            ? 'bg-red-500/20 text-red-400'
                            : announcement.priority === 'medium'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-green-500/20 text-green-400'
                        }`}>
                          {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)} Priority
                        </span>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-600/50 rounded-lg transition-all">
                      <FaEllipsisV className="text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notifications Section */}
        {activeTab === 'notifications' && (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
            <h3 className="text-lg font-semibold mb-6">Notifications</h3>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg flex items-start gap-3 transition-all
                    ${notification.read ? 'bg-gray-700/30' : 'bg-gray-700/50'}`}
                >
                  <div className={`p-2 rounded-lg ${
                    notification.type === 'message' ? 'bg-blue-500/20 text-blue-400' :
                    notification.type === 'announcement' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {notification.type === 'message' ? <FaEnvelope /> :
                     notification.type === 'announcement' ? <FaBullhorn /> :
                     <FaBell />}
                  </div>
                  <div className="flex-1">
                    <p className={`${notification.read ? 'text-gray-400' : 'text-white'}`}>
                      {notification.content}
                    </p>
                    <span className="text-sm text-gray-500">{notification.time}</span>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  const AnalyticsSection = () => {
    // Sample data for charts
    const performanceData = [
      { month: 'Jan', submissions: 85, attendance: 92, engagement: 78 },
      { month: 'Feb', submissions: 88, attendance: 95, engagement: 82 },
      { month: 'Mar', submissions: 92, attendance: 89, engagement: 85 },
      { month: 'Apr', submissions: 90, attendance: 93, engagement: 88 },
      { month: 'May', submissions: 95, attendance: 96, engagement: 90 },
    ];

    const studentProgress = [
      { grade: 'A', count: 45 },
      { grade: 'B', count: 32 },
      { grade: 'C', count: 18 },
      { grade: 'D', count: 8 },
      { grade: 'F', count: 2 },
    ];

    const quickStats = [
      {
        title: "Total Students",
        value: "105",
        change: "+5%",
        icon: <FaUserGraduate className="text-blue-400" />,
        trend: "up"
      },
      {
        title: "Avg. Attendance",
        value: "93%",
        change: "+2%",
        icon: <FaCheckCircle className="text-green-400" />,
        trend: "up"
      },
      {
        title: "Assignments",
        value: "24",
        change: "+3",
        icon: <FaBookOpen className="text-purple-400" />,
        trend: "up"
      },
      {
        title: "Class Average",
        value: "87%",
        change: "+4%",
        icon: <FaChartLine className="text-indigo-400" />,
        trend: "up"
      }
    ];

    return (
      <div className="space-y-6">
        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <div 
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
                  <span className={`text-sm ${
                    stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {stat.change} from last month
                  </span>
                </div>
                <div className="p-3 bg-gray-700/50 rounded-lg">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Trends */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
            <h3 className="text-lg font-semibold mb-4">Performance Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '0.5rem'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="submissions" 
                  stroke="#6366F1" 
                  strokeWidth={2}
                  dot={{ fill: '#6366F1' }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="attendance" 
                  stroke="#34D399" 
                  strokeWidth={2}
                  dot={{ fill: '#34D399' }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="engagement" 
                  stroke="#F472B6" 
                  strokeWidth={2}
                  dot={{ fill: '#F472B6' }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Grade Distribution */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
            <h3 className="text-lg font-semibold mb-4">Grade Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={studentProgress}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="grade" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '0.5rem'
                  }} 
                />
                <Bar 
                  dataKey="count" 
                  fill="#6366F1"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Engagement Overview */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Engagement Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '0.5rem'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="engagement" 
                  stroke="#6366F1" 
                  fill="#6366F1" 
                  fillOpacity={0.2} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
            <h3 className="text-lg font-semibold mb-4">Top Performing Students</h3>
            <div className="space-y-4">
              {[
                { name: "Alice Johnson", score: 98, trend: "up" },
                { name: "Bob Smith", score: 95, trend: "up" },
                { name: "Carol White", score: 93, trend: "down" },
              ].map((student, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                      <FaUserGraduate className="text-gray-400" />
                    </div>
                    <span className="text-white">{student.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">{student.score}%</span>
                    <span className={student.trend === 'up' ? 'text-green-400' : 'text-red-400'}>
                      {student.trend === 'up' ? '↑' : '↓'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
            <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {[
                { action: "Assignment Submitted", time: "5 mins ago", type: "submission" },
                { action: "Attendance Marked", time: "1 hour ago", type: "attendance" },
                { action: "Grade Updated", time: "2 hours ago", type: "grade" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'submission' ? 'bg-green-400' :
                      activity.type === 'attendance' ? 'bg-blue-400' :
                      'bg-purple-400'
                    }`} />
                    <span className="text-white">{activity.action}</span>
                  </div>
                  <span className="text-gray-400 text-sm">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

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
      className="min-h-screen bg-gradient-to-br from-[#1a1c2e] to-[#0f1117] text-white flex"
    >
      {/* Sidebar Navigation */}
      <motion.div
        variants={itemVariants}
        className="w-72 bg-[#1E1F2E]/50 backdrop-blur-sm h-screen fixed left-0 top-0 
          border-r border-gray-800/30 shadow-xl overflow-y-auto"
      >
        <div className="flex items-center gap-3 px-4 py-6 mb-6 border-b border-gray-800/30">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 
            flex items-center justify-center border border-indigo-400/20">
            <FaChalkboardTeacher className="text-2xl text-indigo-400" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">EduSphere</h3>
            <p className="text-sm text-gray-400">Teacher Portal</p>
          </div>
        </div>

        <nav className="space-y-1 px-2">
          {[
            { id: 'overview', icon: FaChartBar, label: 'Overview' },
            { id: 'analytics', icon: FaChartLine, label: 'Analytics' },
            { id: 'attendance', icon: FaUserCheck, label: 'Attendance' },
            { id: 'assignments', icon: FaTasks, label: 'Assignments' },
            { id: 'resources', icon: FaFolder, label: 'Resources' },
            { id: 'communication', icon: FaComments, label: 'Communication' },
            { id: 'settings', icon: FaCog, label: 'Settings' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-200 
                ${activeSection === item.id 
                  ? 'bg-indigo-600/80 text-white shadow-lg shadow-indigo-500/20' 
                  : 'hover:bg-[#2A2C3E] text-gray-300 hover:text-white'}`}
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
      <div className="flex-1 ml-72">
        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto px-8 py-6">
          {renderSection()}
        </div>
      </div>
    </motion.div>
  )
}

export default TeacherDashboard 