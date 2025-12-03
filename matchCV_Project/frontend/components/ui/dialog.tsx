import * as React from 'react'

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

interface DialogContentProps {
  children: React.ReactNode
  className?: string
}

interface DialogHeaderProps {
  children: React.ReactNode
  className?: string
}

interface DialogTitleProps {
  children: React.ReactNode
  className?: string
}

interface DialogBodyProps {
  children: React.ReactNode
  className?: string
}

interface DialogFooterProps {
  children: React.ReactNode
  className?: string
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={() => onOpenChange(false)}
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-card border border-border/40 rounded-3xl shadow-2xl shadow-black/20 w-full max-w-xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>
  )
}

export function DialogContent({ children, className = '' }: DialogContentProps) {
  return <div className={`p-6 ${className}`}>{children}</div>
}

export function DialogHeader({ children, className = '' }: DialogHeaderProps) {
  return <div className={`mb-4 ${className}`}>{children}</div>
}

export function DialogTitle({ children, className = '' }: DialogTitleProps) {
  return (
    <h2 className={`text-2xl font-semibold text-card-foreground ${className}`}>
      {children}
    </h2>
  )
}

export function DialogBody({ children, className = '' }: DialogBodyProps) {
  return <div className={`space-y-4 ${className}`}>{children}</div>
}

export function DialogFooter({ children, className = '' }: DialogFooterProps) {
  return (
    <div className={`flex gap-3 justify-end border-t border-border/30 pt-4 mt-6 ${className}`}>
      {children}
    </div>
  )
}
