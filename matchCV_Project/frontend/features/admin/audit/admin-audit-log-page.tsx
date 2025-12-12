'use client'

import { useEffect, useState } from 'react'
import { adminService } from '@/lib/services/admin-service'
import { Filter, RefreshCw } from 'lucide-react'

interface AdminLog {
    id: number
    actor: string
    action: string
    entity: string
    entityId?: number
    metaJson: string
    createdAt: string
}

export function AdminAuditLogPage() {
    const [logs, setLogs] = useState<AdminLog[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [filters, setFilters] = useState({
        action: '',
        entity: '',
    })

    useEffect(() => {
        loadLogs()
    }, [])

    const loadLogs = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await adminService.getLogs({})
            setLogs(Array.isArray(response.data) ? response.data : [])
        } catch (err: any) {
            console.error('Failed to load logs:', err)
            setError('Failed to load audit logs. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const filteredLogs = logs.filter((log) => {
        if (filters.action && log.action !== filters.action) return false
        if (filters.entity && log.entity !== filters.entity) return false
        return true
    })

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('vi-VN')
    }

    const getActionColor = (action: string) => {
        switch (action.toUpperCase()) {
            case 'CREATE':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            case 'UPDATE':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
            case 'DELETE':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
        }
    }

    return (
        <div className="p-6">
            <div className="mb-6 flex justify-between items-start">
                <div>
                    <div className="text-sm text-muted-foreground mb-1">Home / Audit Log</div>
                    <h1 className="text-2xl font-bold mb-2">Audit Log</h1>
                    <p className="text-muted-foreground">
                        Track all administrative actions and system changes
                    </p>
                </div>
                <button
                    className="px-4 py-2 border rounded hover:bg-accent flex items-center gap-2"
                    onClick={loadLogs}
                >
                    <RefreshCw size={16} />
                    Refresh
                </button>
            </div>

            {/* Filters */}
            <div className="mb-6 p-4 bg-card border rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                    <Filter size={16} />
                    <h3 className="font-semibold">Filters</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Action</label>
                        <select
                            className="w-full px-3 py-2 border rounded bg-background"
                            value={filters.action}
                            onChange={(e) => setFilters({ ...filters, action: e.target.value })}
                        >
                            <option value="">All Actions</option>
                            <option value="CREATE">Create</option>
                            <option value="UPDATE">Update</option>
                            <option value="DELETE">Delete</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Entity</label>
                        <select
                            className="w-full px-3 py-2 border rounded bg-background"
                            value={filters.entity}
                            onChange={(e) => setFilters({ ...filters, entity: e.target.value })}
                        >
                            <option value="">All Entities</option>
                            <option value="Job">Job</option>
                            <option value="Application">Application</option>
                            <option value="User">User</option>
                            <option value="License">License</option>
                        </select>
                    </div>
                </div>
            </div>

            {error && <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded-lg">{error}</div>}

            {/* Logs Table */}
            <div className="bg-card border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-muted">
                            <tr>
                                <th className="p-3 text-left text-sm font-medium">ID</th>
                                <th className="p-3 text-left text-sm font-medium">TIMESTAMP</th>
                                <th className="p-3 text-left text-sm font-medium">ACTOR</th>
                                <th className="p-3 text-left text-sm font-medium">ACTION</th>
                                <th className="p-3 text-left text-sm font-medium">ENTITY</th>
                                <th className="p-3 text-left text-sm font-medium">ENTITY ID</th>
                                <th className="p-3 text-left text-sm font-medium">DETAILS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="p-8 text-center text-muted-foreground">
                                        Loading logs...
                                    </td>
                                </tr>
                            ) : filteredLogs.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="p-8 text-center text-muted-foreground">
                                        No logs found.
                                    </td>
                                </tr>
                            ) : (
                                filteredLogs.map((log) => (
                                    <tr key={log.id} className="border-b hover:bg-accent/50">
                                        <td className="p-3 text-sm">#{log.id}</td>
                                        <td className="p-3 text-sm">{formatDate(log.createdAt)}</td>
                                        <td className="p-3 text-sm font-medium">{log.actor}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${getActionColor(log.action)}`}>
                                                {log.action}
                                            </span>
                                        </td>
                                        <td className="p-3 text-sm">{log.entity}</td>
                                        <td className="p-3 text-sm">{log.entityId || '-'}</td>
                                        <td className="p-3 text-sm max-w-xs truncate">
                                            {log.metaJson || '-'}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
                Showing {filteredLogs.length} of {logs.length} total logs
            </div>
        </div>
    )
}
