'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { recruiterService } from '@/lib/services/recruiter-service'
import { SkillChipsInput } from '@/components/ui/skill-chips-input'

interface Job {
  id: number
  title: string
  company?: string
  rawText?: string
  description?: string
  skills?: string[]
}

export function JobEditPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string
  const [job, setJob] = useState<Job>({
    title: '',
    company: '',
    rawText: '',
    skills: [],
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      loadJob()
    }
  }, [id])

  const loadJob = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await recruiterService.getJob(parseInt(id))
      setJob({
        title: data.title || '',
        company: data.company || '',
        rawText: data.rawText || data.description || '',
        skills: data.skills || [],
      })
    } catch (err: any) {
      console.error('Failed to load job:', err)
      setError('Failed to load job. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: keyof Job, value: string | string[]) => {
    setJob((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      await recruiterService.updateJob(parseInt(id), {
        title: job.title.trim(),
        company: job.company?.trim() || '',
        description: job.rawText.trim(),
        skills: job.skills,
      })
      alert('Job updated successfully!')
      router.push(`/recruiter/jobs/${id}`)
    } catch (err: any) {
      console.error('Failed to update job:', err)
      setError('Failed to update job. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Loading job...</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="text-sm text-muted-foreground mb-1">
          <Link href="/recruiter/jobs" className="hover:text-foreground">
            Home / Jobs
          </Link>{' '}
          / Edit Job #{id}
        </div>
        <h1 className="text-2xl font-bold mb-2">Edit Job</h1>
        <p className="text-muted-foreground">Update job information and description</p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded-lg">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-card p-6 rounded-lg border space-y-6">
          <h3 className="text-lg font-semibold">Job Information</h3>

          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium">
              Job Title *
            </label>
            <input
              id="title"
              type="text"
              required
              value={job.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-background"
              placeholder="e.g., Senior .NET Developer"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="company" className="block text-sm font-medium">
              Company *
            </label>
            <input
              id="company"
              type="text"
              required
              value={job.company}
              onChange={(e) => handleChange('company', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-background"
              placeholder="e.g., Acme Inc."
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="rawText" className="block text-sm font-medium">
              Job Description *
            </label>
            <textarea
              id="rawText"
              required
              value={job.rawText}
              onChange={(e) => handleChange('rawText', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-background min-h-[200px]"
              rows={10}
              placeholder="Describe responsibilities, requirements, and benefits..."
            />
            <p className="text-sm text-muted-foreground">
              Include job responsibilities, required skills, qualifications, and benefits.
            </p>
          </div>

          <div>
            <SkillChipsInput
              label="Required Skills"
              skills={job.skills || []}
              onChange={(skills) => handleChange('skills', skills)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link
            href={`/recruiter/jobs/${id}`}
            className="px-4 py-2 border rounded-lg hover:bg-accent transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}
