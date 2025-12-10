import apiClient from '@/lib/services/api-client'
import { CreateJobInput, Job, UpdateJobInput } from '@/lib/types'

// Backend trả về dạng BaseResponseDto<T>
interface BaseResponseDto<T> {
  success: boolean
  message: string
  data: T
}

// Backend JobDto structure
interface JobDto {
  Id: number
  UserId: number
  Title: string
  Company: string
  RawText?: string
  JobDescription?: string
  Status: string
  CreatedAt: string
  UpdatedAt: string
}

// Map backend JobDto to frontend Job
function mapJobDtoToJob(dto: JobDto | any): Job {
  return {
    id: dto.Id ?? dto.id,
    userId: dto.UserId ?? dto.userId,
    title: dto.Title ?? dto.title,
    company: dto.Company ?? dto.company,
    rawText: dto.RawText ?? dto.rawText,
    jobDescription: dto.JobDescription ?? dto.jobDescription,
    status: dto.Status ?? dto.status,
    createdAt: dto.CreatedAt ?? dto.createdAt,
    updatedAt: dto.UpdatedAt ?? dto.updatedAt,
  }
}

// Unwrap API responses that might be raw arrays or BaseResponseDto-wrapped
const unwrapJobArray = (payload: any): JobDto[] => {
  if (Array.isArray(payload)) return payload
  if (payload?.data && Array.isArray(payload.data)) return payload.data
  if (payload?.Data && Array.isArray(payload.Data)) return payload.Data
  return []
}

const unwrapJob = (payload: any): JobDto | null => {
  if (!payload) return null
  if (payload?.data && !Array.isArray(payload.data)) return payload.data as JobDto
  if (payload?.Data && !Array.isArray(payload.Data)) return payload.Data as JobDto
  return payload as JobDto
}

async function withFallback<T>(request: () => Promise<T>, fallback: () => Promise<T>): Promise<T> {
  try {
    return await request()
  } catch (error) {
    console.warn('[jobService] falling back to mock data', error)
    return fallback()
  }
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

let jobStore: Job[] = [
  {
    id: 1,
    userId: 1,
    title: 'Senior Software Engineer',
    company: 'Tech Corp',
    jobDescription: 'We are looking for an experienced software engineer...',
    status: 'Active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    userId: 1,
    title: 'Full Stack Developer',
    company: 'StartupXYZ',
    jobDescription: 'Join our dynamic team as a full stack developer...',
    status: 'Active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export const jobService = {
  // FIXED: Bóc đúng response.data.data từ BaseResponseDto
  async getJobs(searchTerm?: string, status?: string, userId?: number): Promise<Job[]> {
    return withFallback(
      async () => {
        const params: any = {}
        if (searchTerm) params.searchTerm = searchTerm
        if (status) params.status = status
        if (userId) params.userId = userId

        const response = await apiClient.get<JobDto[] | BaseResponseDto<JobDto[]>>('/job/search', { params })
        const jobs = unwrapJobArray(response.data)
        return jobs.map(mapJobDtoToJob)
      },
      async () => {
        await delay(300)
        let filtered = [...jobStore]
        if (searchTerm) {
          const term = searchTerm.toLowerCase()
          filtered = filtered.filter(
            (job) =>
              job.title.toLowerCase().includes(term) ||
              job.company.toLowerCase().includes(term) ||
              job.jobDescription?.toLowerCase().includes(term)
          )
        }
        if (status) {
          filtered = filtered.filter((job) => job.status === status)
        }
        if (userId) {
          filtered = filtered.filter((job) => job.userId === userId)
        }
        return filtered
      }
    )
  },

  // FIXED: getUserJobs
  async getUserJobs(userId: number): Promise<Job[]> {
    return withFallback(
      async () => {
        const response = await apiClient.get<JobDto[] | BaseResponseDto<JobDto[]>>(`/job/user/${userId}`)
        const jobs = unwrapJobArray(response.data)
        return jobs.map(mapJobDtoToJob)
      },
      async () => {
        await delay(300)
        return jobStore.filter((job) => job.userId === userId)
      }
    )
  },

  // FIXED: getJob
  async getJob(id: number): Promise<Job | null> {
    return withFallback(
      async () => {
        const userIdStr = typeof window !== 'undefined' ? window.localStorage.getItem('matchcv-userId') : null
        const userId = userIdStr ? parseInt(userIdStr, 10) : null

        const response = await apiClient.get<JobDto | BaseResponseDto<JobDto>>(`/job/${id}`, {
          params: userId ? { userId } : {},
        })
        const job = unwrapJob(response.data)
        return job ? mapJobDtoToJob(job) : null
      },
      async () => {
        await delay(200)
        return jobStore.find((job) => job.id === id) || null
      }
    )
  },

  // FIXED: createJob
  async createJob(payload: CreateJobInput): Promise<Job> {
    return withFallback(
      async () => {
        const userIdStr = typeof window !== 'undefined' ? window.localStorage.getItem('matchcv-userId') : null
        if (!userIdStr) throw new Error('User ID not found')
        const userId = parseInt(userIdStr, 10)

        const response = await apiClient.post<JobDto | BaseResponseDto<JobDto>>('/job/create', {
          Title: payload.title,
          Company: payload.company,
          JobDescription: payload.jobDescription,
          RawText: payload.rawText,
        }, {
          params: { userId },
        })

        const job = unwrapJob(response.data)
        if (!job) throw new Error('Invalid create job response')
        return mapJobDtoToJob(job)
      },
      async () => {
        await delay(250)
        const newJob: Job = {
          id: Date.now(),
          userId: 1,
          title: payload.title,
          company: payload.company,
          jobDescription: payload.jobDescription,
          rawText: payload.rawText,
          status: 'Active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        jobStore = [newJob, ...jobStore]
        return newJob
      }
    )
  },

  // FIXED: updateJob
  async updateJob(payload: UpdateJobInput): Promise<Job> {
    return withFallback(
      async () => {
        const userIdStr = typeof window !== 'undefined' ? window.localStorage.getItem('matchcv-userId') : null
        if (!userIdStr) throw new Error('User ID not found')
        const userId = parseInt(userIdStr, 10)

        const response = await apiClient.put<JobDto | BaseResponseDto<JobDto>>(`/job/${payload.id}`, {
          Title: payload.title,
          Company: payload.company,
          JobDescription: payload.jobDescription,
          RawText: payload.rawText,
          Status: payload.status,
        }, {
          params: { userId },
        })

        const job = unwrapJob(response.data)
        if (!job) throw new Error('Invalid update job response')
        return mapJobDtoToJob(job)
      },
      async () => {
        await delay(200)
        jobStore = jobStore.map((job) =>
          job.id === payload.id ? { ...job, ...payload } : job
        )
        const updated = jobStore.find((job) => job.id === payload.id)
        if (!updated) throw new Error('Job not found')
        return updated
      }
    )
  },

  // deleteJob không cần trả data → giữ nguyên
  async deleteJob(id: number): Promise<void> {
    return withFallback(
      async () => {
        const userIdStr = typeof window !== 'undefined' ? window.localStorage.getItem('matchcv-userId') : null
        if (!userIdStr) throw new Error('User ID not found')
        const userId = parseInt(userIdStr, 10)

        await apiClient.delete(`/job/${id}`, {
          params: { userId },
        })
      },
      async () => {
        await delay(150)
        jobStore = jobStore.filter((job) => job.id !== id)
      }
    )
  },

  // FIXED: uploadJob
  async uploadJob(file: File): Promise<Job> {
    return withFallback(
      async () => {
        const userIdStr = typeof window !== 'undefined' ? window.localStorage.getItem('matchcv-userId') : null
        if (!userIdStr) throw new Error('User ID not found')
        const userId = parseInt(userIdStr, 10)

        const formData = new FormData()
        formData.append('file', file)

        const response = await apiClient.post<JobDto | BaseResponseDto<JobDto>>('/job/upload', formData, {
          params: { userId },
        })

        const job = unwrapJob(response.data)
        if (!job) throw new Error('Invalid upload job response')
        return mapJobDtoToJob(job)
      },
      async () => {
        await delay(600)
        const newJob: Job = {
          id: Date.now(),
          userId: 1,
          title: file.name.replace(/\.[^/.]+$/, ''),
          company: 'Uploaded Company',
          rawText: `Content from ${file.name}`,
          jobDescription: `Job description extracted from ${file.name}`,
          status: 'Active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        jobStore = [newJob, ...jobStore]
        return newJob
      }
    )
  },
}
