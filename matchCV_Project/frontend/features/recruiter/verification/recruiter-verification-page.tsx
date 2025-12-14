'use client'

import { useState, useEffect } from 'react'
import { recruiterService } from '@/lib/services/recruiter-service'
import { CircularProgress } from '@/components/ui/circular-progress'
import { CheckCircle2, XCircle, Clock } from 'lucide-react'

function getStatusBadgeClass(status: string) {
  switch (status?.toLowerCase()) {
    case 'approved':
      return 'bg-green-100 text-green-800'
    case 'rejected':
      return 'bg-red-100 text-red-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

interface VerificationStatus {
  id: number
  status: string
  companyName: string
  companyEmail: string
  companyPhone?: string
  companyAddress?: string
  taxCode?: string
  adminNotes?: string
  reviewedAt?: string
  businessLicense?: {
    originalName: string
    sizeBytes: number
  }
  companyProof?: {
    originalName: string
    sizeBytes: number
  }
}

export function RecruiterVerificationPage() {
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus | null>(null)

  const [formData, setFormData] = useState({
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    companyAddress: '',
    taxCode: '',
  })

  const [businessLicenseFile, setBusinessLicenseFile] = useState<File | null>(null)
  const [companyProofFile, setCompanyProofFile] = useState<File | null>(null)
  const [recruiterId, setRecruiterId] = useState<number | null>(null)

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId') || localStorage.getItem('matchcv-userId')
    if (storedUserId) {
      const id = parseInt(storedUserId)
      setRecruiterId(id)
      loadVerificationStatus(id)
    } else {
      const id = 1 // Default fallback
      setRecruiterId(id)
      loadVerificationStatus(id)
    }
  }, [])

  const loadVerificationStatus = async (id: number) => {
    try {
      setLoading(true)
      const data = await recruiterService.getVerificationStatus(id)
      if (data.status === 'NotSubmitted') {
        setVerificationStatus(null)
      } else {
        setVerificationStatus(data)
        if (data.status === 'Pending' || data.status === 'Approved' || data.status === 'Rejected') {
          setFormData({
            companyName: data.companyName || '',
            companyEmail: data.companyEmail || '',
            companyPhone: data.companyPhone || '',
            companyAddress: data.companyAddress || '',
            taxCode: data.taxCode || '',
          })
        }
      }
    } catch (err: any) {
      console.error('Failed to load verification status:', err)
      setError(err.message || 'Failed to load verification status.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB')
        return
      }
      const allowedTypes = ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx']
      const fileExt = '.' + file.name.split('.').pop()?.toLowerCase()
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

  const handleSubmit = async (e: React.FormEvent) => {
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

      await recruiterService.submitVerification(recruiterId, formDataToSend)

      setSuccess(true)
      await loadVerificationStatus(recruiterId)
    } catch (err: any) {
      console.error('Failed to submit verification:', err)
      setError(err.message || 'Failed to submit verification request.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <CircularProgress />
          <p className="mt-4 text-muted-foreground">Loading verification status...</p>
        </div>
      </div>
    )
  }

  // If already approved or pending, show status page
  if (verificationStatus && (verificationStatus.status === 'Approved' || verificationStatus.status === 'Pending')) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-sm text-muted-foreground mb-1">Home / Company Verification</div>
        <div className="bg-card p-6 rounded-lg border">
          <h1 className="text-2xl font-bold mb-4">Verification Status</h1>

          <div className="mb-6 flex items-center gap-3">
            {verificationStatus.status === 'Approved' ? (
              <CheckCircle2 className="size-8 text-green-600" />
            ) : (
              <Clock className="size-8 text-yellow-600" />
            )}
            <span className={`px-4 py-2 rounded text-lg font-semibold ${getStatusBadgeClass(verificationStatus.status)}`}>
              {verificationStatus.status}
            </span>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-3">Company Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Company Name:</div>
                  <div className="font-medium">{verificationStatus.companyName}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Company Email:</div>
                  <div>{verificationStatus.companyEmail}</div>
                </div>
                {verificationStatus.companyPhone && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Company Phone:</div>
                    <div>{verificationStatus.companyPhone}</div>
                  </div>
                )}
                {verificationStatus.companyAddress && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Company Address:</div>
                    <div>{verificationStatus.companyAddress}</div>
                  </div>
                )}
                {verificationStatus.taxCode && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Tax Code:</div>
                    <div>{verificationStatus.taxCode}</div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-3">Documents</h2>
              <div className="space-y-2">
                {verificationStatus.businessLicense && (
                  <div className="p-3 bg-muted rounded">
                    <div className="font-medium">Business License:</div>
                    <div className="text-sm text-muted-foreground">
                      {verificationStatus.businessLicense.originalName} (
                      {(verificationStatus.businessLicense.sizeBytes / 1024).toFixed(2)} KB)
                    </div>
                  </div>
                )}
                {verificationStatus.companyProof && (
                  <div className="p-3 bg-muted rounded">
                    <div className="font-medium">Company Proof:</div>
                    <div className="text-sm text-muted-foreground">
                      {verificationStatus.companyProof.originalName} (
                      {(verificationStatus.companyProof.sizeBytes / 1024).toFixed(2)} KB)
                    </div>
                  </div>
                )}
              </div>
            </div>

            {verificationStatus.status === 'Pending' && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800">
                  Your verification request is under review. We will notify you once it's processed.
                </p>
              </div>
            )}

            {verificationStatus.status === 'Approved' && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-semibold">
                  ✓ Your company has been verified successfully!
                </p>
              </div>
            )}

            {verificationStatus.adminNotes && (
              <div>
                <h3 className="font-semibold mb-2">Admin Notes:</h3>
                <div className="p-3 bg-muted rounded">{verificationStatus.adminNotes}</div>
              </div>
            )}

            {verificationStatus.reviewedAt && (
              <div className="text-sm text-muted-foreground">
                Reviewed on: {new Date(verificationStatus.reviewedAt).toLocaleString()}
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
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-sm text-muted-foreground mb-1">Home / Company Verification</div>
      <div className="bg-card p-6 rounded-lg border">
        <h1 className="text-2xl font-bold mb-2">Company Verification</h1>
        <p className="text-muted-foreground mb-6">
          Please provide your company information and upload required documents to verify your account.
        </p>

        {isRejected && verificationStatus && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="font-semibold text-red-800 mb-2">Your previous verification was rejected</h3>
            {verificationStatus.adminNotes && (
              <p className="text-red-700 mb-2">
                <strong>Reason:</strong> {verificationStatus.adminNotes}
              </p>
            )}
            <p className="text-red-700">You can resubmit with updated information.</p>
          </div>
        )}

        {error && <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded-lg">{error}</div>}

        {success && (
          <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg">
            Verification request submitted successfully! Your request is under review.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Company Information</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium mb-1">
                  Company Name <span className="text-destructive">*</span>
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
                  className="w-full px-3 py-2 border rounded bg-background disabled:opacity-50"
                />
              </div>

              <div>
                <label htmlFor="companyEmail" className="block text-sm font-medium mb-1">
                  Company Email <span className="text-destructive">*</span>
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
                  className="w-full px-3 py-2 border rounded bg-background disabled:opacity-50"
                />
                <small className="text-sm text-muted-foreground">Please use your company email address</small>
              </div>

              <div>
                <label htmlFor="companyPhone" className="block text-sm font-medium mb-1">
                  Company Phone
                </label>
                <input
                  type="tel"
                  id="companyPhone"
                  name="companyPhone"
                  value={formData.companyPhone}
                  onChange={handleInputChange}
                  disabled={!canSubmit}
                  placeholder="+84 123 456 789"
                  className="w-full px-3 py-2 border rounded bg-background disabled:opacity-50"
                />
              </div>

              <div>
                <label htmlFor="companyAddress" className="block text-sm font-medium mb-1">
                  Company Address
                </label>
                <input
                  type="text"
                  id="companyAddress"
                  name="companyAddress"
                  value={formData.companyAddress}
                  onChange={handleInputChange}
                  disabled={!canSubmit}
                  placeholder="Enter company address"
                  className="w-full px-3 py-2 border rounded bg-background disabled:opacity-50"
                />
              </div>

              <div>
                <label htmlFor="taxCode" className="block text-sm font-medium mb-1">
                  Tax Code / Business Registration Number
                </label>
                <input
                  type="text"
                  id="taxCode"
                  name="taxCode"
                  value={formData.taxCode}
                  onChange={handleInputChange}
                  disabled={!canSubmit}
                  placeholder="Enter tax code or registration number"
                  className="w-full px-3 py-2 border rounded bg-background disabled:opacity-50"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Verification Documents</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Upload at least one of the following documents to verify your company.
            </p>

            <div className="space-y-4">
              <div>
                <label htmlFor="businessLicense" className="block text-sm font-medium mb-1">
                  Business License / Registration Certificate
                </label>
                <input
                  type="file"
                  id="businessLicense"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={(e) => handleFileChange(e, 'businessLicense')}
                  disabled={!canSubmit}
                  className="w-full px-3 py-2 border rounded bg-background disabled:opacity-50"
                />
                {businessLicenseFile && (
                  <div className="mt-2 text-sm text-muted-foreground">
                    Selected: {businessLicenseFile.name} ({(businessLicenseFile.size / 1024).toFixed(2)} KB)
                  </div>
                )}
                <small className="text-sm text-muted-foreground">
                  Accepted formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB)
                </small>
              </div>

              <div>
                <label htmlFor="companyProof" className="block text-sm font-medium mb-1">
                  Company Proof Document (Alternative)
                </label>
                <input
                  type="file"
                  id="companyProof"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={(e) => handleFileChange(e, 'companyProof')}
                  disabled={!canSubmit}
                  className="w-full px-3 py-2 border rounded bg-background disabled:opacity-50"
                />
                {companyProofFile && (
                  <div className="mt-2 text-sm text-muted-foreground">
                    Selected: {companyProofFile.name} ({(companyProofFile.size / 1024).toFixed(2)} KB)
                  </div>
                )}
                <small className="text-sm text-muted-foreground">
                  Accepted formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB)
                </small>
              </div>
            </div>
          </div>

          {canSubmit && (
            <div className="flex justify-end pt-4 border-t">
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50"
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
