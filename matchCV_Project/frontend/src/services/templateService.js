import api from './api'

const TemplateService = {
  async getTemplates() {
    return api.get('/template')
  },

  async generatePreview(cvData) {
    const response = await fetch('/api/template/preview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cvData),
    })

    if (!response.ok) {
      throw new Error(await response.text())
    }

    return response.text()
  },

  async exportPdf(cvData) {
    const response = await fetch('/api/template/export/pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cvData),
    })

    if (!response.ok) {
      throw new Error(await response.text())
    }

    return response.blob()
  },
}

export default TemplateService
