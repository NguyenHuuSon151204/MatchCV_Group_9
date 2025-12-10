import * as React from 'react'

interface AlertDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

interface AlertDialogContentProps {
  children: React.ReactNode
  className?: string
}

interface AlertDialogHeaderProps {
  children: React.ReactNode
  className?: string
}

interface AlertDialogTitleProps {
  children: React.ReactNode
  className?: string
}

interface AlertDialogDescriptionProps {
  children: React.ReactNode
  className?: string
}

interface AlertDialogFooterProps {
  children: React.ReactNode
  className?: string
}

export function AlertDialog({ open, onOpenChange, children }: AlertDialogProps) {
  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={() => onOpenChange(false)}
      />

      {/* Alert Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-card border border-border/40 rounded-3xl shadow-2xl shadow-black/20 w-full max-w-sm"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>
  )
}

export function AlertDialogContent({ children, className = '' }: AlertDialogContentProps) {
  return <div className={`p-6 ${className}`}>{children}</div>
}

export function AlertDialogHeader({ children, className = '' }: AlertDialogHeaderProps) {
  return <div className={`mb-4 ${className}`}>{children}</div>
}

export function AlertDialogTitle({ children, className = '' }: AlertDialogTitleProps) {
  return (
    <h2 className={`text-xl font-semibold text-card-foreground ${className}`}>
      {children}
    </h2>
  )
}

export function AlertDialogDescription({ children, className = '' }: AlertDialogDescriptionProps) {
  return <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>
}

export function AlertDialogFooter({ children, className = '' }: AlertDialogFooterProps) {
  return (
    <div className={`flex gap-3 justify-end border-t border-border/30 pt-4 mt-6 ${className}`}>
      {children}
    </div>
  )
}
