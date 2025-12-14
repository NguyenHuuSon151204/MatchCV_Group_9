'use client'

import { useState, useEffect } from 'react'
import { Save, Mail, Brain, Upload, Shield, Bell } from 'lucide-react'

interface SystemConfig {
    email: {
        senderEmail: string
        smtpServer: string
        smtpPort: number
    }
    ai: {
        provider: string
        model: string
        apiKey: string
    }
    upload: {
        maxFileSize: number
        allowedTypes: string[]
    }
    security: {
        sessionTimeout: number
        maxLoginAttempts: number
    }
    notifications: {
        emailNotifications: boolean
        adminAlerts: boolean
    }
}

export function AdminConfigPage() {
    const [config, setConfig] = useState<SystemConfig>({
        email: {
            senderEmail: 'matchcv928@gmail.com',
            smtpServer: 'smtp.gmail.com',
            smtpPort: 587,
        },
        ai: {
            provider: 'Google',
            model: 'gemini-pro',
            apiKey: '••••••••••••••••',
        },
        upload: {
            maxFileSize: 10,
            allowedTypes: ['pdf', 'doc', 'docx'],
        },
        security: {
            sessionTimeout: 30,
            maxLoginAttempts: 5,
        },
        notifications: {
            emailNotifications: true,
            adminAlerts: true,
        },
    })

    const [saving, setSaving] = useState(false)
    const [activeTab, setActiveTab] = useState('email')

    const handleSave = async () => {
        setSaving(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setSaving(false)
        alert('Configuration saved successfully!')
    }

    const tabs = [
        { id: 'email', label: 'Email Settings', icon: Mail },
        { id: 'ai', label: 'AI Configuration', icon: Brain },
        { id: 'upload', label: 'Upload Limits', icon: Upload },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'notifications', label: 'Notifications', icon: Bell },
    ]

    return (
        <div className="p-6">
            <div className="mb-6">
                <div className="text-sm text-muted-foreground mb-1">Home / Configuration</div>
                <h1 className="text-2xl font-bold mb-2">System Configuration</h1>
                <p className="text-muted-foreground">
                    Manage platform settings and configurations
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar Tabs */}
                <div className="lg:col-span-1">
                    <div className="bg-card border rounded-lg p-2 space-y-1">
                        {tabs.map((tab) => {
                            const Icon = tab.icon
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === tab.id
                                            ? 'bg-primary text-primary-foreground'
                                            : 'hover:bg-accent'
                                        }`}
                                >
                                    <Icon size={18} />
                                    <span className="text-sm font-medium">{tab.label}</span>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Content Area */}
                <div className="lg:col-span-3">
                    <div className="bg-card border rounded-lg p-6">
                        {activeTab === 'email' && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold mb-4">Email Configuration</h3>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Sender Email</label>
                                    <input
                                        type="email"
                                        value={config.email.senderEmail}
                                        onChange={(e) =>
                                            setConfig({
                                                ...config,
                                                email: { ...config.email, senderEmail: e.target.value },
                                            })
                                        }
                                        className="w-full px-3 py-2 border rounded bg-background"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">SMTP Server</label>
                                    <input
                                        type="text"
                                        value={config.email.smtpServer}
                                        onChange={(e) =>
                                            setConfig({
                                                ...config,
                                                email: { ...config.email, smtpServer: e.target.value },
                                            })
                                        }
                                        className="w-full px-3 py-2 border rounded bg-background"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">SMTP Port</label>
                                    <input
                                        type="number"
                                        value={config.email.smtpPort}
                                        onChange={(e) =>
                                            setConfig({
                                                ...config,
                                                email: { ...config.email, smtpPort: parseInt(e.target.value) },
                                            })
                                        }
                                        className="w-full px-3 py-2 border rounded bg-background"
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'ai' && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold mb-4">AI Configuration</h3>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Provider</label>
                                    <select
                                        value={config.ai.provider}
                                        onChange={(e) =>
                                            setConfig({ ...config, ai: { ...config.ai, provider: e.target.value } })
                                        }
                                        className="w-full px-3 py-2 border rounded bg-background"
                                    >
                                        <option value="Google">Google (Gemini)</option>
                                        <option value="OpenAI">OpenAI (GPT)</option>
                                        <option value="Anthropic">Anthropic (Claude)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Model</label>
                                    <select
                                        value={config.ai.model}
                                        onChange={(e) =>
                                            setConfig({ ...config, ai: { ...config.ai, model: e.target.value } })
                                        }
                                        className="w-full px-3 py-2 border rounded bg-background"
                                    >
                                        <option value="gemini-pro">Gemini Pro</option>
                                        <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
                                        <option value="gpt-4">GPT-4</option>
                                        <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">API Key</label>
                                    <input
                                        type="password"
                                        value={config.ai.apiKey}
                                        onChange={(e) =>
                                            setConfig({ ...config, ai: { ...config.ai, apiKey: e.target.value } })
                                        }
                                        className="w-full px-3 py-2 border rounded bg-background"
                                        placeholder="Enter API key"
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">
                                        API key is stored securely and encrypted
                                    </p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'upload' && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold mb-4">Upload Limits</h3>
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Max File Size (MB)
                                    </label>
                                    <input
                                        type="number"
                                        value={config.upload.maxFileSize}
                                        onChange={(e) =>
                                            setConfig({
                                                ...config,
                                                upload: { ...config.upload, maxFileSize: parseInt(e.target.value) },
                                            })
                                        }
                                        className="w-full px-3 py-2 border rounded bg-background"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Allowed File Types</label>
                                    <div className="space-y-2">
                                        {['pdf', 'doc', 'docx', 'txt'].map((type) => (
                                            <label key={type} className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={config.upload.allowedTypes.includes(type)}
                                                    onChange={(e) => {
                                                        const newTypes = e.target.checked
                                                            ? [...config.upload.allowedTypes, type]
                                                            : config.upload.allowedTypes.filter((t) => t !== type)
                                                        setConfig({
                                                            ...config,
                                                            upload: { ...config.upload, allowedTypes: newTypes },
                                                        })
                                                    }}
                                                    className="rounded"
                                                />
                                                <span className="text-sm">.{type}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Session Timeout (minutes)
                                    </label>
                                    <input
                                        type="number"
                                        value={config.security.sessionTimeout}
                                        onChange={(e) =>
                                            setConfig({
                                                ...config,
                                                security: {
                                                    ...config.security,
                                                    sessionTimeout: parseInt(e.target.value),
                                                },
                                            })
                                        }
                                        className="w-full px-3 py-2 border rounded bg-background"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Max Login Attempts
                                    </label>
                                    <input
                                        type="number"
                                        value={config.security.maxLoginAttempts}
                                        onChange={(e) =>
                                            setConfig({
                                                ...config,
                                                security: {
                                                    ...config.security,
                                                    maxLoginAttempts: parseInt(e.target.value),
                                                },
                                            })
                                        }
                                        className="w-full px-3 py-2 border rounded bg-background"
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
                                <label className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={config.notifications.emailNotifications}
                                        onChange={(e) =>
                                            setConfig({
                                                ...config,
                                                notifications: {
                                                    ...config.notifications,
                                                    emailNotifications: e.target.checked,
                                                },
                                            })
                                        }
                                        className="rounded"
                                    />
                                    <div>
                                        <p className="font-medium">Email Notifications</p>
                                        <p className="text-sm text-muted-foreground">
                                            Send email notifications to users
                                        </p>
                                    </div>
                                </label>
                                <label className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={config.notifications.adminAlerts}
                                        onChange={(e) =>
                                            setConfig({
                                                ...config,
                                                notifications: {
                                                    ...config.notifications,
                                                    adminAlerts: e.target.checked,
                                                },
                                            })
                                        }
                                        className="rounded"
                                    />
                                    <div>
                                        <p className="font-medium">Admin Alerts</p>
                                        <p className="text-sm text-muted-foreground">
                                            Receive alerts for important system events
                                        </p>
                                    </div>
                                </label>
                            </div>
                        )}

                        <div className="mt-6 pt-6 border-t flex justify-end">
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 flex items-center gap-2 disabled:opacity-50"
                            >
                                <Save size={16} />
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
