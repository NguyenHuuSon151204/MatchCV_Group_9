'use client'

import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function RouterErrorBoundary() {
  const navigate = useNavigate()
  const error = useRouteError()

  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText || 'Not Found'}`
    : error instanceof Error
      ? error.message
      : 'Something went wrong'

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md rounded-3xl border border-border/40 bg-card/90 p-6 text-center shadow-xl shadow-black/5">
        <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">Oops</p>
        <h1 className="mt-2 text-2xl font-semibold text-card-foreground">Unexpected Error</h1>
        <p className="mt-2 text-sm text-muted-foreground">{message}</p>
        <div className="mt-6 flex flex-col gap-2">
          <Button className="rounded-full" onClick={() => navigate('/app')}>
            Go to dashboard
          </Button>
          <Button className="rounded-full" variant="outline" onClick={() => navigate(-1)}>
            Go back
          </Button>
        </div>
      </Card>
    </main>
  )
}
