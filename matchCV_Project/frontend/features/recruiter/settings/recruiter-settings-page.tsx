'use client'

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useToastContext } from '@/contexts/toast-context'

const STORAGE_KEY = 'matchcv-recruiter-profile'

interface RecruiterProfile {
  displayName: string
  email: string
  company: string
  title: string
  phone: string
  website: string
  address: string
  bio: string
  hiringRegions: string
  teamSize: string
  avatarBase64?: string
  userId?: number
}

const defaultProfile: RecruiterProfile = {
  displayName: '',
  email: '',
  company: '',
  title: '',
  phone: '',
  website: '',
  address: '',
  bio: '',
  hiringRegions: '',
  teamSize: '',
}

export function RecruiterSettingsPage() {
  const toast = useToastContext()
  const [profile, setProfile] = useState<RecruiterProfile>(defaultProfile)
  const [saving, setSaving] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as RecruiterProfile
        setProfile((prev) => ({ ...prev, ...parsed }))
        if (parsed.avatarBase64) setAvatarPreview(`data:image/png;base64,${parsed.avatarBase64}`)
      } catch {
        // ignore
      }
    }
  }, [])

  const handleAvatarChange = (file?: File) => {
    if (!file) return
    const maxSize = 2 * 1024 * 1024 // 2MB
    if (file.size > maxSize) {
      toast.error('Avatar too large', 'Please choose an image under 2MB.')
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64 = (reader.result as string).split(',')[1]
      setProfile((prev) => ({ ...prev, avatarBase64: base64 }))
      setAvatarPreview(`data:${file.type};base64,${base64}`)
    }
    reader.readAsDataURL(file)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const userId = typeof window !== 'undefined'
        ? parseInt(localStorage.getItem('matchcv-userId') || localStorage.getItem('userId') || '0')
        : undefined
      const payload = { ...profile, userId }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
      toast.success('Profile updated', 'Recruiter settings have been saved.')
    } catch (err: any) {
      toast.error('Update failed', err?.message || 'Unable to save settings.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">Recruiter</p>
        <h1 className="text-3xl font-semibold text-card-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Company profile and contact preferences.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-none bg-card/80 shadow-lg shadow-black/5">
          <CardHeader>
            <CardTitle className="text-lg">Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="relative">
                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={(e) => handleAvatarChange(e.target.files?.[0])}
                />
                <div className="size-16 cursor-pointer overflow-hidden rounded-full border border-border/60 bg-gradient-to-br from-primary to-primary/50">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-primary-foreground/70">
                      Add
                    </div>
                  )}
                </div>
              </label>
              <Button
                variant="outline"
                className="rounded-full border-border/60"
                onClick={() => fileInputRef.current?.click()}
              >
                Upload Logo/Avatar
              </Button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-card-foreground">Display name</label>
              <Input
                value={profile.displayName}
                onChange={(e) => setProfile((p) => ({ ...p, displayName: e.target.value }))}
                placeholder="Recruiter name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-card-foreground">Email</label>
              <Input
                value={profile.email}
                onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                placeholder="contact@company.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-card-foreground">Title</label>
              <Input
                value={profile.title}
                onChange={(e) => setProfile((p) => ({ ...p, title: e.target.value }))}
                placeholder="HR Manager, Talent Lead..."
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none bg-card/80 shadow-lg shadow-black/5">
          <CardHeader>
            <CardTitle className="text-lg">Company</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-card-foreground">Company</label>
              <Input
                value={profile.company}
                onChange={(e) => setProfile((p) => ({ ...p, company: e.target.value }))}
                placeholder="Company name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-card-foreground">Phone</label>
              <Input
                value={profile.phone}
                onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                placeholder="+84..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-card-foreground">Website</label>
              <Input
                value={profile.website}
                onChange={(e) => setProfile((p) => ({ ...p, website: e.target.value }))}
                placeholder="https://example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-card-foreground">Address</label>
              <Input
                value={profile.address}
                onChange={(e) => setProfile((p) => ({ ...p, address: e.target.value }))}
                placeholder="Office address"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none bg-card/80 shadow-lg shadow-black/5">
        <CardHeader>
          <CardTitle className="text-lg">About & Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-card-foreground">Bio / Notes</label>
            <Textarea
              className="min-h-[120px] rounded-3xl"
              value={profile.bio}
              placeholder="What roles you hire for, culture highlights, notes for candidates..."
              onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-card-foreground">Hiring regions</label>
              <Input
                value={profile.hiringRegions}
                onChange={(e) => setProfile((p) => ({ ...p, hiringRegions: e.target.value }))}
                placeholder="VN / SEA / Remote..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-card-foreground">Team size hiring for</label>
              <Input
                value={profile.teamSize}
                onChange={(e) => setProfile((p) => ({ ...p, teamSize: e.target.value }))}
                placeholder="e.g., 5 engineers this quarter"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button className="rounded-full" onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save settings'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
