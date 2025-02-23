import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AIMentor from './pages/AIMentor'
import TeacherDashboard from './pages/TeacherDashboard'

import About from './pages/About'

import Login from './pages/Login'
import Signup from './pages/Signup'
// import Resources from './pages/Resources'
// import Attendance from './pages/Attendance'
import ProtectedRoute from './components/ProtectedRoute'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ai-mentor" element={<AIMentor />} />
      <Route path="/teacher-dashboard" element={<ProtectedRoute><TeacherDashboard /></ProtectedRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<TeacherDashboard />} />
    </Routes>
  )
}

export default App