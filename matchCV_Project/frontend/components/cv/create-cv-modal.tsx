'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { cvService } from '@/lib/services/cv-service'
import { CreateCVInput } from '@/lib/types'
import { X } from 'lucide-react'

interface CreateCVModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateCVModal({ open, onOpenChange }: CreateCVModalProps) {
  const [formData, setFormData] = useState<CreateCVInput>({
    name: '',
    position: '',
    description: '',
  })
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: cvService.createCV,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cvs'] })
      setFormData({ name: '', position: '', description: '' })
      onOpenChange(false)
    },
  })

  if (!open) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate(formData)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Create New CV</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">CV Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="e.g., Software Engineer Resume"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Position</label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="e.g., Software Engineer"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Optional description..."
              rows={3}
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? 'Creating...' : 'Create CV'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

