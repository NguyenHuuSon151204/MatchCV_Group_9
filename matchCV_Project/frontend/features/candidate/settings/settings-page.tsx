<<<<<<<< HEAD:matchCV_Project/frontend/features/candidate/settings/settings-page.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { useTheme } from '@/components/providers/theme-provider'

const languages = ['English', 'Vietnamese', 'Japanese']

export function SettingsPage() {
  const { theme, toggleTheme } = useTheme()
  const [profile, setProfile] = useState({
    fullName: 'Nguyễn Anh',
    email: 'anh.nguyen@example.com',
    headline: 'Senior Frontend Engineer',
    bio: '',
  })
  const [language, setLanguage] = useState(languages[0])

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
              <div className="size-16 rounded-full bg-gradient-to-br from-primary to-primary/50" />
              <Button variant="outline" className="rounded-full border-border/60">
                Upload Avatar
              </Button>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-card-foreground">Full name</label>
              <Input value={profile.fullName} onChange={(e) => setProfile((prev) => ({ ...prev, fullName: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-card-foreground">Email</label>
              <Input value={profile.email} onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))} />
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
            <Button className="rounded-full">Save profile</Button>
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


========
export * from '@/features/candidate/settings/settings-page'
>>>>>>>> cc5f27092afd6cf6f701b8fbb0be3a8b618f8c93:matchCV_Project/frontend/features/settings/settings-page.tsx
