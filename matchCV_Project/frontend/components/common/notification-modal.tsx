'use client'

import { X, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react'

interface NotificationModalProps {
    isOpen: boolean
    onClose: () => void
    type: 'success' | 'error' | 'warning' | 'info'
    title: string
    message: string
    onConfirm?: () => void
    confirmText?: string
    cancelText?: string
}

export function NotificationModal({
    isOpen,
    onClose,
    type,
    title,
    message,
    onConfirm,
    confirmText = 'OK',
    cancelText = 'Cancel',
}: NotificationModalProps) {
    if (!isOpen) return null

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircle className="w-12 h-12 text-green-600" />
            case 'error':
                return <XCircle className="w-12 h-12 text-red-600" />
            case 'warning':
                return <AlertTriangle className="w-12 h-12 text-yellow-600" />
            case 'info':
                return <Info className="w-12 h-12 text-blue-600" />
        }
    }

    const getBgColor = () => {
        switch (type) {
            case 'success':
                return 'bg-green-50'
            case 'error':
                return 'bg-red-50'
            case 'warning':
                return 'bg-yellow-50'
            case 'info':
                return 'bg-blue-50'
        }
    }

    const getButtonColor = () => {
        switch (type) {
            case 'success':
                return 'bg-green-600 hover:bg-green-700'
            case 'error':
                return 'bg-red-600 hover:bg-red-700'
            case 'warning':
                return 'bg-yellow-600 hover:bg-yellow-700'
            case 'info':
                return 'bg-blue-600 hover:bg-blue-700'
        }
    }

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-card border rounded-lg max-w-md w-full mx-4 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6">
                    <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-full ${getBgColor()}`}>
                            {getIcon()}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-2">{title}</h3>
                            <p className="text-muted-foreground">{message}</p>
                        </div>
                        <button
                            className="text-muted-foreground hover:text-foreground"
                            onClick={onClose}
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>
                <div className="p-4 border-t flex justify-end gap-2">
                    {onConfirm ? (
                        <>
                            <button
                                className="px-4 py-2 border rounded hover:bg-accent"
                                onClick={onClose}
                            >
                                {cancelText}
                            </button>
                            <button
                                className={`px-4 py-2 text-white rounded ${getButtonColor()}`}
                                onClick={() => {
                                    onConfirm()
                                    onClose()
                                }}
                            >
                                {confirmText}
                            </button>
                        </>
                    ) : (
                        <button
                            className={`px-4 py-2 text-white rounded ${getButtonColor()}`}
                            onClick={onClose}
                        >
                            {confirmText}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
