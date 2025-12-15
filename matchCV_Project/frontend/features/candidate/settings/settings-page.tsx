'use client'

import { useContext, useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { useTheme } from '@/components/providers/theme-provider'
import { AuthContext } from '@/contexts/AuthContext'
import { useToastContext } from '@/contexts/toast-context'

const languages = ['English', 'Vietnamese', 'Japanese']

export function SettingsPage() {
  const { theme, toggleTheme } = useTheme()
  const auth = useContext(AuthContext)
  const toast = useToastContext()
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    headline: '',
    bio: '',
    avatarBase64: '',
  })
  const [language, setLanguage] = useState(languages[0])
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

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

  useEffect(() => {
    if (!auth?.user) return
    const currentUser = auth.user
    setProfile((prev) => ({
      ...prev,
      fullName: currentUser.displayName || '',
      email: currentUser.email || '',
      avatarBase64: currentUser.avatarBase64 || prev.avatarBase64,
    }))
    if (currentUser.avatarBase64) {
      setAvatarPreview(`data:image/png;base64,${currentUser.avatarBase64}`)
    }
    const storedExtras = typeof window !== 'undefined' ? localStorage.getItem('matchcv-profile-extras') : null
    if (storedExtras) {
      try {
        const parsed = JSON.parse(storedExtras)
        setProfile((prev) => ({
          ...prev,
          fullName: parsed.displayName || prev.fullName,
          email: parsed.email || prev.email,
          headline: parsed.headline || '',
          bio: parsed.bio || '',
          avatarBase64: parsed.avatarBase64 || '',
        }))
        if (parsed.language && languages.includes(parsed.language)) {
          setLanguage(parsed.language)
        }
        if (parsed.avatarBase64) {
          setAvatarPreview(`data:image/png;base64,${parsed.avatarBase64}`)
        }
      } catch {
        // ignore malformed storage
      }
    }
  }, [auth?.user])

  const handleSaveProfile = async () => {
    if (!auth) return
    setSaving(true)
    try {
      await auth.updateProfile({
        displayName: profile.fullName,
        email: profile.email,
        avatarBase64: profile.avatarBase64,
      })
      localStorage.setItem(
        'matchcv-profile-extras',
        JSON.stringify({
          userId: auth.user?.id,
          displayName: profile.fullName,
          email: profile.email,
          headline: profile.headline,
          bio: profile.bio,
          language,
          avatarBase64: profile.avatarBase64,
        })
      )
      toast.success('Profile updated', 'Your profile changes have been saved.')
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || 'Unable to update profile.'
      toast.error('Update failed', message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">Profile</p>
        <h1 className="text-3xl font-semibold text-card-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Update personal info, security, theme, and localization.</p>
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
                Upload Avatar
              </Button>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-card-foreground">Full name</label>
              <Input
                value={profile.fullName}
                onChange={(e) => setProfile((prev) => ({ ...prev, fullName: e.target.value }))}
                placeholder="Your display name"
              />
              <p className="text-xs text-muted-foreground">Name will be used across your profile and CV exports.</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-card-foreground">Email</label>
              <Input
                value={profile.email}
                disabled
                className="bg-muted/40"
                title="Email comes from your account. Contact support to change."
              />
              <p className="text-xs text-muted-foreground">Email is managed by your account. Contact support to change.</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-card-foreground">Headline</label>
              <Input value={profile.headline} onChange={(e) => setProfile((prev) => ({ ...prev, headline: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-card-foreground">Bio</label>
              <Textarea
                className="min-h-[120px] rounded-3xl"
                value={profile.bio}
                placeholder="Share highlights for recruiters..."
                onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
              />
            </div>
            <Button className="rounded-full" onClick={handleSaveProfile} disabled={saving}>
              {saving ? 'Saving...' : 'Save profile'}
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-none bg-card/80 shadow-lg shadow-black/5">
            <CardHeader>
              <CardTitle className="text-lg">Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input type="password" placeholder="Current password" />
              <Input type="password" placeholder="New password" />
              <Input type="password" placeholder="Confirm password" />
              <Button className="w-full rounded-full">Change password</Button>
            </CardContent>
          </Card>

          <Card className="border-none bg-card/80 shadow-lg shadow-black/5">
            <CardHeader>
              <CardTitle className="text-lg">Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-2xl border border-border/40 bg-background/30 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-destructive">Logout</p>
                  <p className="text-xs text-muted-foreground">Sign out of your account</p>
                </div>
                <Button variant="destructive" className="rounded-full" onClick={() => auth?.logout()}>
                  Logout
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-border/40 bg-background/30 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold">Theme</p>
                  <p className="text-xs text-muted-foreground">Toggle between light and dark mode</p>
                </div>
                <Button variant="secondary" className="rounded-full" onClick={toggleTheme}>
                  {theme === 'dark' ? 'Dark' : 'Light'}
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-border/40 bg-background/30 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold">Language</p>
                  <p className="text-xs text-muted-foreground">UI language for AI explanations</p>
                </div>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="rounded-full border border-border bg-background/70 px-4 py-2 text-sm"
                >
                  {languages.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
