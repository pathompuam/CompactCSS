import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Compact from './pages/home/Compact'
import About from './pages/home/About'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Compact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  )
}

export default App
