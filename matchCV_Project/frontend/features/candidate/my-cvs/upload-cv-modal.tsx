import { useState } from 'react'
import { Modal } from '@/components/common/modal'
import { Button } from '@/components/ui/button'
import { useUpload } from '@/hooks/useUpload'

interface UploadCvModalProps {
  open: boolean
  onClose: () => void
  cvId: string | null
  onUploadSuccess?: () => void
}

export function UploadCvModal({ open, onClose, cvId, onUploadSuccess }: UploadCvModalProps) {
  const { upload, uploading, lastUpload } = useUpload(onUploadSuccess)
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.')
      return
    }
    setError(null)
    try {
      // cvId can be null - backend will create new CV if id is not provided
      await upload(cvId, file)
      setFile(null)
      onClose()
    } catch (err) {
      // Error is handled by useUpload hook
      setError(err instanceof Error ? err.message : 'Upload failed')
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Upload CV"
      description="Attach a PDF or DOCX file to power richer AI analysis."
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={uploading || !file}>
            {uploading ? 'Uploading...' : 'Upload'}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <label className="block cursor-pointer rounded-2xl border border-dashed border-border/60 px-4 py-6 text-center text-sm text-muted-foreground hover:border-primary/50">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
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
        {lastUpload && (
          <div className="rounded-2xl border border-border/40 bg-muted/20 p-3 text-xs text-muted-foreground">
            Last upload: {lastUpload.fileName} • {(lastUpload.fileSize / 1024).toFixed(1)} KB
          </div>
        )}
      </div>
    </Modal>
  )
}


