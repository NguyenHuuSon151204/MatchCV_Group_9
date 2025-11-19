import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import JobListings from './pages/JobListings'
import Applicants from './pages/Applicants'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jobs" element={<JobListings />} />
        <Route path="/applicants" element={<Applicants />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Layout>
  )
}

export default App

