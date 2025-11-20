import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import JobListings from './pages/JobListings'
import Applicants from './pages/Applicants'
import AdminDashboard from './pages/AdminDashboard'
import CandidateManagement from './pages/CandidateManagement'
import RecruiterManagement from './pages/RecruiterManagement'
import ReportsAnalytics from './pages/ReportsAnalytics'
import AuditLog from './pages/AuditLog'
import AIStatus from './pages/AIStatus'
import SystemConfiguration from './pages/SystemConfiguration'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jobs" element={<JobListings />} />
        <Route path="/applicants" element={<Applicants />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/candidates" element={<CandidateManagement />} />
        <Route path="/recruiters" element={<RecruiterManagement />} />
        <Route path="/reports" element={<ReportsAnalytics />} />
        <Route path="/logs" element={<AuditLog />} />
        <Route path="/ai-status" element={<AIStatus />} />
        <Route path="/config" element={<SystemConfiguration />} />
      </Routes>
    </Layout>
  )
}

export default App

