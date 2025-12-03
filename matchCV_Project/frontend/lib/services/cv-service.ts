import apiClient from '@/lib/services/api-client'
import {
  AnalyzeResult,
  CreateCVInput,
  CV,
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
  
  return {
    id: dto.Id?.toString() || dto.id?.toString() || '',
    name: dto.OriginalName || dto.name || 'Untitled CV',
    position: dto.DocType || dto.position || '',
    description: dto.FileName || dto.description,
    modifiedAt,
    status: mapBackendStatusToFrontend(dto.Status || dto.status || 'draft'),
    score: dto.TotalScore ?? dto.AiConfidence ?? dto.score,
    fileUrl: dto.FileName ? `/uploads/${dto.FileName}` : undefined,
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

export const cvService = {
  async getCVs(): Promise<CV[]> {
    return withFallback(
      async () => {
        // Backend: GET /api/cv/user/{userId}
        const userId = typeof window !== 'undefined' ? window.localStorage.getItem('matchcv-userId') : null
        if (!userId) {
          throw new Error('User ID not found')
        }
        const response = await apiClient.get<CV[]>(`/cv/user/${userId}`)
        // Backend returns array of DocumentDto, need to map to CV
        return Array.isArray(response.data) ? response.data.map(mapDocumentDtoToCV) : []
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
        // Backend: GET /api/cv/{id}?userId={userId}
        const response = await apiClient.get<CV>(`/cv/${id}`)
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
        })
        return mapDocumentDtoToCV(response.data)
      },
      async () => {
        await delay(200)
        cvStore = cvStore.map((cv) => (cv.id === payload.id ? { ...cv, ...payload } : cv))
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
        
        const params: { id?: number } = {}
        if (id) {
          const idNum = parseInt(id, 10)
          if (!isNaN(idNum) && idNum > 0) {
            params.id = idNum
          }
        }
        
        // Don't set Content-Type header - axios will set it automatically with boundary for FormData
        const response = await apiClient.post<any>(`/cv/upload`, formData, {
          params,
        })
        
        // Backend returns DocumentDto wrapped in BaseResponseDto
        const doc = response.data
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
        await apiClient.delete(`/cv/${id}`)
      },
      async () => {
        await delay(150)
        cvStore = cvStore.filter((cv) => cv.id !== id)
      }
    )
  },

  async exportCV(id: string, format: 'pdf' | 'docx' | 'json'): Promise<Blob> {
    return withFallback(
      async () => {
        const response = await apiClient.get(`/cv/${id}/export`, {
          params: { format },
          responseType: 'blob',
        })
        return response.data
      },
      async () => {
        await delay(200)
        const cv = cvStore.find((item) => item.id === id)
        if (!cv) throw new Error('CV not found')
        const content = `CV: ${cv.name}\nPosition: ${cv.position}\nStatus: ${cv.status}\nScore: ${
          cv.score ?? 'N/A'
        }\nGenerated: ${new Date().toISOString()}`
        return new Blob([content], { type: 'text/plain' })
      }
    )
  },
}
