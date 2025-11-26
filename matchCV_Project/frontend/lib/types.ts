export type CVStatus = 'draft' | 'uploaded' | 'analyzed' | 'submitted' | 'activing'

export interface CV {
  id: string
  name: string
  position: string
  description?: string
  modifiedAt: string
  status: CVStatus
  score?: number
  evidence?: string[]
  fileUrl?: string
}

export interface CreateCVInput {
  name: string
  position: string
  description?: string
}

export interface UpdateCVInput extends Partial<CreateCVInput> {
  id: string
}

export interface AnalyzeResult {
  score: number
  evidence: string[]
  suggestions?: string[]
}

export interface UploadResult {
  fileName: string
  fileSize: number
  uploadedAt: string
}

export interface ActivityItem {
  id: string
  title: string
  description: string
  timestamp: string
}

export interface DashboardMetrics {
  totalCVs: number
  analyzedCVs: number
  averageScore: number
  exportedCVs: number
  activity: ActivityItem[]
}

export interface JDAnalysisResult {
  skills: string[]
  priorities: string[]
  suggestions: string[]
}

export type RewriteSection = 'summary' | 'experience' | 'skills'

export interface RewritePayload {
  cvId: string
  section: RewriteSection
  context?: string
  instructions?: string
}

export interface RewriteResponse {
  output: string
  highlights: string[]
}

export interface Job {
  id: number
  userId: number
  title: string
  company: string
  rawText?: string
  jobDescription?: string
  status: string
  createdAt: string
  updatedAt: string
}

export interface CreateJobInput {
  title: string
  company: string
  jobDescription?: string
  rawText?: string
}

export interface UpdateJobInput {
  id: number
  title?: string
  company?: string
  jobDescription?: string
  rawText?: string
  status?: string
}

