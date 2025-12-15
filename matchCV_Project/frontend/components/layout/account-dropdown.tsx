'use client'

import { useState, useEffect, useRef, useContext } from 'react'
import { User, Settings, LogOut, ChevronDown } from 'lucide-react'
import { AuthContext } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

export function AccountDropdown() {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const authContext = useContext(AuthContext)
    const router = useRouter()

    const { user, logout, loading } = authContext || {}
    const displayUser = user ?? {
        displayName: 'User',
        email: 'user@example.com',
        role: 'User',
        avatarBase64: undefined,
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    const handleLogout = async () => {
        setIsOpen(false)
        if (logout) {
            await logout()
            router.push('/')
        }
    }

    const avatarSrc = displayUser.avatarBase64 ? `data:image/png;base64,${displayUser.avatarBase64}` : null

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                className="flex items-center gap-2 rounded-full border border-border bg-muted/30 px-3 py-1 hover:bg-muted/50 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                {avatarSrc ? (
                    <img src={avatarSrc} alt="avatar" className="size-8 rounded-full object-cover" />
                ) : (
                    <div className="size-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-semibold text-sm">
                        {displayUser.displayName?.charAt(0).toUpperCase() || 'U'}
                    </div>
                )}
                <div className="text-left hidden sm:block">
                    <p className="text-xs font-semibold leading-tight text-foreground">{displayUser.displayName || 'User'}</p>
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                        {displayUser.role || 'User'}
                    </p>
                </div>
                <ChevronDown
                    className={`size-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''
                        }`}
                />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-lg border border-border bg-card shadow-lg z-50 overflow-hidden">
                    <div className="p-4 border-b border-border bg-muted/30">
                        <p className="font-semibold text-foreground">{displayUser.displayName}</p>
                        <p className="text-sm text-muted-foreground">{displayUser.email}</p>
                        <p className="text-xs text-muted-foreground mt-1 capitalize">
                            Role: {displayUser.role}
                        </p>
                    </div>
                    <div className="py-2">
                        <button
                            className="w-full px-4 py-2 text-left text-sm hover:bg-accent flex items-center gap-3 text-destructive transition-colors"
                            onClick={handleLogout}
                        >
                            <LogOut className="size-4" />
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
