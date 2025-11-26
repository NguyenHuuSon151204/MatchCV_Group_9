import apiClient from '@/lib/services/api-client'
import { CreateJobInput, Job, UpdateJobInput } from '@/lib/types'

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
  async getJobs(searchTerm?: string, status?: string, userId?: number): Promise<Job[]> {
    return withFallback(
      async () => {
        const params: any = {}
        if (searchTerm) params.searchTerm = searchTerm
        if (status) params.status = status
        if (userId) params.userId = userId

        const response = await apiClient.get<JobDto[]>(`/job/search`, { params })
        return Array.isArray(response.data) ? response.data.map(mapJobDtoToJob) : []
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

  async getUserJobs(userId: number): Promise<Job[]> {
    return withFallback(
      async () => {
        const response = await apiClient.get<JobDto[]>(`/job/user/${userId}`)
        return Array.isArray(response.data) ? response.data.map(mapJobDtoToJob) : []
      },
      async () => {
        await delay(300)
        return jobStore.filter((job) => job.userId === userId)
      }
    )
  },

  async getJob(id: number): Promise<Job | null> {
    return withFallback(
      async () => {
        const userId = typeof window !== 'undefined' ? window.localStorage.getItem('matchcv-userId') : null
        const response = await apiClient.get<JobDto>(`/job/${id}`, {
          params: userId ? { userId: parseInt(userId, 10) } : {},
        })
        return mapJobDtoToJob(response.data)
      },
      async () => {
        await delay(200)
        return jobStore.find((job) => job.id === id) || null
      }
    )
  },

  async createJob(payload: CreateJobInput): Promise<Job> {
    return withFallback(
      async () => {
        const userId = typeof window !== 'undefined' ? window.localStorage.getItem('matchcv-userId') : null
        if (!userId) {
          throw new Error('User ID not found')
        }
        const response = await apiClient.post<JobDto>('/job/create', {
          Title: payload.title,
          Company: payload.company,
          JobDescription: payload.jobDescription,
          RawText: payload.rawText,
        }, {
          params: { userId: parseInt(userId, 10) },
        })
        return mapJobDtoToJob(response.data)
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

  async updateJob(payload: UpdateJobInput): Promise<Job> {
    return withFallback(
      async () => {
        const userId = typeof window !== 'undefined' ? window.localStorage.getItem('matchcv-userId') : null
        if (!userId) {
          throw new Error('User ID not found')
        }
        const response = await apiClient.put<JobDto>(`/job/${payload.id}`, {
          Title: payload.title,
          Company: payload.company,
          JobDescription: payload.jobDescription,
          RawText: payload.rawText,
          Status: payload.status,
        }, {
          params: { userId: parseInt(userId, 10) },
        })
        return mapJobDtoToJob(response.data)
      },
      async () => {
        await delay(200)
        jobStore = jobStore.map((job) => (job.id === payload.id ? { ...job, ...payload } : job))
        const updated = jobStore.find((job) => job.id === payload.id)
        if (!updated) {
          throw new Error('Job not found')
        }
        return updated
      }
    )
  },

  async deleteJob(id: number): Promise<void> {
    return withFallback(
      async () => {
        const userId = typeof window !== 'undefined' ? window.localStorage.getItem('matchcv-userId') : null
        if (!userId) {
          throw new Error('User ID not found')
        }
        await apiClient.delete(`/job/${id}`, {
          params: { userId: parseInt(userId, 10) },
        })
      },
      async () => {
        await delay(150)
        jobStore = jobStore.filter((job) => job.id !== id)
      }
    )
  },

  async uploadJob(file: File): Promise<Job> {
    return withFallback(
      async () => {
        const userId = typeof window !== 'undefined' ? window.localStorage.getItem('matchcv-userId') : null
        if (!userId) {
          throw new Error('User ID not found')
        }
        const formData = new FormData()
        formData.append('file', file)

        const response = await apiClient.post<JobDto>(`/job/upload`, formData, {
          params: { userId: parseInt(userId, 10) },
        })
        return mapJobDtoToJob(response.data)
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

