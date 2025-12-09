import { useState } from 'react'
import { Modal } from '@/components/common/modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useUpload } from '@/hooks/useUpload'
import { cvService } from '@/lib/services/cv-service'
import { useToastContext } from '@/contexts/toast-context'

interface UploadCvModalProps {
  open: boolean
  onClose: () => void
  cvId: string | null
  onUploadSuccess?: () => void
}

export function UploadCvModal({ open, onClose, cvId, onUploadSuccess }: UploadCvModalProps) {
  const { upload, uploading } = useUpload(onUploadSuccess)
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const toast = useToastContext()

  // Only show form if creating new CV (cvId is null)
  const [formData, setFormData] = useState({
    name: '',
  })

  // Pre-fill CV name if file selected and name is empty
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null
    setFile(selected)
    if (selected && !cvId && !formData.name) {
      setFormData({ name: selected.name.replace(/\.[^/.]+$/, "") })
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.')
      return
    }
    setError(null)

    try {
      let targetId = cvId

      // If creating new CV, create metadata first
      if (!targetId) {
        if (!formData.name) {
          setError('Please enter a CV name.')
          return
        }

        const newCv = await cvService.createCV({
          name: formData.name,
          position: 'General', // Default for uploaded CVs
          description: '',
          cvData: {
            personalInfo: {
              fullName: 'Candidate',
              position: 'General',
              summary: ''
            }
          }
        })
        targetId = newCv.id
      }

      await upload(targetId, file)
      setFile(null)
      setFormData({ name: '' })
      onClose()

      // If we created a new one, we need to trigger success callback to refresh list
      if (!cvId && onUploadSuccess) {
        onUploadSuccess()
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
      toast.error('Error', err instanceof Error ? err.message : 'Upload failed')
    }
  }

  const isFormValid = cvId ? true : !!formData.name

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={cvId ? "Upload New Version" : "Upload CV"}
      description="Upload your CV file directly. We'll extract the details."
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={uploading || !file || !isFormValid}>
            {uploading ? 'Processing...' : (cvId ? 'Upload' : 'Upload')}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {/* Only show form inputs when creating new CV */}
        {!cvId && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium">CV Name</label>
              <Input
                placeholder="e.g. My Fullstack CV"
                value={formData.name}
                onChange={(e) => setFormData({ name: e.target.value })}
              />
            </div>
            <div className="border-t border-border/50 my-4" />
          </>
        )}

        <label className="block cursor-pointer rounded-2xl border border-dashed border-border/60 px-4 py-6 text-center text-sm text-muted-foreground hover:border-primary/50 bg-muted/10">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={handleFileChange}
          />
          {file ? (
            <>
              <p className="font-semibold text-card-foreground">{file.name}</p>
              <p>{(file.size / 1024).toFixed(1)} KB</p>
            </>
          ) : (
            <>
              <p className="font-semibold text-card-foreground">Click to select a file</p>
              <p>PDF, DOCX up to 10MB</p>
            </>
          )}
        </label>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    </Modal>
  )
}


