import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaUserGraduate, FaSearch, FaFilter, FaSortAmountDown, FaEllipsisV, 
         FaEnvelope, FaPhone, FaCalendarAlt, FaBookReader, FaChartLine } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function TotalStudents() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGrade, setSelectedGrade] = useState('all')

  // Mock student data
  const students = [
    {
      id: 1,
      name: "Elon Musk Jr.",
      grade: "12th",
      avatar: null,
      email: "elon.jr@example.com",
      phone: "(555) 123-4567",
      attendance: "98%",
      performance: "A+",
      enrollmentDate: "2023-09-01",
      subjects: ["Advanced Physics", "Robotics", "Space Engineering"],
      recentGrades: [100, 98, 99]
    },
    {
      id: 2,
      name: "Ada Lovelace II",
      grade: "11th",
      avatar: null,
      email: "ada.l@example.com",
      phone: "(555) 234-5678",
      attendance: "96%",
      performance: "A+",
      enrollmentDate: "2023-09-01",
      subjects: ["Computer Science", "Advanced Mathematics", "AI Fundamentals"],
      recentGrades: [99, 98, 100]
    },
    {
      id: 3,
      name: "Mark Quantum",
      grade: "12th",
      avatar: null,
      email: "mark.q@example.com",
      phone: "(555) 345-6789",
      attendance: "95%",
      performance: "A",
      enrollmentDate: "2023-09-01",
      subjects: ["Quantum Computing", "Data Science", "Virtual Reality"],
      recentGrades: [95, 92, 94]
    },
    {
      id: 4,
      name: "Lisa Neural",
      grade: "10th",
      avatar: null,
      email: "lisa.n@example.com",
      phone: "(555) 456-7890",
      attendance: "97%",
      performance: "A+",
      enrollmentDate: "2023-09-01",
      subjects: ["Neural Networks", "Machine Learning", "Statistics"],
      recentGrades: [98, 99, 97]
    },
    {
      id: 5,
      name: "Steve Binary",
      grade: "11th",
      avatar: null,
      email: "steve.b@example.com",
      phone: "(555) 567-8901",
      attendance: "94%",
      performance: "A",
      enrollmentDate: "2023-09-01",
      subjects: ["Software Engineering", "Cybersecurity", "Blockchain"],
      recentGrades: [92, 95, 94]
    },
    {
      id: 6,
      name: "Satya Quantum",
      grade: "12th",
      avatar: null,
      email: "satya.q@example.com",
      phone: "(555) 678-9012",
      attendance: "96%",
      performance: "A",
      enrollmentDate: "2023-09-01",
      subjects: ["Cloud Computing", "Business Intelligence", "Leadership"],
      recentGrades: [94, 96, 93]
    },
    {
      id: 7,
      name: "Grace Cyber",
      grade: "10th",
      avatar: null,
      email: "grace.c@example.com",
      phone: "(555) 789-0123",
      attendance: "98%",
      performance: "A+",
      enrollmentDate: "2023-09-01",
      subjects: ["Ethical Hacking", "Network Security", "Cryptography"],
      recentGrades: [100, 97, 99]
    },
    {
      id: 8,
      name: "Tim Protocol",
      grade: "11th",
      avatar: null,
      email: "tim.p@example.com",
      phone: "(555) 890-1234",
      attendance: "95%",
      performance: "A",
      enrollmentDate: "2023-09-01",
      subjects: ["Web Development", "Internet Protocols", "UX Design"],
      recentGrades: [93, 94, 95]
    },
    {
      id: 9,
      name: "Sundar Code",
      grade: "12th",
      avatar: null,
      email: "sundar.c@example.com",
      phone: "(555) 901-2345",
      attendance: "97%",
      performance: "A+",
      enrollmentDate: "2023-09-01",
      subjects: ["Mobile Development", "Cloud Architecture", "AI Ethics"],
      recentGrades: [98, 96, 99]
    },
    {
      id: 10,
      name: "Jeff Data",
      grade: "10th",
      avatar: null,
      email: "jeff.d@example.com",
      phone: "(555) 012-3456",
      attendance: "96%",
      performance: "A",
      enrollmentDate: "2023-09-01",
      subjects: ["Big Data", "E-commerce", "Business Analytics"],
      recentGrades: [95, 93, 96]
    },
    {
      id: 11,
      name: "Bill Gateway",
      grade: "11th",
      avatar: null,
      email: "bill.g@example.com",
      phone: "(555) 123-4567",
      attendance: "98%",
      performance: "A+",
      enrollmentDate: "2023-09-01",
      subjects: ["Operating Systems", "Software Architecture", "Innovation"],
      recentGrades: [99, 98, 97]
    },
    {
      id: 12,
      name: "Larry Engine",
      grade: "12th",
      avatar: null,
      email: "larry.e@example.com",
      phone: "(555) 234-5678",
      attendance: "97%",
      performance: "A+",
      enrollmentDate: "2023-09-01",
      subjects: ["Search Algorithms", "Data Mining", "Digital Marketing"],
      recentGrades: [97, 99, 98]
    }
  ]

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGrade = selectedGrade === 'all' || student.grade === selectedGrade
    return matchesSearch && matchesGrade
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-[#1a1c2e] to-[#0f1117] text-white p-8"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Total Students</h1>
            <p className="text-gray-400">Manage and view all student information</p>
          </div>
          <button
            onClick={() => navigate('/teacher-dashboard')}
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Grades</option>
              <option value="10th">10th Grade</option>
              <option value="11th">11th Grade</option>
              <option value="12th">12th Grade</option>
            </select>
            <button className="bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 flex items-center gap-2">
              <FaFilter />
              <span>More Filters</span>
            </button>
            <button className="bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 flex items-center gap-2">
              <FaSortAmountDown />
              <span>Sort</span>
            </button>
          </div>
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <motion.div
              key={student.id}
              variants={itemVariants}
              className="bg-gradient-to-br from-gray-800/50 via-indigo-900/20 to-purple-900/20 
                backdrop-blur-sm rounded-xl p-6 border border-indigo-500/20 
                hover:border-indigo-500/40 hover:from-gray-800/60 hover:via-indigo-900/30 
                hover:to-purple-900/30 transition-all shadow-xl shadow-black/20"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 
                    border border-indigo-500/20 flex items-center justify-center">
                    <FaUserGraduate className="text-2xl text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{student.name}</h3>
                    <p className="text-indigo-300/80">{student.grade} Grade</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-indigo-500/20 rounded-lg transition-colors">
                  <FaEllipsisV className="text-indigo-400" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-indigo-200/90">
                  <FaEnvelope className="text-indigo-400" />
                  <span>{student.email}</span>
                </div>
                <div className="flex items-center gap-2 text-indigo-200/90">
                  <FaPhone className="text-indigo-400" />
                  <span>{student.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-indigo-200/90">
                  <FaCalendarAlt className="text-indigo-400" />
                  <span>Enrolled: {new Date(student.enrollmentDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-indigo-500/20">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <FaBookReader className="text-indigo-400" />
                    <span className="text-indigo-200/90">Subjects</span>
                  </div>
                  <span className="text-indigo-300">{student.subjects.length}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {student.subjects.map((subject, index) => (
                    <span
                      key={index}
                      className="text-xs bg-indigo-500/10 border border-indigo-500/20 
                        px-2 py-1 rounded-full text-indigo-300"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-indigo-500/20">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <FaChartLine className="text-indigo-400" />
                    <span className="text-indigo-200/90">Performance</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-sm border ${
                    student.performance.includes('A') 
                      ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                    student.performance.includes('B') 
                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                    'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                  }`}>
                    {student.performance}
                  </span>
                </div>
                <div className="mt-2 flex gap-2">
                  {student.recentGrades.map((grade, index) => (
                    <div
                      key={index}
                      className="flex-1 bg-indigo-500/10 border border-indigo-500/20 
                        rounded-lg p-2 text-center"
                    >
                      <span className="text-sm text-indigo-300">Test {index + 1}</span>
                      <p className="text-white font-semibold">{grade}%</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default TotalStudents 