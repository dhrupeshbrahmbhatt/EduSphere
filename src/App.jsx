import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AIMentor from './pages/AIMentor'
import TeacherDashboard from './pages/TeacherDashboard'
// import Resources from './pages/Resources'
// import Attendance from './pages/Attendance'

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ai-mentor" element={<AIMentor />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
