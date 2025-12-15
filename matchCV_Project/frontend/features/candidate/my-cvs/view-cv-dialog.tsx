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
    const [isPdf, setIsPdf] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const downloadName = `${cv?.name || 'CV'}.pdf`

    // Clean up blob URL when dialog closes or CV changes
    useEffect(() => {
        return () => {
            if (blobUrl) {
                URL.revokeObjectURL(blobUrl)
            }
        }
    }, [blobUrl])

    useEffect(() => {
        if (!open || !cv) {
            setBlobUrl(null)
            setError(null)
            return
        }

        const fetchPreview = async () => {
            setLoading(true)
            setError(null)
            try {
                let blob: Blob | null = null
                let lastError: unknown = null
                const hasFile = !!cv.fileUrl
                const hasCvData = !!cv.cvData

                const tryExport = async () => {
                    if (!hasCvData) return
                    try {
                        blob = await cvService.exportCV(cv.id, 'pdf')
                    } catch (err) {
                        lastError = err
                        blob = null
                    }
                }

                const tryDownload = async () => {
                    try {
                        blob = await cvService.downloadCV(cv.id)
                    } catch (err: any) {
                        // If server says not found, stop and show re-upload message
                        const message = err instanceof Error ? err.message : ''
                        if (message.toLowerCase().includes('not found')) {
                            lastError = new Error('File CV không còn trên máy chủ. Vui lòng tải lại (re-upload) CV này.')
                        } else {
                            lastError = err
                        }
                        blob = null
                    }
                }

                if (hasFile) {
                    await tryDownload()
                    if (!blob && hasCvData) {
                        await tryExport()
                    }
                } else {
                    await tryExport() // export (builder) or skip if no cvData
                }

                if (!blob) {
                    const message =
                        lastError instanceof Error
                            ? lastError.message
                            : 'Unable to load preview. Try re-uploading hoặc lưu lại CV.'
                    setError(message)
                    return
                }

                // If we receive plain text, it's likely an error/fallback from service
                if (blob.type?.toLowerCase().includes('text/plain')) {
                    const text = (await blob.text()) || ''
                    const lower = text.toLowerCase()
                    if (lower.includes('mock store') || lower.includes('offline')) {
                        setError('File CV không còn trên máy chủ. Vui lòng tải lại (re-upload) CV này.')
                        return
                    }
                    setError(text || 'Unable to load CV preview')
                    return
                }

                const url = URL.createObjectURL(blob)
                setBlobUrl(url)
                setIsPdf(blob.type?.toLowerCase().includes('pdf') || cv.fileUrl?.toLowerCase().endsWith('.pdf') || false)
            } catch (error) {
                console.error('Failed to generate preview', error)
                setBlobUrl(null)
                setError(error instanceof Error ? error.message : 'Unable to load preview')
            } finally {
                setLoading(false)
            }
        }

        fetchPreview()
    }, [open, cv])

    if (!cv) return null

    const viewerUrl = blobUrl

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
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center h-full gap-4 text-center p-6">
                            <div className="bg-muted p-4 rounded-full">
                                <FileText className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <div className="max-w-md">
                                <p className="font-medium text-lg">Unable to load preview</p>
                                <p className="text-muted-foreground mt-1">{error}</p>
                            </div>
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
                    {viewerUrl && !error && (
                        <>
                            <Button variant="outline" asChild>
                                <a href={viewerUrl} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    Open in New Tab
                                </a>
                            </Button>
                            <Button variant="secondary" asChild>
                                <a href={viewerUrl} download={downloadName}>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download
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
