import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AIMentor from './pages/AIMentor'
import TeacherDashboard from './pages/TeacherDashboard'
<<<<<<< HEAD
import About from './pages/About'
=======
>>>>>>> 8a851b1e8eceb6d800833f62a99cf3d726dd6846
import Login from './pages/Login'
import Signup from './pages/Signup'
// import Resources from './pages/Resources'
// import Attendance from './pages/Attendance'


function App() {
  return (
    <Router>
<<<<<<< HEAD
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ai-mentor" element={<AIMentor />} />
           
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
=======
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ai-mentor" element={<AIMentor />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<TeacherDashboard />} />
        </Routes>
>>>>>>> 8a851b1e8eceb6d800833f62a99cf3d726dd6846
      </div>
    </Router>
  )
}

export default App