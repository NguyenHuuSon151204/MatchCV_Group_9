import { Modal } from '@/components/common/modal'
import { Upload, FileText, PenTool } from 'lucide-react'

interface CreateOptionDialogProps {
    open: boolean
    onClose: () => void
    onSelectOption: (option: 'upload' | 'manual') => void
}

export function CreateOptionDialog({ open, onClose, onSelectOption }: CreateOptionDialogProps) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Create New CV"
            description="How would you like to start?"
            footer={null} // No footer needed, selection acts as action
        >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <button
                    onClick={() => onSelectOption('upload')}
                    className="flex flex-col items-center justify-center gap-4 rounded-xl border border-border/50 bg-card p-6 text-center shadow-sm transition-all hover:border-primary/50 hover:bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                    <div className="flex size-12 items-center justify-center rounded-full bg-blue-500/10 text-blue-600">
                        <Upload className="size-6" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="font-medium text-foreground">Upload Existing CV</h3>
                        <p className="text-sm text-muted-foreground">
                            Parse content from a PDF or DOCX file
                        </p>
                    </div>
                </button>

                <button
                    onClick={() => onSelectOption('manual')}
                    className="flex flex-col items-center justify-center gap-4 rounded-xl border border-border/50 bg-card p-6 text-center shadow-sm transition-all hover:border-primary/50 hover:bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                    <div className="flex size-12 items-center justify-center rounded-full bg-purple-500/10 text-purple-600">
                        <PenTool className="size-6" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="font-medium text-foreground">Create from Scratch</h3>
                        <p className="text-sm text-muted-foreground">
                            Enter details manually to build your CV
                        </p>
                    </div>
                </button>
            </div>
        </Modal>
    )
}
