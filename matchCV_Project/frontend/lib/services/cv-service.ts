import apiClient from '@/lib/services/api-client'
import {
  AnalyzeResult,
  CreateCVInput,
  CV,
  CVData,
  CVStatus,
  UpdateCVInput,
  UploadResult,
} from '@/lib/types'

const mockCVs: CV[] = [
  {
    id: '1',
    name: 'Software Engineer Resume',
    position: 'Software Engineer',
    description: 'Full-stack development position',
    modifiedAt: new Date().toISOString(),
    status: 'analyzed',
    score: 82,
    evidence: ['Strong technical skills', 'Relevant experience', 'Excellent project portfolio'],
  },
  {
    id: '2',
    name: 'Marketing Specialist Resume',
    position: 'Marketing Specialist',
    description: 'Digital marketing role',
    modifiedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'submitted',
    score: 75,
  },
  {
    id: '3',
    name: 'Data Analyst Resume',
    position: 'Data Analyst',
    description: 'Analytics and insights',
    modifiedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'draft',
  },
  {
    id: '4',
    name: 'Product Manager Resume',
    position: 'Product Manager',
    description: 'Product strategy and execution',
    modifiedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'activing',
  },
  {
    id: '5',
    name: 'UX Designer Resume',
    position: 'UX Designer',
    description: 'User experience design',
    modifiedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'draft',
  },
]

let cvStore = [...mockCVs]
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Backend DocumentDto structure (from C#)
interface DocumentDto {
  Id: number
  UserId: number
  OriginalName: string
  DocType: string
  FileName?: string
  ContentType?: string
  FileSize?: number
  AiConfidence?: number
  TotalScore?: number
  Status: string
  CreatedAt: string
  UpdatedAt: string
  SkillsCount?: number
  ExperiencesCount?: number
  EducationsCount?: number
  CvData?: CVData
}

// Map backend DocumentDto to frontend CV
function mapDocumentDtoToCV(dto: DocumentDto | any): CV {
  // Handle date conversion - backend returns DateTime as ISO string
  let modifiedAt = new Date().toISOString()
  if (dto.UpdatedAt) {
    try {
      const date = new Date(dto.UpdatedAt)
      if (!isNaN(date.getTime())) {
        modifiedAt = date.toISOString()
      }
    } catch {
      // Keep default if parsing fails
    }
  } else if (dto.modifiedAt) {
    try {
      const date = new Date(dto.modifiedAt)
      if (!isNaN(date.getTime())) {
        modifiedAt = date.toISOString()
      }
    } catch {
      // Keep default if parsing fails
    }
  }

  const cvData = dto.CvData || dto.cvData
  const name =
    dto.OriginalName ||
    dto.originalName ||
    dto.Title ||
    dto.title ||
    dto.name ||
    'Untitled CV'
  const position =
    dto.position ||
    dto.Position ||
    dto.DocType ||
    dto.docType ||
    dto.TemplateType ||
    dto.templateType ||
    (cvData?.personalInfo?.position ?? '')

  const storagePath =
    dto.StoragePath ||
    dto.storagePath ||
    dto.FileName && `uploads/${dto.FileName}` ||
    dto.fileName && `uploads/${dto.fileName}` ||
    undefined

  return {
    id: dto.Id?.toString() || dto.id?.toString() || '',
    name,
    position,
    description: dto.FileName || dto.fileName || dto.description,
    modifiedAt,
    status: mapBackendStatusToFrontend(dto.Status || dto.status || 'draft'),
    score: dto.TotalScore ?? dto.AiConfidence ?? dto.score,
    fileUrl: storagePath ? (storagePath.startsWith('/') ? storagePath : `/${storagePath}`) : undefined,
    cvData,
  }
}

// Map backend status to frontend CVStatus (case-insensitive)
function mapBackendStatusToFrontend(status: string): CVStatus {
  if (!status) return 'draft'

  const statusLower = status.toLowerCase()
  const statusMap: Record<string, CVStatus> = {
    draft: 'draft',
    uploaded: 'uploaded',
    analyzed: 'analyzed',
    submitted: 'submitted',
    active: 'activing',
  }
  return statusMap[statusLower] || 'draft'
}

async function withFallback<T>(request: () => Promise<T>, fallback: () => Promise<T>): Promise<T> {
  try {
    return await request()
  } catch (error) {
    console.warn('[cvService] falling back to mock data', error)
    return fallback()
  }
}

// Derive backend origin (strip /api)
function getBackendOrigin(): string {
  const base = apiClient.defaults.baseURL || 'http://localhost:5185/api'
  try {
    const url = new URL(base)
    url.pathname = ''
    url.search = ''
    url.hash = ''
    return url.origin
  } catch {
    return 'http://localhost:5185'
  }
}

export const cvService = {
  async getCVs(): Promise<CV[]> {
    return withFallback(
      async () => {
        // Backend: GET /api/cv/user/{userId}
        let userId: string | null = null
        if (typeof window !== 'undefined') {
          userId =
            window.localStorage.getItem('matchcv-userId') ||
            window.localStorage.getItem('userId')
        }
        if (!userId) {
          console.warn('[cvService.getCVs] userId not found in localStorage')
          throw new Error('User ID not found')
        }
        console.info('[cvService.getCVs] fetching CVs for userId', userId)
        const response = await apiClient.get<CV[]>(`/cv/user/${userId}`)
        console.info('[cvService.getCVs] raw response data', response.data)

        // Unwrap possible shapes
        const payload = Array.isArray(response.data)
          ? response.data
          : Array.isArray((response.data as any)?.data)
            ? (response.data as any).data
            : []

        const mapped = payload.map(mapDocumentDtoToCV)
        console.info('[cvService.getCVs] mapped count', mapped.length)
        return mapped
      },
      async () => {
        await delay(300)
        return cvStore
      }
    )
  },

  async getCV(id: string): Promise<CV | null> {
    return withFallback(
      async () => {
        let userId: string | null = null
        if (typeof window !== 'undefined') {
          userId =
            window.localStorage.getItem('matchcv-userId') ||
            window.localStorage.getItem('userId')
        }
        console.info('[cvService.getCV] fetching CV by id', id, 'userId', userId)
        // Backend: GET /api/cv/{id}?userId={userId}
        const response = await apiClient.get<CV>(`/cv/${id}`, {
          params: userId ? { userId: parseInt(userId, 10) } : undefined,
        })
        return mapDocumentDtoToCV(response.data)
      },
      async () => {
        await delay(200)
        return cvStore.find((cv) => cv.id === id) || null
      }
    )
  },

  async createCV(payload: CreateCVInput): Promise<CV> {
    return withFallback(
      async () => {
        // Backend: POST /api/cv/create?userId={userId}
        // Backend expects: { OriginalName, TemplateId? }
        const response = await apiClient.post<CV>('/cv/create', {
          OriginalName: payload.name || `${payload.position} Resume`,
        })
        const created = mapDocumentDtoToCV(response.data)
        // Update with additional frontend fields
        return {
          ...created,
          position: payload.position,
          description: payload.description,
        }
      },
      async () => {
        await delay(250)
        const newCV: CV = {
          id: Date.now().toString(),
          name: payload.name,
          position: payload.position,
          description: payload.description,
          modifiedAt: new Date().toISOString(),
          status: 'draft',
        }
        cvStore = [newCV, ...cvStore]
        return newCV
      }
    )
  },

  async updateCV(payload: UpdateCVInput): Promise<CV> {
    return withFallback(
      async () => {
        // Backend: PUT /api/cv/{id}?userId={userId}
        const response = await apiClient.put<CV>(`/cv/${payload.id}`, {
          OriginalName: payload.name,
          DocType: 'CV',
          ...(payload.cvData ? { CvData: payload.cvData } : {}),
        })
        return mapDocumentDtoToCV(response.data)
      },
      async () => {
        await delay(200)
        cvStore = cvStore.map((cv) =>
          cv.id === payload.id
            ? {
              ...cv,
              ...payload,
              cvData: payload.cvData ?? cv.cvData,
              modifiedAt: new Date().toISOString(),
            }
            : cv
        )
        const updated = cvStore.find((cv) => cv.id === payload.id)
        if (!updated) {
          throw new Error('CV not found')
        }
        return updated
      }
    )
  },

  async uploadCV(id: string | null, file: File): Promise<UploadResult> {
    return withFallback(
      async () => {
        // Backend: POST /api/cv/upload?userId={userId}&id={id}
        // If id is null or empty, backend will create new CV
        const formData = new FormData()
        formData.append('file', file)

        let userId: string | null = null
        if (typeof window !== 'undefined') {
          userId = window.localStorage.getItem('matchcv-userId') || window.localStorage.getItem('userId')
        }

        const params: { id?: number; userId?: number } = {}
        if (id) {
          const idNum = parseInt(id, 10)
          if (!isNaN(idNum) && idNum > 0) {
            params.id = idNum
          }
        }
        if (userId) {
          const userIdNum = parseInt(userId, 10)
          if (!isNaN(userIdNum) && userIdNum > 0) {
            params.userId = userIdNum
          }
        }

        // Don't set Content-Type header - axios will set it automatically with boundary for FormData
        const response = await apiClient.post<any>(`/cv/upload`, formData, {
          params,
        })

        // Backend returns DocumentDto wrapped in BaseResponseDto
        const payload = response.data?.data ?? response.data
        const doc = payload?.data ?? payload
        return {
          fileName: doc.FileName || file.name,
          fileSize: doc.FileSize || file.size,
          uploadedAt: doc.UpdatedAt || new Date().toISOString(),
        }
      },
      async () => {
        await delay(600)
        if (id) {
          cvStore = cvStore.map((cv) =>
            cv.id === id ? { ...cv, status: 'uploaded', modifiedAt: new Date().toISOString() } : cv
          )
        }
        return {
          fileName: file.name,
          fileSize: file.size,
          uploadedAt: new Date().toISOString(),
        }
      }
    )
  },

  async analyzeCV(id: string): Promise<AnalyzeResult> {
    return withFallback(
      async () => {
        // Backend: POST /api/cv/analyze/{id}?userId={userId}
        const response = await apiClient.post<any>(`/cv/analyze/${id}`)
        // Backend returns AnalysisResultDto: { DocumentId, Score, Confidence, Evidence (string), Skills, Experiences, Educations }
        const data = response.data

        // Handle Evidence - could be string, array, or JSON string
        let evidence: string[] = []
        if (data.Evidence) {
          if (typeof data.Evidence === 'string') {
            try {
              // Try parsing as JSON array first
              const parsed = JSON.parse(data.Evidence)
              evidence = Array.isArray(parsed) ? parsed : [data.Evidence]
            } catch {
              // If not JSON, check if it's comma-separated
              evidence = data.Evidence.includes(',')
                ? data.Evidence.split(',').map((e: string) => e.trim()).filter(Boolean)
                : [data.Evidence]
            }
          } else if (Array.isArray(data.Evidence)) {
            evidence = data.Evidence
          }
        } else if (data.EvidenceList && Array.isArray(data.EvidenceList)) {
          evidence = data.EvidenceList
        }

        return {
          score: Math.round(data.Score || data.TotalScore || 0),
          evidence,
          suggestions: data.Skills?.map((s: any) => `${s.Name} (${s.Proficiency})`) || [],
        }
      },
      async () => {
        await delay(1000)
        const score = Math.floor(Math.random() * 25) + 70
        cvStore = cvStore.map((cv) =>
          cv.id === id
            ? {
              ...cv,
              status: 'analyzed',
              score,
              evidence: ['Strong quantifiable impact', 'Clear growth trajectory', 'Relevant keyword density'],
              modifiedAt: new Date().toISOString(),
            }
            : cv
        )
        return {
          score,
          evidence: ['Strong quantifiable impact', 'Clear growth trajectory', 'Relevant keyword density'],
          suggestions: [
            'Highlight leadership achievements',
            'Refine summary for role-specific keywords',
            'Add metrics for recent projects',
          ],
        }
      }
    )
  },

  async deleteCV(id: string): Promise<void> {
    return withFallback(
      async () => {
        // Backend: DELETE /api/cv/{id}?userId={userId}
        const userId =
          (typeof window !== 'undefined' && (window.localStorage.getItem('matchcv-userId') || window.localStorage.getItem('userId'))) ||
          undefined
        await apiClient.delete(`/cv/${id}`, {
          params: userId ? { userId: parseInt(userId, 10) } : undefined,
        })
        console.info('[cvService.deleteCV] deleted from backend', id)
      },
      async () => {
        console.warn('[cvService.deleteCV] backend delete failed, using mock store', id)
        await delay(150)
        cvStore = cvStore.filter((cv) => cv.id !== id)
      }
    )
  },

  async downloadCV(id: string): Promise<Blob> {
    return withFallback(
      async () => {
        // Use backend download API: GET /api/cv/download/{id}?userId={userId}
        let userId: string | null = null
        if (typeof window !== 'undefined') {
          userId =
            window.localStorage.getItem('matchcv-userId') ||
            window.localStorage.getItem('userId')
        }

        const params: { userId?: number } = {}
        if (userId) {
          const userIdNum = parseInt(userId, 10)
          if (!isNaN(userIdNum) && userIdNum > 0) {
            params.userId = userIdNum
          }
        }

        console.info('[cvService.downloadCV] downloading CV', id, 'userId', userId)

        // Use axios to download file
        const response = await apiClient.get(`/cv/download/${id}`, {
          params,
          responseType: 'blob',
        })

        return response.data
      },
      async () => {
        await delay(200)
        const fallback = 'Download unavailable in offline mode.'
        return new Blob([fallback], { type: 'text/plain' })
      }
    )
  },

  async exportCV(id: string, format: 'pdf' | 'docx' | 'json'): Promise<Blob> {
    return withFallback(
      async () => {
        // Prefer rendering from cvData (template export) if available
        const detail = await this.getCV(id)
        const cvData = detail?.cvData
        console.info('[cvService.exportCV] detail for export', detail)

        // Try template-based export first; on failure fall back to backend export endpoint
        if (cvData) {
          try {
            const response = await apiClient.post('/Template/export/pdf', cvData, {
              responseType: 'blob',
            })
            return response.data
          } catch (error) {
            console.warn('[cvService.exportCV] template export failed, falling back', error)
            // Continue to fallback below
          }
        }

        // Fallback to backend export endpoint with stored file
        const response = await apiClient.post(
          '/export/cv',
          { CvId: parseInt(id, 10), Format: format },
          { responseType: 'blob' }
        )
        return response.data
      },
      async () => {
        await delay(200)
        const cv = cvStore.find((item) => item.id === id)
        if (!cv) {
          const fallback = 'Preview unavailable (CV not found in mock store).'
          return new Blob([fallback], { type: 'text/plain' })
        }
        const content = `CV: ${cv.name}\nPosition: ${cv.position}\nStatus: ${cv.status}\nScore: ${cv.score ?? 'N/A'
          }\nGenerated: ${new Date().toISOString()}`
        return new Blob([content], { type: 'text/plain' })
      }
    )
  },
}
