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
        if (!formData.name || !formData.fullName || !formData.position) {
            return // Add validation if needed
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
            description="Enter the details for your new CV."
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={loading || !formData.name || !formData.fullName || !formData.position}>
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
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Your Full Name
                    </label>
                    <Input
                        placeholder="e.g. John Doe"
                        value={formData.fullName}
                        onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Target Position
                    </label>
                    <Input
                        placeholder="e.g. Senior Software Engineer"
                        value={formData.position}
                        onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Description (Optional)
                    </label>
                    <Textarea
                        placeholder="Briefly describe what this CV is for..."
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    />
                </div>
            </div>
        </Modal>
    )
}
