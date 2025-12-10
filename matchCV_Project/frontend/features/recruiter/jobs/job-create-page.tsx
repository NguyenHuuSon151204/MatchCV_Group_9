'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { recruiterService } from '@/lib/services/recruiter-service'
import { SkillChipsInput } from '@/components/ui/skill-chips-input'

export function JobCreatePage() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '',
    company: '',
    description: '',
    skills: [] as string[],
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (field: string, value: string | string[]) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setSaving(true)
    setError(null)

    try {
      // Get recruiter ID from localStorage if available
      const recruiterId = typeof window !== 'undefined' 
        ? parseInt(localStorage.getItem('matchcv-userId') || localStorage.getItem('userId') || '0')
        : 0

      const payload = {
        Title: form.title.trim(),
        Company: form.company.trim() || undefined,
        Description: form.description.trim(),
        Skills: form.skills || [],
        RecruiterId: recruiterId > 0 ? recruiterId : undefined,
      }

      if (!payload.Title || !payload.Description) {
        setError('Title and description cannot be empty.')
        setSaving(false)
        return
      }

      const job = await recruiterService.createJob(payload)
      // Backend returns with camelCase or PascalCase
      const jobId = job.id || job.Id
      if (jobId) {
        alert('JD created successfully!')
        router.push(`/recruiter/jobs/${jobId}`)
      } else {
        setError('Job created but could not get job ID.')
      }
    } catch (err: any) {
      console.error('Failed to create job:', err)
      setError(err.message || err.response?.data?.message || 'Failed to create job.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="text-sm text-muted-foreground mb-1">
          <Link href="/recruiter/jobs" className="hover:text-foreground">
            Home / Jobs
          </Link>{' '}
          / Create Job
        </div>
        <h1 className="text-2xl font-bold mb-2">Create New JD</h1>
        <p className="text-muted-foreground">
          Set up the JD and required skills so MatchCV can automatically evaluate incoming CVs.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded-lg">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-card p-6 rounded-lg border space-y-6">
          <h3 className="text-lg font-semibold">JD Information</h3>

          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium">
              Job Title *
            </label>
            <input
              id="title"
              type="text"
              required
              className="w-full px-3 py-2 border rounded-lg bg-background"
              value={form.title}
              onChange={(event) => handleChange('title', event.target.value)}
              placeholder="e.g., Senior Frontend Engineer"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="company" className="block text-sm font-medium">
              Company
            </label>
            <input
              id="company"
              type="text"
              className="w-full px-3 py-2 border rounded-lg bg-background"
              value={form.company}
              onChange={(event) => handleChange('company', event.target.value)}
              placeholder="Company name shown to candidates"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium">
              Job Description *
            </label>
            <textarea
              id="description"
              required
              className="w-full px-3 py-2 border rounded-lg bg-background min-h-[200px]"
              rows={10}
              value={form.description}
              onChange={(event) => handleChange('description', event.target.value)}
              placeholder="Detailed job description, responsibilities, compensation..."
            />
            <p className="text-sm text-muted-foreground">
              The clearer the description, the better the AI can assess and match candidate CVs to
              your expectations.
            </p>
          </div>

          <div>
            <SkillChipsInput
              label="Required Skills"
              skills={form.skills}
              onChange={(skills) => handleChange('skills', skills)}
              placeholder="e.g., React, Node.js, SQL..."
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link
            href="/recruiter/jobs"
            className="px-4 py-2 border rounded-lg hover:bg-accent transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            disabled={saving}
          >
            {saving ? 'Creating...' : 'Create JD'}
          </button>
        </div>
      </form>
    </div>
  )
}
