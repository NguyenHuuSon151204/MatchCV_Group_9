'use client'

import { useState } from 'react'
import { adminService } from '@/lib/services/admin-service'
import { Save, RotateCcw } from 'lucide-react'

interface Config {
  siteName: string
  siteUrl: string
  emailNotifications: boolean
  aiEnabled: boolean
  maxFileSize: number
  allowedFileTypes: string[]
  sessionTimeout: number
  maintenanceMode: boolean
}

export function SystemConfigurationPage() {
  const [config, setConfig] = useState<Config>({
    siteName: 'MatchCV',
    siteUrl: 'https://matchcv.com',
    emailNotifications: true,
    aiEnabled: true,
    maxFileSize: 10,
    allowedFileTypes: ['pdf', 'doc', 'docx'],
    sessionTimeout: 30,
    maintenanceMode: false,
  })

  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<{ type: string; text: string } | null>(null)

  const handleChange = (field: keyof Config, value: any) => {
    setConfig((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    setSaveMessage(null)

    try {
      await adminService.updateAISettings(config)
      setSaveMessage({ type: 'success', text: 'Configuration saved successfully!' })
      setTimeout(() => setSaveMessage(null), 3000)
    } catch (error: any) {
      setSaveMessage({ type: 'error', text: error.message || 'Failed to save configuration' })
      setTimeout(() => setSaveMessage(null), 3000)
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      setConfig({
        siteName: 'MatchCV',
        siteUrl: 'https://matchcv.com',
        emailNotifications: true,
        aiEnabled: true,
        maxFileSize: 10,
        allowedFileTypes: ['pdf', 'doc', 'docx'],
        sessionTimeout: 30,
        maintenanceMode: false,
      })
      setSaveMessage({ type: 'info', text: 'Settings reset to default values' })
      setTimeout(() => setSaveMessage(null), 3000)
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <div className="text-sm text-muted-foreground mb-1">Home / System Configuration</div>
          <h1 className="text-2xl font-bold mb-2">System Configuration</h1>
          <p className="text-muted-foreground">
            Manage system settings, preferences, and platform configuration
          </p>
        </div>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 border rounded hover:bg-accent flex items-center gap-2"
            onClick={handleReset}
          >
            <RotateCcw size={16} />
            Reset to Default
          </button>
          <button
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 flex items-center gap-2 disabled:opacity-50"
            onClick={handleSave}
            disabled={saving}
          >
            <Save size={16} />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {saveMessage && (
        <div
          className={`mb-4 p-4 rounded-lg ${
            saveMessage.type === 'success'
              ? 'bg-green-100 text-green-800'
              : saveMessage.type === 'error'
                ? 'bg-red-100 text-red-800'
                : 'bg-blue-100 text-blue-800'
          }`}
        >
          {saveMessage.text}
        </div>
      )}

      <div className="space-y-6">
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">General Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Site Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded bg-background"
                value={config.siteName}
                onChange={(e) => handleChange('siteName', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Site URL</label>
              <input
                type="url"
                className="w-full px-3 py-2 border rounded bg-background"
                value={config.siteUrl}
                onChange={(e) => handleChange('siteUrl', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Session Timeout (minutes)</label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded bg-background"
                value={config.sessionTimeout}
                onChange={(e) => handleChange('sessionTimeout', parseInt(e.target.value))}
                min="5"
                max="120"
              />
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Notifications</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="size-4"
                checked={config.emailNotifications}
                onChange={(e) => handleChange('emailNotifications', e.target.checked)}
              />
              <span>Enable Email Notifications</span>
            </label>
            <p className="text-sm text-muted-foreground">
              Send email notifications for important system events
            </p>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">AI Settings</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="size-4"
                checked={config.aiEnabled}
                onChange={(e) => handleChange('aiEnabled', e.target.checked)}
              />
              <span>Enable AI Features</span>
            </label>
            <p className="text-sm text-muted-foreground">
              Enable AI-powered CV matching and summarization
            </p>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">File Upload Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Max File Size (MB)</label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded bg-background"
                value={config.maxFileSize}
                onChange={(e) => handleChange('maxFileSize', parseInt(e.target.value))}
                min="1"
                max="100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Allowed File Types</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded bg-background"
                value={config.allowedFileTypes.join(', ')}
                onChange={(e) =>
                  handleChange(
                    'allowedFileTypes',
                    e.target.value.split(',').map((s) => s.trim())
                  )
                }
                placeholder="pdf, doc, docx"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Comma-separated list of allowed file extensions
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">System Maintenance</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="size-4"
                checked={config.maintenanceMode}
                onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
              />
              <span>Maintenance Mode</span>
            </label>
            <p className="text-sm text-muted-foreground">
              Enable maintenance mode to restrict access to the platform
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
