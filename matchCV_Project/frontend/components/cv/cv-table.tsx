'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { cvService } from '@/lib/services/cv-service'
import { CV } from '@/lib/types'
import { format } from 'date-fns'
import { FileText, Trash2, Download, BarChart3 } from 'lucide-react'

interface CVTableProps {
  cvs: CV[]
}

export function CVTable({ cvs }: CVTableProps) {
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: cvService.deleteCV,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cvs'] })
    },
  })

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this CV?')) {
      deleteMutation.mutate(id)
    }
  }

  const handleExport = async (id: string) => {
    try {
      const blob = await cvService.exportCV(id)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `cv-${id}.txt`
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Export failed:', error)
    }
  }

  const getStatusBadge = (status: CV['status']) => {
    const variants: Record<CV['status'], { variant: 'default' | 'secondary' | 'outline'; label: string }> = {
      draft: { variant: 'outline', label: 'Draft' },
      uploaded: { variant: 'secondary', label: 'Uploaded' },
      analyzed: { variant: 'default', label: 'Analyzed' },
      submitted: { variant: 'default', label: 'Submitted' },
      activing: { variant: 'default', label: 'Active' },
    }
    const config = variants[status] || variants.draft
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">CV Name</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Position</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Score</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Modified</th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cvs.map((cv) => (
              <tr key={cv.id} className="border-b border-border hover:bg-accent/50">
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <FileText className="size-4 text-muted-foreground" />
                    <span className="font-medium">{cv.name}</span>
                  </div>
                </td>
                <td className="p-4 text-sm text-muted-foreground">{cv.position}</td>
                <td className="p-4">{getStatusBadge(cv.status)}</td>
                <td className="p-4">
                  {cv.score !== undefined ? (
                    <div className="flex items-center gap-2">
                      <BarChart3 className="size-4 text-primary" />
                      <span className="font-semibold">{cv.score}%</span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </td>
                <td className="p-4 text-sm text-muted-foreground">
                  {format(new Date(cv.modifiedAt), 'MMM d, yyyy')}
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleExport(cv.id)}
                      title="Export"
                    >
                      <Download className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(cv.id)}
                      title="Delete"
                    >
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

