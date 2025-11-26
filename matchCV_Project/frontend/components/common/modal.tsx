'use client'

import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

interface ModalProps {
  title: string
  description?: string
  open: boolean
  onClose: () => void
  children: React.ReactNode
  footer?: React.ReactNode
  size?: 'md' | 'lg'
}

export function Modal({
  title,
  description,
  open,
  onClose,
  children,
  footer,
  size = 'md',
}: ModalProps) {
  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div
        className={`w-full rounded-3xl bg-card/95 p-6 shadow-2xl backdrop-blur-2xl ${
          size === 'lg' ? 'max-w-3xl' : 'max-w-xl'
        }`}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">{title}</h3>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-border p-1 text-muted-foreground transition hover:bg-muted/30"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="space-y-4">{children}</div>
        {footer && <div className="mt-6 flex justify-end gap-3">{footer}</div>}
      </div>
    </div>,
    document.body
  )
}

