import apiClient from '@/lib/services/api-client'

export interface NotificationItem {
  id: number
  title: string
  message: string
  role: string
  time: string
  category?: 'info' | 'success' | 'warning'
  isRead?: boolean
}

export const notificationService = {
  async list(role?: string, userId?: number): Promise<NotificationItem[]> {
    const params: any = {}
    if (role) params.role = role
    if (userId) params.userId = userId
    const response = await apiClient.get<{ data: NotificationItem[] }>('/notifications', { params })
    return (response.data as any)?.data ?? (response as any)?.data ?? []
  },

  async markAsRead(id: number | string): Promise<void> {
    await apiClient.post(`/notifications/${id}/read`)
  },

  async markAllAsRead(role?: string, userId?: number): Promise<void> {
    const params: any = {}
    if (role) params.role = role
    if (userId) params.userId = userId
    await apiClient.post('/notifications/read-all', null, { params })
  },
}

