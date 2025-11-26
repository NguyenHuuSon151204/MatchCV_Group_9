import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import JobManagement from './pages/JobManagement'
import JobDetail from './pages/JobDetail'
import JobEdit from './pages/JobEdit'
import JobCreate from './pages/JobCreate'
import Applicants from './pages/Applicants'
import AdminDashboard from './pages/AdminDashboard'
import RecruiterDashboard from './pages/RecruiterDashboard'
import RecruiterManagement from './pages/RecruiterManagement'
import LicenseManagement from './pages/LicenseManagement'
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
        <Route path="/jobs" element={<JobManagement />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/jobs/:id/edit" element={<JobEdit />} />
        <Route path="/jobs/create" element={<JobCreate />} />
        <Route path="/applicants" element={<Applicants />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/recruiter" element={<RecruiterDashboard />} />
        <Route path="/recruiters" element={<RecruiterManagement />} />
        <Route path="/licenses" element={<LicenseManagement />} />
        <Route path="/reports" element={<ReportsAnalytics />} />
        <Route path="/logs" element={<AuditLog />} />
        <Route path="/ai-status" element={<AIStatus />} />
        <Route path="/config" element={<SystemConfiguration />} />
      </Routes>
    </Layout>
  )
}

export default App

