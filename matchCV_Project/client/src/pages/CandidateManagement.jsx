import { useEffect, useState } from 'react'
import './CandidateManagement.css'
import '../components/Button.css'
import api from '../services/api'

function CandidateManagement() {
  const [candidates, setCandidates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    search: '',
  })

  useEffect(() => {
    loadCandidates()
  }, [])

  const loadCandidates = async () => {
    try {
      setLoading(true)
      setError(null)
      const params = new URLSearchParams()
      if (filters.search) params.append('search', filters.search)

      const data = await api.get(`/admin/candidates?${params.toString()}`)
      setCandidates(data || [])
    } catch (error) {
      console.error('Failed to load candidates:', error)
      setError('Failed to load candidates. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }))
  }

  const handleSearch = () => {
    loadCandidates()
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const handleExportCSV = () => {
    try {
      const csvRows = ['Name,Email,CVs,Last Active,Joined Date']
      candidates.forEach((candidate) => {
        csvRows.push(
          `"${candidate.displayName}","${candidate.email}",${candidate.cvCount || 0},"${formatDate(candidate.lastActive)}","${formatDate(candidate.createdAt)}"`
        )
      })

      const csvContent = csvRows.join('\n')
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `candidates-report-${new Date().toISOString().split('T')[0]}.csv`
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to export CSV:', error)
      alert('Failed to export CSV. Please try again.')
    }
  }

  return (
    <div className="candidate-management">
      <div className="page-header">
        <div>
          <div className="breadcrumbs">Home / Account Management / Candidate Management</div>
          <h1 className="page-title">Candidate Management</h1>
          <p className="page-subtitle">
            View and manage all candidates in the system
          </p>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline" onClick={handleExportCSV}>
            Export CSV
          </button>
        </div>
      </div>

      <div className="filter-card">
        <h3 className="filter-title">Search & Filter</h3>
        <div className="filter-row">
          <input
            type="text"
            placeholder="Search by name or email..."
            className="filter-input"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
          <button
            className="btn btn-outline"
            onClick={() => {
              setFilters({ search: '' })
              loadCandidates()
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="table-card">
        <div className="table-header">
          <h3 className="table-title">All Candidates</h3>
          <span className="table-count">
            {candidates.length} candidate{candidates.length !== 1 ? 's' : ''}
          </span>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading">Loading candidates...</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>CVs</th>
                <th>Last Active</th>
                <th>Joined Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {candidates.length === 0 ? (
                <tr>
                  <td colSpan="7" className="empty-state">
                    No candidates found.
                  </td>
                </tr>
              ) : (
                candidates.map((candidate) => (
                  <tr key={candidate.id}>
                    <td>#{candidate.id}</td>
                    <td>
                      <strong>{candidate.displayName}</strong>
                    </td>
                    <td>{candidate.email}</td>
                    <td>
                      <span className="badge badge-neutral">
                        {candidate.cvCount || 0} CV{candidate.cvCount !== 1 ? 's' : ''}
                      </span>
                    </td>
                    <td>{formatDate(candidate.lastActive)}</td>
                    <td>{formatDate(candidate.createdAt)}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-action btn-view">View</button>
                        <button className="btn-action btn-edit">Edit</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default CandidateManagement


