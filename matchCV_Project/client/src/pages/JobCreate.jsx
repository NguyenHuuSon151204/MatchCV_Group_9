import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './JobEdit.css'
import '../components/Button.css'
import api from '../services/api'
import SkillChipsInput from '../components/SkillChipsInput'

function JobCreate() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '',
    company: '',
    description: '',
    skills: [],
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const payload = {
        title: form.title.trim(),
        company: form.company.trim(),
        description: form.description.trim(),
        skills: form.skills,
      }

      if (!payload.title || !payload.description) {
        setError('Title and description cannot be empty.')
        setSaving(false)
        return
      }

      const job = await api.post('/recruiter/jobs', payload)
      alert('JD created successfully!')
      navigate(`/jobs/${job.id}`)
    } catch (err) {
      console.error('Failed to create job:', err)
      setError(err.message || 'Failed to create job.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="job-create">
      <div className="page-header">
        <div>
          <div className="breadcrumbs">
            <a href="/jobs">Home / Jobs</a> / Create Job
          </div>
          <h1 className="page-title">Create New JD</h1>
          <p className="page-subtitle">
            Set up the JD and required skills so MatchCV can automatically evaluate incoming CVs.
          </p>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form className="job-form" onSubmit={handleSubmit}>
        <div className="form-card">
          <h3 className="form-section-title">JD Information</h3>

          <div className="form-group">
            <label htmlFor="title">Job Title *</label>
            <input
              id="title"
              type="text"
              required
              className="form-input"
              value={form.title}
              onChange={(event) => handleChange('title', event.target.value)}
              placeholder="e.g., Senior Frontend Engineer"
            />
          </div>

          <div className="form-group">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              type="text"
              className="form-input"
              value={form.company}
              onChange={(event) => handleChange('company', event.target.value)}
              placeholder="Company name shown to candidates"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Job Description *</label>
            <textarea
              id="description"
              required
              className="form-textarea"
              rows="10"
              value={form.description}
              onChange={(event) => handleChange('description', event.target.value)}
              placeholder="Detailed job description, responsibilities, compensation..."
            />
            <p className="form-help">
              The clearer the description, the better the AI can assess and match candidate CVs to your expectations.
            </p>
          </div>

          <div className="form-group">
            <SkillChipsInput
              label="Required Skills"
              skills={form.skills}
              onChange={(skills) => handleChange('skills', skills)}
              placeholder="e.g., React, Node.js, SQL..."
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-outline" onClick={() => navigate('/jobs')}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Creating...' : 'Create JD'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default JobCreate