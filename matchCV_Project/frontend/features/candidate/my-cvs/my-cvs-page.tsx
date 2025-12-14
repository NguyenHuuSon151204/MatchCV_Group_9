<<<<<<<< HEAD:matchCV_Project/frontend/features/candidate/my-cvs/my-cvs-page.tsx
'use client'

import { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import { Download, Plus, Sparkles, Trash2, Upload as UploadIcon, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScoreCircle } from '@/components/common/score-circle'
import { StatusBadge } from '@/components/common/status-badge'
import { CVCard } from '@/components/common/cv-card'
import { useCV } from '@/hooks/useCV'
import { CreateCvModal } from '@/features/candidate/my-cvs/create-cv-modal'
import { UploadCvModal } from '@/features/candidate/my-cvs/upload-cv-modal'

export function MyCVsPage() {
  const navigate = useNavigate()
  const { cvs, loading, createCV, analyzeCV, deleteCV, exportCV, refresh } = useCV()
  const [createOpen, setCreateOpen] = useState(false)
  const [uploadOpen, setUploadOpen] = useState(false)
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

  const defaultUploadId = useMemo(() => selectedCvId ?? cvs[0]?.id ?? null, [selectedCvId, cvs])

  // Filter CVs based on search query
  const filteredCVs = useMemo(() => {
    if (!searchQuery.trim()) {
      return cvs
    }
    const query = searchQuery.toLowerCase().trim()
    return cvs.filter(
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
    await exportCV(id, format)
  }

  const handleDelete = async (id: string) => {
    setBusyId(id)
    await deleteCV(id)
    setBusyId(null)
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
            variant="outline"
            className="gap-2 rounded-full border-border/60"
            onClick={() => {
              setUploadOpen(true)
              setSelectedCvId(cvs[0]?.id ?? null)
            }}
          >
            <UploadIcon className="size-4" />
            Upload CV
          </Button>
          <Button 
            className="gap-2 rounded-full" 
            onClick={() => navigate('/cv-builder')}
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
                <th className="px-6 py-4 text-left">AI Score</th>
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
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    {searchQuery ? 'No CVs found matching your search.' : 'No CVs found. Create your first CV!'}
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
                      <ScoreCircle score={cv.score} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          className="rounded-full bg-blue-500/20 text-blue-600"
                          variant="ghost"
                          onClick={() => navigate(`/cv-builder?id=${cv.id}`)}
                        >
                          <Sparkles className="mr-1 size-4" />
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
                          className="rounded-full bg-purple-500/20 text-purple-100"
                          variant="ghost"
                          onClick={() => navigate('/ai-rewrite', { state: { cvId: cv.id } })}
                        >
                          Rewrite
                        </Button>
                        <Button
                          size="sm"
                          className="rounded-full bg-muted/40 text-muted-foreground"
                          variant="ghost"
                          onClick={() => handleExport(cv.id, 'pdf')}
                        >
                          <Download className="mr-1 size-4" />
                          Export
                        </Button>
                        <Button
                          size="sm"
                          className="rounded-full bg-muted/30 text-muted-foreground"
                          variant="ghost"
                          onClick={() => {
                            setSelectedCvId(cv.id)
                            setUploadOpen(true)
                          }}
                        >
                          <UploadIcon className="mr-1 size-4" />
                          Upload
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="rounded-full text-destructive"
                          onClick={() => handleDelete(cv.id)}
                          disabled={busyId === cv.id}
                        >
                          <Trash2 className="mr-1 size-4" />
                          Delete
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
            <div className="py-8 text-center text-muted-foreground">
              {searchQuery ? 'No CVs found matching your search.' : 'No CVs found. Create your first CV!'}
            </div>
          ) : (
            filteredCVs.map((cv) => (
              <CVCard
                key={cv.id}
                cv={cv}
                onEdit={(id) => navigate(`/cv-builder?id=${id}`)}
                onAnalyze={handleAnalyze}
                onRewrite={(id) => navigate('/ai-rewrite', { state: { cvId: id } })}
                onExport={(id, format) => handleExport(id, format)}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>

      <CreateCvModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={async (payload) => {
          try {
            await createCV(payload)
            // Refresh CVs list after successful creation
            // This is handled by useCV hook's fetchCVs in createCV
          } catch (err) {
            // Error is handled by useCV hook
          }
        }}
      />
      <UploadCvModal
        open={uploadOpen}
        onClose={() => {
          setUploadOpen(false)
          setSelectedCvId(null)
        }}
        cvId={defaultUploadId}
        onUploadSuccess={refresh}
      />
    </section>
  )
}


========
export * from '@/features/candidate/my-cvs/my-cvs-page'
>>>>>>>> cc5f27092afd6cf6f701b8fbb0be3a8b618f8c93:matchCV_Project/frontend/features/my-cvs/my-cvs-page.tsx
