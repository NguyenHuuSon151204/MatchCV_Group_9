'use client'

import { useEffect, useState } from 'react'
import { adminService } from '@/lib/services/admin-service'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Download, Calendar, TrendingUp } from 'lucide-react'

interface ReportsData {
    applicationsOverTime?: Array<{ date: string; count: number; accepted: number }>
    jobsByStatus?: Array<{ status: string; count: number }>
    userGrowth?: Array<{ month: string; users: number; recruiters: number }>
    topSkills?: Array<{ skill: string; count: number }>
    matchScoreDistribution?: Array<{ range: string; count: number }>
    applicationPipeline?: Array<{ stage: string; value: number; fill: string }>
    summary?: {
        totalUsers: number
        totalJobs: number
        totalApplications: number
        avgMatchScore: number
    }
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

export function AdminReportsPage() {
    const [data, setData] = useState<ReportsData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [dateRange, setDateRange] = useState({
        from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        to: new Date().toISOString().split('T')[0],
    })

    useEffect(() => {
        loadReports()
    }, [dateRange])

    const loadReports = async () => {
        try {
            setLoading(true)
            setError(null)
            console.log('Loading reports:', dateRange)

            const response = await adminService.getReports({
                from: dateRange.from,
                to: dateRange.to
            })

            console.log('Reports loaded:', response.data)
            setData(response.data)
        } catch (err: any) {
            console.error('Error loading reports:', err)
            setError(err.response?.data?.message || err.message || 'Failed to load reports')
        } finally {
            setLoading(false)
        }
    }

    const exportToCSV = () => {
        if (!data?.summary) {
            alert('No data to export')
            return
        }

        const csv = `Report Generated: ${new Date().toLocaleDateString()}\n\nSummary\nTotal Users,${data.summary.totalUsers}\nTotal Jobs,${data.summary.totalJobs}\nTotal Applications,${data.summary.totalApplications}\nAvg Match Score,${data.summary.avgMatchScore}%`

        const blob = new Blob([csv], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `reports-${dateRange.from}-to-${dateRange.to}.csv`
        a.click()
    }

    if (loading) {
        return (
            <div className="p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="text-muted-foreground">Loading reports...</div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="p-6">
                <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
                    <p className="font-semibold">Error loading reports</p>
                    <p className="text-sm">{error}</p>
                    <button
                        onClick={loadReports}
                        className="mt-2 px-4 py-2 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90"
                    >
                        Retry
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Reports & Analytics</h1>
                    <p className="text-muted-foreground">Comprehensive insights about your platform</p>
                </div>
                <button
                    onClick={exportToCSV}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
                >
                    <Download className="w-4 h-4" />
                    Export CSV
                </button>
            </div>

            {/* Date Range Selector */}
            <div className="bg-card border rounded-lg p-4">
                <div className="flex items-center gap-4">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <div className="flex-1 flex gap-4">
                        <div>
                            <label className="text-sm text-muted-foreground">From</label>
                            <input
                                type="date"
                                value={dateRange.from}
                                onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                                className="block w-full mt-1 px-3 py-2 bg-background border rounded"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-muted-foreground">To</label>
                            <input
                                type="date"
                                value={dateRange.to}
                                onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                                className="block w-full mt-1 px-3 py-2 bg-background border rounded"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-card border border-blue-200 rounded-lg p-6">
                    <div className="text-blue-600 text-sm font-medium">Total Users</div>
                    <div className="text-3xl font-bold mt-2">{data?.summary?.totalUsers || 0}</div>
                </div>
                <div className="bg-card border border-green-200 rounded-lg p-6">
                    <div className="text-green-600 text-sm font-medium">Active Jobs</div>
                    <div className="text-3xl font-bold mt-2">{data?.summary?.totalJobs || 0}</div>
                </div>
                <div className="bg-card border border-orange-200 rounded-lg p-6">
                    <div className="text-orange-600 text-sm font-medium">Applications</div>
                    <div className="text-3xl font-bold mt-2">{data?.summary?.totalApplications || 0}</div>
                </div>
                <div className="bg-card border border-purple-200 rounded-lg p-6">
                    <div className="text-purple-600 text-sm font-medium">Match Quality</div>
                    <div className="text-3xl font-bold mt-2">{data?.summary?.avgMatchScore || 0}%</div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Applications Over Time */}
                {data?.applicationsOverTime && (
                    <div className="bg-card border rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Applications Over Time</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={data.applicationsOverTime}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="count" stroke="#3b82f6" name="Total" />
                                <Line type="monotone" dataKey="accepted" stroke="#10b981" name="Accepted" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )}

                {/* Jobs by Status */}
                {data?.jobsByStatus && (
                    <div className="bg-card border rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Jobs by Status</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={data.jobsByStatus}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={(entry) => entry.status}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="count"
                                >
                                    {data.jobsByStatus.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                )}

                {/* Top Skills */}
                {data?.topSkills && (
                    <div className="bg-card border rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Top Skills in Demand</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data.topSkills} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis dataKey="skill" type="category" width={100} />
                                <Tooltip />
                                <Bar dataKey="count" fill="#8b5cf6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}

                {/* Match Score Distribution */}
                {data?.matchScoreDistribution && (
                    <div className="bg-card border rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Match Score Distribution</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data.matchScoreDistribution}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="range" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#f59e0b" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </div>
    )
}
