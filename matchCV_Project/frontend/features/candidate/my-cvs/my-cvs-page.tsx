'use client'

import { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import { Download, Plus, Sparkles, Trash2, Upload as UploadIcon, Search, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScoreCircle } from '@/components/common/score-circle'
import { StatusBadge } from '@/components/common/status-badge'
import { CVCard } from '@/components/common/cv-card'
import { useCV } from '@/hooks/useCV'
import { UploadCvModal } from '@/features/candidate/my-cvs/upload-cv-modal'
import { CreateCvDialog } from '@/features/candidate/my-cvs/create-cv-dialog'
import { CreateOptionDialog } from '@/features/candidate/my-cvs/create-option-dialog'
import { EditOptionDialog } from '@/features/candidate/my-cvs/edit-option-dialog'
import { ViewCvDialog } from '@/features/candidate/my-cvs/view-cv-dialog'

export function MyCVsPage() {
  const navigate = useNavigate()
  const { cvs, loading, createCV, analyzeCV, deleteCV, exportCV, refresh } = useCV()
  const [uploadOpen, setUploadOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [optionOpen, setOptionOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)
  const [editOptionId, setEditOptionId] = useState<string | null>(null)
  const [selectedCvId, setSelectedCvId] = useState<string | null>(null)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Listen for CV saved event from CV Builder
  useEffect(() => {
    const handleCvSaved = () => {
      // Refresh CVs list when a CV is saved in CV Builder
      refresh()
    }

    window.addEventListener('cv-saved', handleCvSaved)
    return () => {
      window.removeEventListener('cv-saved', handleCvSaved)
    }
  }, [refresh])

  // Filter CVs based on search query
  const filteredCVs = useMemo(() => {
    // Show ALL CVs. Do NOT filter out 'Untitled CV' or Drafts.
    const visibleCvs = cvs;

    if (!searchQuery.trim()) {
      return visibleCvs;
    }
    const query = searchQuery.toLowerCase().trim()
    return visibleCvs.filter(
      (cv) =>
        cv.name.toLowerCase().includes(query) ||
        cv.position.toLowerCase().includes(query) ||
        (cv.description && cv.description.toLowerCase().includes(query))
    )
  }, [cvs, searchQuery])

  const handleAnalyze = async (id: string) => {
    setBusyId(id)
    await analyzeCV(id)
    setBusyId(null)
  }

  const handleExport = async (id: string, format: 'pdf' | 'docx' | 'json') => {
    try {
      await exportCV(id, format)
    } catch (error: any) {
      console.error('Export errored:', error)
      let errorMsg = 'Export failed'

      if (error.response?.data instanceof Blob) {
        try {
          const text = await error.response.data.text()
          const json = JSON.parse(text)
          errorMsg = json.message || text
        } catch (e) {
          // If parsing fails, just use generic message or text
        }
      } else {
        errorMsg = error.response?.data?.message || error.message || 'Export failed'
      }

      alert(`Export Error Details: ${errorMsg}`)
    }
  }

  const handleCreate = async (data: { name: string; fullName: string; position: string; description: string }) => {
    setCreateOpen(false)
    navigate('/app/cv-builder', {
      state: {
        initialData: {
          title: data.name,
          personalInfo: {
            fullName: data.fullName,
            position: data.position,
            summary: data.description
          }
        }
      }
    })
  }

  const handleDelete = async (id: string) => {
    setBusyId(id)
    await deleteCV(id)
    setBusyId(null)
  }

  const handleOptionSelect = (option: 'upload' | 'manual') => {
    setOptionOpen(false)
    if (option === 'upload') {
      setSelectedCvId(null)
      setUploadOpen(true)
    } else {
      setCreateOpen(true)
    }
  }

  const handleEditOptionSelect = (option: 'upload' | 'builder') => {
    if (!editOptionId) return

    if (option === 'upload') {
      setSelectedCvId(editOptionId)
      setUploadOpen(true)
    } else {
      navigate(`/app/cv-builder?id=${editOptionId}`)
    }
    setEditOptionId(null)
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">Workspace</p>
          <h1 className="text-3xl font-semibold text-card-foreground">My CVs</h1>
          <p className="text-sm text-muted-foreground">Manage, analyze, rewrite, and export every CV in one place.</p>
        </div>
        <div className="flex flex-wrap gap-3">

          <Button
            className="gap-2 rounded-full"
            onClick={() => setOptionOpen(true)}
          >
            <Plus className="size-4" />
            Create New CV
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="rounded-3xl border border-border/40 bg-card/80 p-4 shadow-2xl shadow-black/5">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search CVs by name, position, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4"
          />
        </div>
        {searchQuery && (
          <p className="mt-2 text-sm text-muted-foreground">
            Found {filteredCVs.length} CV{filteredCVs.length !== 1 ? 's' : ''} matching "{searchQuery}"
          </p>
        )}
      </div>

      <div className="rounded-3xl border border-border/40 bg-card/80 p-4 shadow-2xl shadow-black/5">
        <div className="hidden w-full overflow-hidden rounded-2xl border border-border/30 md:block">
          <table className="min-w-full divide-y divide-border/40 text-sm">
            <thead className="bg-muted/30 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-6 py-4 text-left">CV Name</th>
                <th className="px-6 py-4 text-left">Last Modified</th>
                <th className="px-6 py-4 text-left">Status</th>

                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    Loading CVs...
                  </td>
                </tr>
              ) : filteredCVs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    {searchQuery ? (
                      'No CVs found matching your search.'
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-4">
                        <p>No CVs found. Create your first CV!</p>
                        <Button onClick={() => setOptionOpen(true)}>
                          <Plus className="mr-2 size-4" />
                          Create New CV
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ) : (
                filteredCVs.map((cv) => (
                  <tr key={cv.id} className="bg-background/30">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-card-foreground">{cv.name}</p>
                      <p className="text-xs text-muted-foreground">{cv.position}</p>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {formatDistanceToNow(new Date(cv.modifiedAt), { addSuffix: true })}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={cv.status} />
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          className="rounded-full bg-blue-500/20 text-blue-600"
                          variant="ghost"
                          onClick={() => {
                            setSelectedCvId(cv.id)
                            setViewOpen(true)
                          }}
                        >
                          <Eye className="mr-1 size-4" />

                        </Button>
                        <Button
                          size="sm"
                          className="rounded-full bg-blue-500/20 text-blue-600"
                          variant="ghost"
                          onClick={() => setEditOptionId(cv.id)}
                        >

                          Edit
                        </Button>
                        <Button
                          size="sm"
                          className="rounded-full bg-primary/20 text-primary"
                          variant="secondary"
                          onClick={() => handleAnalyze(cv.id)}
                          disabled={busyId === cv.id}
                        >
                          <Sparkles className="mr-1 size-4" />
                          {busyId === cv.id ? 'Analyzing...' : 'Analyze'}
                        </Button>
                        <Button
                          size="sm"
                          className="rounded-full bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-100"
                          variant="ghost"
                          onClick={() => navigate('/app/ai-rewrite', { state: { cvId: cv.id } })}
                        >
                          <Sparkles className="mr-1 size-4" />
                          Rewrite
                        </Button>
                        <Button
                          size="sm"
                          className="rounded-full bg-muted/40 text-muted-foreground"
                          variant="ghost"
                          onClick={() => handleExport(cv.id, 'pdf')}
                        >
                          <Download className="mr-1 size-4" />

                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          className="rounded-full text-destructive"
                          onClick={() => handleDelete(cv.id)}
                          disabled={busyId === cv.id}
                        >
                          <Trash2 className="mr-1 size-4" />

                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 grid gap-4 md:hidden">
          {loading ? (
            <div className="py-8 text-center text-muted-foreground">Loading CVs...</div>
          ) : filteredCVs.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              {searchQuery ? (
                'No CVs found matching your search.'
              ) : (
                <div className="flex flex-col items-center justify-center gap-4">
                  <p>No CVs found. Create your first CV!</p>
                  <Button onClick={() => setOptionOpen(true)}>
                    <Plus className="mr-2 size-4" />
                    Create New CV
                  </Button>
                </div>
              )}
            </div>
          ) : (
            filteredCVs.map((cv) => (
              <CVCard
                key={cv.id}
                cv={cv}
                onView={(id) => {
                  setSelectedCvId(id)
                  setViewOpen(true)
                }}
                onEdit={(id) => setEditOptionId(id)}
                onAnalyze={handleAnalyze}
                onRewrite={(id) => navigate('/ai-rewrite', { state: { cvId: id } })}
                onExport={(id, format) => handleExport(id, format)}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>

      <CreateCvDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreate}
      />

      <CreateOptionDialog
        open={optionOpen}
        onClose={() => setOptionOpen(false)}
        onSelectOption={handleOptionSelect}
      />

      <EditOptionDialog
        open={!!editOptionId}
        onClose={() => setEditOptionId(null)}
        onSelectOption={handleEditOptionSelect}
      />

      <UploadCvModal
        open={uploadOpen}
        onClose={() => {
          setUploadOpen(false)
          setSelectedCvId(null)
        }}
        cvId={selectedCvId}
        onUploadSuccess={refresh}
      />

      <ViewCvDialog
        open={viewOpen}
        onClose={() => {
          setViewOpen(false)
          setSelectedCvId(null)
        }}
        cv={cvs.find(c => c.id === selectedCvId) || null}
      />
    </section>
  )
}
