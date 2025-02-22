import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AIMentor from './pages/AIMentor'
import Attendance from './pages/Attendance'
import Resources from './pages/Resources'
import Analytics from './pages/Analytics'
import Rewards from './pages/Rewards'
import ARLessons from './pages/ARLessons'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ai-mentor" element={<AIMentor />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/rewards" element={<Rewards />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
