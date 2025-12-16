'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Download, ExternalLink, FileText, Loader2 } from 'lucide-react'
import { CV } from '@/lib/types'
import { cvService } from '@/lib/services/cv-service'

interface ViewCvDialogProps {
    open: boolean
    onClose: () => void
    cv: CV | null
}

export function ViewCvDialog({ open, onClose, cv }: ViewCvDialogProps) {
    const [blobUrl, setBlobUrl] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    // Clean up blob URL when dialog closes or CV changes
    useEffect(() => {
        return () => {
            if (blobUrl) {
                URL.revokeObjectURL(blobUrl)
            }
        }
    }, [blobUrl])

    useEffect(() => {
        if (open && cv) {
            const fetchPreview = async () => {
                setLoading(true)
                try {
                    // Check if CV has uploaded file (status = 'uploaded')
                    if (cv.status === 'uploaded' || cv.fileUrl) {
                        // For uploaded CVs, use download API
                        const blob = await cvService.downloadCV(cv.id)
                        const url = URL.createObjectURL(blob)
                        setBlobUrl(url)
                    } else {
                        // For draft/other CVs, generate PDF preview
                        const blob = await cvService.exportCV(cv.id, 'pdf')
                        const url = URL.createObjectURL(blob)
                        setBlobUrl(url)
                    }
                } catch (error) {
                    console.error('Failed to load preview', error)
                } finally {
                    setLoading(false)
                }
            }
            fetchPreview()
        } else if (!open) {
            setBlobUrl(null)
        }
    }, [open, cv])

    if (!cv) return null

    const backendBaseUrl = 'http://localhost:5185'
    let viewerUrl = blobUrl
    let isPdf = !!blobUrl // Blob is always PDF

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        {cv.name}
                    </DialogTitle>
                    <p className="text-sm text-muted-foreground">
                        {cv.description || 'View CV content'}
                    </p>
                </DialogHeader>

                <div className="flex-1 w-full bg-muted/20 rounded-lg border border-border/50 overflow-hidden relative">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-full gap-4 text-center p-6">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <p className="text-muted-foreground">Generating preview...</p>
                        </div>
                    ) : viewerUrl ? (
                        isPdf ? (
                            <iframe
                                src={viewerUrl}
                                className="w-full h-full"
                                title="CV Preview"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full gap-4 text-center p-6">
                                <p className="text-muted-foreground">Preview not available for this file type.</p>
                                <Button asChild variant="outline">
                                    <a href={viewerUrl} target="_blank" rel="noopener noreferrer">
                                        <Download className="mr-2 h-4 w-4" />
                                        Download File
                                    </a>
                                </Button>
                            </div>
                        )

                    ) : (
                        <div className="flex flex-col items-center justify-center h-full gap-4 text-center p-6">
                            <div className="bg-muted p-4 rounded-full">
                                <FileText className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <div className="max-w-md">
                                <p className="font-medium text-lg">Unable to load preview</p>
                                <p className="text-muted-foreground mt-1">Please try downloading the file instead.</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    {viewerUrl && (
                        <>
                            <Button variant="outline" asChild>
                                <a href={viewerUrl} download>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download
                                </a>
                            </Button>
                            <Button variant="outline" asChild>
                                <a href={viewerUrl} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    Open in New Tab
                                </a>
                            </Button>
                        </>
                    )}
                    <Button onClick={onClose}>Close</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
