import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './JobEdit.css'
import '../components/Button.css'
import api from '../services/api'
import SkillChipsInput from '../components/SkillChipsInput'

function JobEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState({
    title: '',
    company: '',
    rawText: '',
    skills: [],
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadJob()
  }, [id])

  const loadJob = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await api.get(`/recruiter/jobs/${id}`)
      setJob({
        title: data.title || '',
        company: data.company || '',
        rawText: data.rawText || '',
        skills: data.skills || [],
      })
    } catch (error) {
      console.error('Failed to load job:', error)
      setError('Failed to load job. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field, value) => {
    setJob((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      await api.put(`/recruiter/jobs/${id}`, {
        title: job.title.trim(),
        company: job.company.trim(),
        description: job.rawText.trim(),
        skills: job.skills,
      })
      alert('Job updated successfully!')
      navigate(`/jobs/${id}`)
    } catch (error) {
      console.error('Failed to update job:', error)
      setError('Failed to update job. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="job-edit">
        <div className="loading">Loading job...</div>
      </div>
    )
  }

  return (
    <div className="job-edit">
      <div className="page-header">
        <div>
          <div className="breadcrumbs">
            <a href="/jobs">Home / Jobs</a> / Edit Job #{id}
          </div>
          <h1 className="page-title">Edit Job</h1>
          <p className="page-subtitle">Update job information and description</p>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="job-form">
        <div className="form-card">
          <h3 className="form-section-title">Job Information</h3>

          <div className="form-group">
            <label htmlFor="title">Job Title *</label>
            <input
              id="title"
              type="text"
              required
              value={job.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="form-input"
              placeholder="e.g., Senior .NET Developer"
            />
          </div>

          <div className="form-group">
            <label htmlFor="company">Company *</label>
            <input
              id="company"
              type="text"
              required
              value={job.company}
              onChange={(e) => handleChange('company', e.target.value)}
              className="form-input"
              placeholder="e.g., Acme Inc."
            />
          </div>

          <div className="form-group">
            <label htmlFor="rawText">Job Description *</label>
            <textarea
              id="rawText"
              required
              value={job.rawText}
              onChange={(e) => handleChange('rawText', e.target.value)}
              className="form-textarea"
              rows="10"
              placeholder="Describe responsibilities, requirements, and benefits..."
            />
            <p className="form-help">
              Include job responsibilities, required skills, qualifications, and benefits.
            </p>
          </div>

          <div className="form-group">
            <SkillChipsInput
              label="Required Skills"
              skills={job.skills}
              onChange={(skills) => setJob((prev) => ({ ...prev, skills }))}
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => navigate(`/jobs/${id}`)}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default JobEdit

