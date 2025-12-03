import { useState } from 'react'
import { Modal } from '@/components/common/modal'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import type { CreateCVInput } from '@/lib/types'

interface CreateCvModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (input: CreateCVInput) => Promise<void>
}

export function CreateCvModal({ open, onClose, onSubmit }: CreateCvModalProps) {
  const [form, setForm] = useState<CreateCVInput>({
    name: '',
    position: '',
    description: '',
  })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!form.name || !form.position) return
    setSubmitting(true)
    try {
      await onSubmit(form)
      setForm({ name: '', position: '', description: '' })
      onClose()
    } catch (err) {
      // Error is handled by useCV hook
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create New CV"
      description="Add a new AI-ready CV with title, role, and description."
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Creating...' : 'Create CV'}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-card-foreground">CV Title</label>
          <Input
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="e.g. Senior Frontend Engineer Resume"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-card-foreground">Position</label>
          <Input
            value={form.position}
            onChange={(e) => setForm((prev) => ({ ...prev, position: e.target.value }))}
            placeholder="e.g. Frontend Engineer"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-card-foreground">Description</label>
          <Textarea
            className="min-h-[120px] rounded-2xl"
            value={form.description}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="Describe key skills, focus areas, or achievements."
          />
        </div>
      </div>
    </Modal>
  )
}


