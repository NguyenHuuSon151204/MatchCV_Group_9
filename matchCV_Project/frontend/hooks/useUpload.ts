'use client'

import { useState } from 'react'
import { cvService } from '@/lib/services/cv-service'
import type { UploadResult } from '@/lib/types'
import { useToastContext } from '@/contexts/toast-context'

export function useUpload(onUploadSuccess?: () => void) {
  const [uploading, setUploading] = useState(false)
  const [lastUpload, setLastUpload] = useState<UploadResult | null>(null)
  const toast = useToastContext()

  const upload = async (cvId: string | null, file: File) => {
    setUploading(true)
    try {
      const result = await cvService.uploadCV(cvId, file)
      setLastUpload(result)
      toast.success('File uploaded successfully', `${file.name} has been uploaded`)
      // Call refresh callback if provided
      if (onUploadSuccess) {
        onUploadSuccess()
      }
      return result
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to upload file'
      toast.error('Upload failed', message)
      throw err
    } finally {
      setUploading(false)
    }
  }

  return {
    uploading,
    lastUpload,
    upload,
  }
}

