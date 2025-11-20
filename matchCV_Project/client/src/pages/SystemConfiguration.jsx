import { useState } from 'react'
import './SystemConfiguration.css'
import '../components/Button.css'

function SystemConfiguration() {
  const [config, setConfig] = useState({
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
  const [saveMessage, setSaveMessage] = useState(null)

  const handleChange = (field, value) => {
    setConfig((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    setSaveMessage(null)
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false)
      setSaveMessage({ type: 'success', text: 'Configuration saved successfully!' })
      setTimeout(() => setSaveMessage(null), 3000)
    }, 1000)
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
    <div className="system-configuration">
      <div className="page-header">
        <div>
          <div className="breadcrumbs">Home / System Configuration</div>
          <h1 className="page-title">System Configuration</h1>
          <p className="page-subtitle">
            Manage system settings, preferences, and platform configuration
          </p>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline" onClick={handleReset}>
            Reset to Default
          </button>
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {saveMessage && (
        <div className={`save-message save-message-${saveMessage.type}`}>
          {saveMessage.text}
        </div>
      )}

      <div className="config-sections">
        <div className="config-section">
          <h3 className="section-title">General Settings</h3>
          <div className="config-form">
            <div className="form-group">
              <label>Site Name</label>
              <input
                type="text"
                value={config.siteName}
                onChange={(e) => handleChange('siteName', e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Site URL</label>
              <input
                type="url"
                value={config.siteUrl}
                onChange={(e) => handleChange('siteUrl', e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Session Timeout (minutes)</label>
              <input
                type="number"
                value={config.sessionTimeout}
                onChange={(e) => handleChange('sessionTimeout', parseInt(e.target.value))}
                className="form-input"
                min="5"
                max="120"
              />
            </div>
          </div>
        </div>

        <div className="config-section">
          <h3 className="section-title">Notifications</h3>
          <div className="config-form">
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={config.emailNotifications}
                  onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                  className="checkbox-input"
                />
                <span>Enable Email Notifications</span>
              </label>
              <p className="form-help">
                Send email notifications for important system events
              </p>
            </div>
          </div>
        </div>

        <div className="config-section">
          <h3 className="section-title">AI Settings</h3>
          <div className="config-form">
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={config.aiEnabled}
                  onChange={(e) => handleChange('aiEnabled', e.target.checked)}
                  className="checkbox-input"
                />
                <span>Enable AI Features</span>
              </label>
              <p className="form-help">
                Enable AI-powered CV matching and summarization
              </p>
            </div>
          </div>
        </div>

        <div className="config-section">
          <h3 className="section-title">File Upload Settings</h3>
          <div className="config-form">
            <div className="form-group">
              <label>Maximum File Size (MB)</label>
              <input
                type="number"
                value={config.maxFileSize}
                onChange={(e) => handleChange('maxFileSize', parseInt(e.target.value))}
                className="form-input"
                min="1"
                max="100"
              />
              <p className="form-help">Maximum allowed file size for uploads</p>
            </div>
            <div className="form-group">
              <label>Allowed File Types</label>
              <div className="file-types-list">
                {config.allowedFileTypes.map((type, index) => (
                  <span key={index} className="file-type-tag">
                    {type}
                  </span>
                ))}
              </div>
              <p className="form-help">Currently supported file formats</p>
            </div>
          </div>
        </div>

        <div className="config-section">
          <h3 className="section-title">System Maintenance</h3>
          <div className="config-form">
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={config.maintenanceMode}
                  onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
                  className="checkbox-input"
                />
                <span>Maintenance Mode</span>
              </label>
              <p className="form-help warning">
                ⚠️ When enabled, only administrators can access the system
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SystemConfiguration

