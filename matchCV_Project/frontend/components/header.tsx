"use client"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
              M
            </div>
            <span className="hidden sm:inline">MatchCV</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Tính năng
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Cách hoạt động
            </Link>
            <Link href="#team" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Nhóm phát triển
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/auth/login"
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
            >
              Đăng nhập
            </Link>
            <Link
              href="/auth/register"
              className={cn(buttonVariants({ variant: "default", size: "sm" }), "bg-primary hover:bg-primary/90")}
            >
              Đăng ký miễn phí
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-md transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 space-y-3">
            <Link
              href="#features"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              Tính năng
            </Link>
            <Link
              href="#how-it-works"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              Cách hoạt động
            </Link>
            <Link
              href="#team"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              Nhóm phát triển
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              <Link
                href="/auth/login"
                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full bg-transparent")}
              >
                Đăng nhập
              </Link>
              <Link
                href="/auth/register"
                className={cn(buttonVariants({ variant: "default", size: "sm" }), "w-full bg-primary hover:bg-primary/90")}
              >
                Đăng ký miễn phí
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
