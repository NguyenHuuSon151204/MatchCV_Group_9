'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import './RecruiterVerification.css'
import '../components/Button.css'
import api from '../services/api'
import CircularProgress from '../components/CircularProgress'

function RecruiterVerification() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState(null)
  
  // Form state
  const [formData, setFormData] = useState({
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    companyAddress: '',
    taxCode: ''
  })
  
  const [businessLicenseFile, setBusinessLicenseFile] = useState(null)
  const [companyProofFile, setCompanyProofFile] = useState(null)
  const [recruiterId, setRecruiterId] = useState(null)

  useEffect(() => {
    // Get recruiter ID from localStorage or context
    // For now, we'll use a query param or get from user context
    const storedUserId = localStorage.getItem('userId')
    if (storedUserId) {
      setRecruiterId(parseInt(storedUserId))
      loadVerificationStatus(parseInt(storedUserId))
    } else {
      // Demo: use query param or default to 1
      const urlParams = new URLSearchParams(window.location.search)
      const id = urlParams.get('recruiterId') || '1'
      setRecruiterId(parseInt(id))
      loadVerificationStatus(parseInt(id))
    }
  }, [])

  const loadVerificationStatus = async (id) => {
    try {
      setLoading(true)
      const data = await api.get(`/recruiter-verification/status?recruiterId=${id}`)
      if (data.status === 'NotSubmitted') {
        setVerificationStatus(null)
      } else {
        setVerificationStatus(data)
        // If already submitted, populate form (read-only)
        if (data.status === 'Pending' || data.status === 'Approved' || data.status === 'Rejected') {
          setFormData({
            companyName: data.companyName || '',
            companyEmail: data.companyEmail || '',
            companyPhone: data.companyPhone || '',
            companyAddress: data.companyAddress || '',
            taxCode: data.taxCode || ''
          })
        }
      }
    } catch (err) {
      console.error('Failed to load verification status:', err)
      setError(err.message || 'Failed to load verification status.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e, type) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB')
        return
      }
      // Validate file type
      const allowedTypes = ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx']
      const fileExt = '.' + file.name.split('.').pop().toLowerCase()
      if (!allowedTypes.includes(fileExt)) {
        setError('Invalid file type. Allowed: PDF, JPG, PNG, DOC, DOCX')
        return
      }
      
      if (type === 'businessLicense') {
        setBusinessLicenseFile(file)
      } else {
        setCompanyProofFile(file)
      }
      setError(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!recruiterId) {
      setError('Recruiter ID is required')
      return
    }

    if (!formData.companyName || !formData.companyEmail) {
      setError('Company name and email are required')
      return
    }

    if (!businessLicenseFile && !companyProofFile) {
      setError('At least one document (Business License or Company Proof) is required')
      return
    }

    try {
      setSubmitting(true)
      setError(null)
      setSuccess(false)

      const formDataToSend = new FormData()
      formDataToSend.append('companyName', formData.companyName)
      formDataToSend.append('companyEmail', formData.companyEmail)
      if (formData.companyPhone) formDataToSend.append('companyPhone', formData.companyPhone)
      if (formData.companyAddress) formDataToSend.append('companyAddress', formData.companyAddress)
      if (formData.taxCode) formDataToSend.append('taxCode', formData.taxCode)
      
      if (businessLicenseFile) {
        formDataToSend.append('businessLicenseFile', businessLicenseFile)
      }
      if (companyProofFile) {
        formDataToSend.append('companyProofFile', companyProofFile)
      }

      await api.post(`/recruiter-verification/submit?recruiterId=${recruiterId}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      setSuccess(true)
      // Reload status
      await loadVerificationStatus(recruiterId)
    } catch (err) {
      console.error('Failed to submit verification:', err)
      setError(err.message || 'Failed to submit verification request.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="verification-container">
        <div className="loading-container">
          <CircularProgress />
          <p>Loading verification status...</p>
        </div>
      </div>
    )
  }

  // If already approved or pending, show status page
  if (verificationStatus && (verificationStatus.status === 'Approved' || verificationStatus.status === 'Pending')) {
  return (
    <div className="verification-container">
      <div className="breadcrumbs">Home / Company Verification</div>
      <div className="verification-status-card">
        <h1>Verification Status</h1>
          
          <div className={`status-badge status-${verificationStatus.status.toLowerCase()}`}>
            {verificationStatus.status}
          </div>

          <div className="verification-details">
            <h2>Company Information</h2>
            <div className="detail-row">
              <label>Company Name:</label>
              <span>{verificationStatus.companyName}</span>
            </div>
            <div className="detail-row">
              <label>Company Email:</label>
              <span>{verificationStatus.companyEmail}</span>
            </div>
            {verificationStatus.companyPhone && (
              <div className="detail-row">
                <label>Company Phone:</label>
                <span>{verificationStatus.companyPhone}</span>
              </div>
            )}
            {verificationStatus.companyAddress && (
              <div className="detail-row">
                <label>Company Address:</label>
                <span>{verificationStatus.companyAddress}</span>
              </div>
            )}
            {verificationStatus.taxCode && (
              <div className="detail-row">
                <label>Tax Code:</label>
                <span>{verificationStatus.taxCode}</span>
              </div>
            )}

            <h2>Documents</h2>
            {verificationStatus.businessLicense && (
              <div className="document-item">
                <label>Business License:</label>
                <span>{verificationStatus.businessLicense.originalName}</span>
                <span className="file-size">({(verificationStatus.businessLicense.sizeBytes / 1024).toFixed(2)} KB)</span>
              </div>
            )}
            {verificationStatus.companyProof && (
              <div className="document-item">
                <label>Company Proof:</label>
                <span>{verificationStatus.companyProof.originalName}</span>
                <span className="file-size">({(verificationStatus.companyProof.sizeBytes / 1024).toFixed(2)} KB)</span>
              </div>
            )}

            {verificationStatus.status === 'Pending' && (
              <div className="pending-message">
                <p>Your verification request is under review. We will notify you once it's processed.</p>
              </div>
            )}

            {verificationStatus.status === 'Approved' && (
              <div className="approved-message">
                <p>✓ Your company has been verified successfully!</p>
              </div>
            )}

            {verificationStatus.adminNotes && (
              <div className="admin-notes">
                <h3>Admin Notes:</h3>
                <p>{verificationStatus.adminNotes}</p>
              </div>
            )}

            {verificationStatus.reviewedAt && (
              <div className="review-info">
                <p>Reviewed on: {new Date(verificationStatus.reviewedAt).toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // If rejected, allow resubmission
  const isRejected = verificationStatus?.status === 'Rejected'
  const canSubmit = !verificationStatus || isRejected

  return (
    <div className="verification-container">
      <div className="breadcrumbs">Home / Company Verification</div>
      <div className="verification-form-card">
        <h1>Company Verification</h1>
        <p className="form-description">
          Please provide your company information and upload required documents to verify your account.
        </p>

        {isRejected && verificationStatus && (
          <div className="rejected-message">
            <h3>Your previous verification was rejected</h3>
            {verificationStatus.adminNotes && (
              <p><strong>Reason:</strong> {verificationStatus.adminNotes}</p>
            )}
            <p>You can resubmit with updated information.</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {success && (
          <div className="success-message">
            Verification request submitted successfully! Your request is under review.
          </div>
        )}

        <form onSubmit={handleSubmit} className="verification-form">
          <div className="form-section">
            <h2>Company Information</h2>
            
            <div className="form-group">
              <label htmlFor="companyName">
                Company Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                required
                disabled={!canSubmit}
                placeholder="Enter your company name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="companyEmail">
                Company Email <span className="required">*</span>
              </label>
              <input
                type="email"
                id="companyEmail"
                name="companyEmail"
                value={formData.companyEmail}
                onChange={handleInputChange}
                required
                disabled={!canSubmit}
                placeholder="company@example.com"
              />
              <small>Please use your company email address</small>
            </div>

            <div className="form-group">
              <label htmlFor="companyPhone">Company Phone</label>
              <input
                type="tel"
                id="companyPhone"
                name="companyPhone"
                value={formData.companyPhone}
                onChange={handleInputChange}
                disabled={!canSubmit}
                placeholder="+84 123 456 789"
              />
            </div>

            <div className="form-group">
              <label htmlFor="companyAddress">Company Address</label>
              <input
                type="text"
                id="companyAddress"
                name="companyAddress"
                value={formData.companyAddress}
                onChange={handleInputChange}
                disabled={!canSubmit}
                placeholder="Enter company address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="taxCode">Tax Code / Business Registration Number</label>
              <input
                type="text"
                id="taxCode"
                name="taxCode"
                value={formData.taxCode}
                onChange={handleInputChange}
                disabled={!canSubmit}
                placeholder="Enter tax code or registration number"
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Verification Documents</h2>
            <p className="section-description">
              Upload at least one of the following documents to verify your company.
            </p>

            <div className="form-group">
              <label htmlFor="businessLicense">
                Business License / Registration Certificate
              </label>
              <input
                type="file"
                id="businessLicense"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={(e) => handleFileChange(e, 'businessLicense')}
                disabled={!canSubmit}
              />
              {businessLicenseFile && (
                <div className="file-info">
                  Selected: {businessLicenseFile.name} ({(businessLicenseFile.size / 1024).toFixed(2)} KB)
                </div>
              )}
              <small>Accepted formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB)</small>
            </div>

            <div className="form-group">
              <label htmlFor="companyProof">
                Company Proof Document (Alternative)
              </label>
              <input
                type="file"
                id="companyProof"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={(e) => handleFileChange(e, 'companyProof')}
                disabled={!canSubmit}
              />
              {companyProofFile && (
                <div className="file-info">
                  Selected: {companyProofFile.name} ({(companyProofFile.size / 1024).toFixed(2)} KB)
                </div>
              )}
              <small>Accepted formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB)</small>
            </div>
          </div>

          {canSubmit && (
            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : 'Submit Verification Request'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default RecruiterVerification

