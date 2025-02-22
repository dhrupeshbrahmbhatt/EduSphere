import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AIMentor from './pages/AIMentor'
<<<<<<< HEAD
import TeacherDashboard from './pages/TeacherDashboard'
// import Attendance from './pages/Attendance'
// import Resources from './pages/Resources'
// import Analytics from './pages/Analytics'
// import Rewards from './pages/Rewards'
// import ARLessons from './pages/ARLessons'
=======
import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'
>>>>>>> origin/main

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ai-mentor" element={<AIMentor />} />
<<<<<<< HEAD
            <Route path="/TeacherDashboard" element={<TeacherDashboard />} />
            {/* <Route path="/attendance" element={<Attendance />} /> */}
            {/* <Route path="/resources" element={<Resources />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/rewards" element={<Rewards />} /> */}
=======
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
>>>>>>> origin/main
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
