"use client"

import { Suspense } from "react"
import ChooseRole from "@/components/auth/ChooseRole"

function ChooseRoleContent() {
  return <ChooseRole />
}

export default function ChooseRolePage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <ChooseRoleContent />
    </Suspense>
  )
}

