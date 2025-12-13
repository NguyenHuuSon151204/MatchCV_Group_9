import { useState } from 'react'
import { Modal } from '@/components/common/modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface CreateCvDialogProps {
    open: boolean
    onClose: () => void
    onCreate: (data: { name: string; fullName: string; position: string; description: string }) => Promise<void>
}

export function CreateCvDialog({ open, onClose, onCreate }: CreateCvDialogProps) {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        fullName: '',
        position: '',
        description: ''
    })

    const handleSubmit = async () => {
        if (!formData.name.trim()) {
            return // Require only CV name
        }

        setLoading(true)
        try {
            await onCreate(formData)
            // Reset form
            setFormData({ name: '', fullName: '', position: '', description: '' })
            onClose()
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Create New CV"
            description="Just name your CV."
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={loading || !formData.name}>
                        {loading ? 'Creating...' : 'Create CV'}
                    </Button>
                </>
            }
        >
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        CV Name (File Name)
                    </label>
                    <Input
                        placeholder="e.g. My Fullstack CV"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        autoFocus
                    />
                </div>
            </div>
        </Modal>
    )
}
