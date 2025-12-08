import apiClient from '@/lib/services/api-client'
import {
  AnalyzeResult,
  CreateCVInput,
  CV,
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
    // Backend: GET /api/cv/user/{userId}
    let userId = typeof window !== 'undefined' ? window.localStorage.getItem('matchcv-userId') : null
    if (!userId) userId = '1'

    const response = await apiClient.get<CV[]>(`/cv/user/${userId}`)
    // Backend returns array of DocumentDto
    const data = response.data as unknown as any[]
    return Array.isArray(data) ? data.map(mapDocumentDtoToCV) : []
  },

  async getCV(id: string): Promise<CV | null> {
    const response = await apiClient.get<CV>(`/cv/${id}`)
    return mapDocumentDtoToCV(response.data)
  },

  async createCV(payload: CreateCVInput): Promise<CV> {
    const userId = typeof window !== 'undefined' ? window.localStorage.getItem('matchcv-userId') : null
    if (!userId) throw new Error('User ID not found')

    const response = await apiClient.post<CV>('/cv/create', {
      OriginalName: payload.name,
      originalName: payload.name, // Redundant fallback
      Title: payload.name,
      title: payload.name, // Redundant fallback
      CvData: payload.cvData ? payload.cvData : {
        personalInfo: {
          fullName: 'User',
          position: payload.position,
          summary: payload.description
        }
      },
      cvData: payload.cvData ? payload.cvData : {
        personalInfo: {
          fullName: 'User',
          position: payload.position,
          summary: payload.description
        }
      }
    }, {
      params: { userId: parseInt(userId, 10) }
    })

    const created = mapDocumentDtoToCV(response.data)
    return {
      ...created,
      position: payload.position,
      description: payload.description,
    }
  },

  async updateCV(payload: UpdateCVInput): Promise<CV> {
    const response = await apiClient.put<CV>(`/cv/${payload.id}`, {
      OriginalName: payload.name,
      DocType: 'CV',
    })
    return mapDocumentDtoToCV(response.data)
  },

  async uploadCV(id: string | null, file: File): Promise<UploadResult> {
    const formData = new FormData()
    formData.append('file', file)

    const params: { id?: number; userId?: number } = {}

    let userIdStr = typeof window !== 'undefined' ? window.localStorage.getItem('matchcv-userId') : null
    if (!userIdStr) userIdStr = '1'
    params.userId = parseInt(userIdStr, 10)

    if (id) {
      const idNum = parseInt(id, 10)
      if (!isNaN(idNum) && idNum > 0) {
        params.id = idNum
      }
    }

    const response = await apiClient.post<any>(`/cv/upload`, formData, { params })
    const doc = response.data
    return {
      fileName: doc.FileName || file.name,
      fileSize: doc.FileSize || file.size,
      uploadedAt: doc.UpdatedAt || new Date().toISOString(),
    }
  },

  async analyzeCV(id: string): Promise<AnalyzeResult> {
    return withFallback(
      async () => {
        const response = await apiClient.post<any>(`/cv/analyze/${id}`)
        const data = response.data

        let evidence: string[] = []
        if (data.Evidence) {
          if (typeof data.Evidence === 'string') {
            try {
              const parsed = JSON.parse(data.Evidence)
              evidence = Array.isArray(parsed) ? parsed : [data.Evidence]
            } catch {
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
        return {
          score,
          evidence: ['Strong quantifiable impact', 'Clear growth trajectory'],
          suggestions: ['Highlight leadership achievements', 'Add metrics'],
        }
      }
    )
  },

  async deleteCV(id: string): Promise<void> {
    await apiClient.delete(`/cv/${id}`)
  },

  async exportCV(id: string, format: 'pdf' | 'docx' | 'json'): Promise<Blob> {
    const response = await apiClient.post(`/export/cv`, {
      cvId: parseInt(id),
      format: format
    }, {
      responseType: 'blob',
    })
    return response.data
  },
}
