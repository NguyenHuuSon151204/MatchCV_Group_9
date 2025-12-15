'use client'

import { useState } from 'react'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter } from '@/components/ui/alert-dialog'
import { useCV } from '@/hooks/useCV'
import apiClient from '@/lib/services/api-client'
import type { CV } from '@/lib/types'

interface ApplyCVDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onApplied?: (payload: { jobId: number; cvId: string }) => void
  job?: {
    id: number
    title: string
    company: string
  }
}

export function ApplyCVDialog({ open, onOpenChange, job, onApplied }: ApplyCVDialogProps) {
  const { cvs, loading: cvsLoading } = useCV()
  const [selectedCV, setSelectedCV] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleApplyClick = async () => {
    if (!selectedCV || !job) return
    setShowConfirm(true)
  }

  const handleConfirmApply = async () => {
    if (!selectedCV) {
      setError('Please select a CV to apply with')
      return
    }
    if (!job) {
      setError('No job selected to apply for')
      return
    }

    setShowConfirm(false)
    setSubmitting(true)
    try {
      // Call API to submit application
      const userIdStr = typeof window !== 'undefined' ? window.localStorage.getItem('matchcv-userId') : null
      const candidateId = userIdStr ? parseInt(userIdStr, 10) : undefined
      if (!candidateId) {
        throw new Error('User not logged in')
      }

      await apiClient.post(`/recruiter/jobs/${job.id}/apply`, {
        documentId: parseInt(selectedCV, 10),
        candidateId,
      })
      onApplied?.({ jobId: job.id, cvId: selectedCV })
      setSubmitted(true)
    } catch (error) {
      console.error('Error applying:', error)
      onApplied?.({ jobId: job!.id, cvId: selectedCV! })
      setError(error instanceof Error ? error.message : 'Failed to apply')
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    setSelectedCV(null)
    setSubmitted(false)
    onOpenChange(false)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent>
          {!submitted ? (
            <>
              <DialogHeader>
                <DialogTitle>Apply for Position</DialogTitle>
                {job && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Apply for "{job.title}" at {job.company}
                  </p>
                )}
              </DialogHeader>

              <DialogBody>
                <div>
                  <label className="text-sm font-medium text-card-foreground mb-3 block">
                    Select a CV to submit:
                  </label>

                  {cvsLoading ? (
                    <div className="text-center py-8 text-muted-foreground">
                      Loading your CVs...
                    </div>
                  ) : cvs.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No CVs found. Please create a CV first.
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                      {cvs.map((cv) => (
                        <div
                          key={cv.id}
                          className={`p-4 rounded-2xl border-2 cursor-pointer transition ${
                            selectedCV === cv.id
                              ? 'border-primary bg-primary/10'
                              : 'border-border/40 bg-background/50 hover:border-primary/50'
                          }`}
                          onClick={() => setSelectedCV(cv.id)}
                        >
                          <div className="font-medium text-card-foreground">{cv.name}</div>
                          {cv.position && (
                            <div className="text-sm text-muted-foreground">{cv.position}</div>
                          )}
                          <div className="text-xs text-muted-foreground mt-1">
                            Modified: {new Date(cv.modifiedAt).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </DialogBody>

              <DialogFooter>
                <Button variant="outline" onClick={handleClose} className="rounded-full">
                  Cancel
                </Button>
                <Button
                  onClick={handleApplyClick}
                  disabled={!selectedCV || submitting}
                  className="rounded-full gap-2"
                >
                  {submitting && <Loader2 className="size-4 animate-spin" />}
                  {submitting ? 'Submitting...' : 'Confirm & Apply'}
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Application Submitted</DialogTitle>
              </DialogHeader>

              <DialogBody className="text-center space-y-4">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <CheckCircle2 className="size-8 text-primary" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">
                    Application Submitted Successfully!
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Your CV has been submitted for "{job?.title}" position at {job?.company}. 
                  </p>
                  <p className="text-muted-foreground text-sm mt-2">
                    We'll notify you when the employer reviews your application.
                  </p>
                </div>
              </DialogBody>

              <DialogFooter>
                {error && <p className="text-sm text-destructive text-center">{error}</p>}
                <Button onClick={handleClose} className="rounded-full w-full">
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirmation Alert */}
      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="size-5 text-primary" />
              Confirm Application
            </AlertDialogTitle>
            <AlertDialogDescription className="mt-2">
              Are you sure you want to submit your CV for this position?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="py-4 px-6 bg-background/50 rounded-2xl">
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">Position: </span>
                <span className="font-medium text-card-foreground">{job?.title}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Company: </span>
                <span className="font-medium text-card-foreground">{job?.company}</span>
              </div>
              <div>
                <span className="text-muted-foreground">CV: </span>
                <span className="font-medium text-card-foreground">
                  {cvs.find(cv => cv.id === selectedCV)?.name}
                </span>
              </div>
            </div>
          </div>

          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setShowConfirm(false)} className="rounded-full">
              Cancel
            </Button>
            <Button onClick={handleConfirmApply} className="rounded-full gap-2">
              {submitting && <Loader2 className="size-4 animate-spin" />}
              {submitting ? 'Submitting...' : 'Yes, Submit'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
