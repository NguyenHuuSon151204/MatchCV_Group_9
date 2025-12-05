<<<<<<<< HEAD:matchCV_Project/frontend/features/admin/jobs/post-job-page.tsx
'use client'

import { useState } from 'react'
import { Upload, FileText, X, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { useJob } from '@/hooks/useJob'
import { useToastContext } from '@/contexts/toast-context'
import type { CreateJobInput } from '@/lib/types'

export function PostJobPage() {
  const { createJob, uploadJob } = useJob()
  const toast = useToastContext()
  const [loading, setLoading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [formData, setFormData] = useState<CreateJobInput>({
    title: '',
    company: '',
    jobDescription: '',
    rawText: '',
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const allowedTypes = ['application/pdf', 'text/plain']
      const allowedExtensions = ['.pdf', '.txt']
      const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase()

      if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(extension)) {
        toast.error('Invalid file type', 'Please upload a PDF or TXT file')
        return
      }

      if (file.size > 10 * 1024 * 1024) {
        toast.error('File too large', 'File size must be less than 10MB')
        return
      }

      setUploadedFile(file)
    }
  }

  const handleRemoveFile = () => {
    setUploadedFile(null)
  }

  const handleInputChange = (field: keyof CreateJobInput, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (uploadedFile) {
        await uploadJob(uploadedFile)
        setUploadedFile(null)
      } else {
        if (!formData.title || !formData.company) {
          toast.error('Validation error', 'Title and Company are required')
          setLoading(false)
          return
        }
        await createJob(formData)
      }

      // Reset form
      setFormData({
        title: '',
        company: '',
        jobDescription: '',
        rawText: '',
      })
    } catch (err) {
      // Error is handled by useJob hook
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">Job Management</p>
        <h1 className="text-3xl font-semibold text-card-foreground">Post a Job</h1>
        <p className="text-sm text-muted-foreground">Create a new job posting or upload from a file.</p>
      </div>

      <Card className="rounded-3xl border border-border/40 bg-card/80 p-6 shadow-2xl shadow-black/5">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload Section */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-card-foreground">Upload Job Description (PDF or TXT)</label>
            <div className="flex items-center gap-4">
              <label className="flex cursor-pointer items-center gap-2 rounded-2xl border border-border/60 bg-background/80 px-4 py-2 text-sm transition hover:bg-background">
                <Upload className="size-4" />
                <span>Choose File</span>
                <input
                  type="file"
                  accept=".pdf,.txt"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {uploadedFile && (
                <div className="flex items-center gap-2 rounded-2xl bg-muted/40 px-3 py-1.5 text-sm">
                  <FileText className="size-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{uploadedFile.name}</span>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="ml-2 text-muted-foreground hover:text-destructive"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Upload a PDF or TXT file containing the job description. Maximum file size: 10MB
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/30" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card/80 px-2 text-muted-foreground">Or Enter Manually</span>
            </div>
          </div>

          {/* Manual Input Section */}
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="mb-2 block text-sm font-medium text-card-foreground">
                Job Title <span className="text-destructive">*</span>
              </label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., Senior Software Engineer"
                required={!uploadedFile}
                disabled={!!uploadedFile}
              />
            </div>

            <div>
              <label htmlFor="company" className="mb-2 block text-sm font-medium text-card-foreground">
                Company Name <span className="text-destructive">*</span>
              </label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="e.g., Tech Corp"
                required={!uploadedFile}
                disabled={!!uploadedFile}
              />
            </div>

            <div>
              <label htmlFor="description" className="mb-2 block text-sm font-medium text-card-foreground">
                Job Description
              </label>
              <Textarea
                id="description"
                value={formData.jobDescription}
                onChange={(e) => handleInputChange('jobDescription', e.target.value)}
                placeholder="Enter the full job description..."
                rows={8}
                disabled={!!uploadedFile}
              />
            </div>

            <div>
              <label htmlFor="rawText" className="mb-2 block text-sm font-medium text-card-foreground">
                Raw Text (Optional)
              </label>
              <Textarea
                id="rawText"
                value={formData.rawText}
                onChange={(e) => handleInputChange('rawText', e.target.value)}
                placeholder="Additional raw text content..."
                rows={4}
                disabled={!!uploadedFile}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setFormData({
                  title: '',
                  company: '',
                  jobDescription: '',
                  rawText: '',
                })
                setUploadedFile(null)
              }}
              disabled={loading}
            >
              Clear
            </Button>
            <Button type="submit" disabled={loading} className="gap-2 rounded-full">
              <Plus className="size-4" />
              {loading ? 'Creating...' : uploadedFile ? 'Upload Job' : 'Create Job'}
            </Button>
          </div>
        </form>
      </Card>
    </section>
  )
}


========
export * from '@/features/admin/jobs/post-job-page'
>>>>>>>> cc5f27092afd6cf6f701b8fbb0be3a8b618f8c93:matchCV_Project/frontend/features/jobs/post-job-page.tsx
