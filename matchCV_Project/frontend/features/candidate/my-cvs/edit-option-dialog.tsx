import { Modal } from '@/components/common/modal'
import { Upload, PenTool } from 'lucide-react'

interface EditOptionDialogProps {
    open: boolean
    onClose: () => void
    onSelectOption: (option: 'upload' | 'builder') => void
}

export function EditOptionDialog({ open, onClose, onSelectOption }: EditOptionDialogProps) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Edit CV"
            description="How would you like to edit this CV?"
            footer={null}
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
                        <h3 className="font-medium text-foreground">Upload New File</h3>
                        <p className="text-sm text-muted-foreground">
                            Update by uploading a new file from your computer
                        </p>
                    </div>
                </button>

                <button
                    onClick={() => onSelectOption('builder')}
                    className="flex flex-col items-center justify-center gap-4 rounded-xl border border-border/50 bg-card p-6 text-center shadow-sm transition-all hover:border-primary/50 hover:bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                    <div className="flex size-12 items-center justify-center rounded-full bg-purple-500/10 text-purple-600">
                        <PenTool className="size-6" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="font-medium text-foreground">Use CV Builder</h3>
                        <p className="text-sm text-muted-foreground">
                            Edit visually using the online builder
                        </p>
                    </div>
                </button>
            </div>
        </Modal>
    )
}
