import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AIMentor from './pages/AIMentor'
import TeacherDashboard from './pages/TeacherDashboard'
import StudentDashboard from './pages/StudentDashboard'

import About from './pages/About'

import Login from './pages/Login'
import Signup from './pages/Signup'
// import Resources from './pages/Resources'
// import Attendance from './pages/Attendance'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai-mentor" element={<AIMentor />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
      </Routes>
    </div>
  )
}

export default App