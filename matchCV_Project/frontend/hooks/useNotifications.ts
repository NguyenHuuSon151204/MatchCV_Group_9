import { useCallback, useEffect, useMemo, useState } from 'react'
import { notificationService, type NotificationItem } from '@/lib/services/notification-service'

interface UseNotificationsOptions {
  role?: string
  userId?: number
  pollMs?: number
}

export function useNotifications(options: UseNotificationsOptions) {
  const { role, userId, pollMs = 60000 } = options
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const [loading, setLoading] = useState(false)

  const fetchData = useCallback(async () => {
    if (!role && !userId) return
    setLoading(true)
    try {
      const data = await notificationService.list(role, userId)
      setNotifications(data)
    } catch (error) {
      console.warn('[useNotifications] fetch failed', error)
      setNotifications([])
    } finally {
      setLoading(false)
    }
  }, [role, userId])

  const markAsRead = useCallback(
    async (id: number | string) => {
      try {
        await notificationService.markAsRead(id)
      } catch (error) {
        console.warn('[useNotifications] markAsRead failed', error)
      } finally {
        setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
      }
    },
    []
  )

  const markAllAsRead = useCallback(async () => {
    try {
      await notificationService.markAllAsRead(role, userId)
    } catch (error) {
      console.warn('[useNotifications] markAllAsRead failed', error)
    } finally {
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
    }
  }, [role, userId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    if (!pollMs || pollMs < 10000) return
    const id = setInterval(fetchData, pollMs)
    return () => clearInterval(id)
  }, [fetchData, pollMs])

  const unreadCount = useMemo(() => notifications.filter((n) => !n.isRead).length, [notifications])

  return {
    notifications,
    loading,
    unreadCount,
    refetch: fetchData,
    markAsRead,
    markAllAsRead,
  }
}

export type { NotificationItem }

