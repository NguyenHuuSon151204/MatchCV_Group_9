'use client'

import { useEffect, useState } from 'react'
import { adminService } from '@/lib/services/admin-service'
import { TrendingUp, Users, Briefcase, Send, Calendar, Download, Filter, RefreshCw, Sparkles, Target, Zap } from 'lucide-react'
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
    Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, FunnelChart, Funnel, LabelList
} from 'recharts'

interface ReportData {
    applicationsOverTime: Array<{ date: string; count: number; accepted: number }>
    jobsByStatus: Array<{ status: string; count: number }>
    userGrowth: Array<{ month: string; users: number; recruiters: number }>
    topSkills: Array<{ skill: string; count: number }>
    matchScoreDistribution: Array<{ range: string; count: number }>
    applicationFunnel: Array<{ stage: string; value: number; fill: string }>
    summary: {
        totalUsers: number
        totalJobs: number
        totalApplications: number
        avgMatchScore: number
    }
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-card border rounded-lg shadow-lg p-3 backdrop-blur">
                <p className="font-semibold text-sm mb-1">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <p key={index} className="text-xs" style={{ color: entry.color }}>
                        {entry.name}: {entry.value}
                    </p>
                ))}
            </div>
        )
    }
    return null
}

export function AdminReportsPage() {
    const [data, setData] = useState<ReportData | null>(null)
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [dateRange, setDateRange] = useState({
        from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        to: new Date().toISOString().split('T')[0],
    })
    const [preset, setPreset] = useState('30days')

    useEffect(() => {
        loadReports()
    }, [dateRange])

    const loadReports = async () => {
        try {
            setLoading(true)
            const response = await adminService.getSummary()
            const summary = response.data

            // Enhanced mock data với more charts
            const mockData: ReportData = {
                applicationsOverTime: [
                    { date: '2024-01', count: 45, accepted: 28 },
                    { date: '2024-02', count: 62, accepted: 39 },
                    { date: '2024-03', count: 78, accepted: 52 },
                    { date: '2024-04', count: 95, accepted: 64 },
                    { date: '2024-05', count: 112, accepted: 78 },
                    { date: '2024-06', count: 128, accepted: 89 },
                ],
                jobsByStatus: [
                    { status: 'Active', count: summary?.totals?.jobs || 45 },
                    { status: 'Closed', count: 23 },
                    { status: 'Draft', count: 12 },
                ],
                userGrowth: [
                    { month: 'Jan', users: 120, recruiters: 15 },
                    { month: 'Feb', users: 145, recruiters: 18 },
                    { month: 'Mar', users: 178, recruiters: 22 },
                    { month: 'Apr', users: 210, recruiters: 27 },
                    { month: 'May', users: 245, recruiters: 32 },
                    { month: 'Jun', users: summary?.totals?.users || 280, recruiters: 38 },
                ],
                topSkills: summary?.topSkills?.slice(0, 8) || [
                    { skill: 'React', count: 156 },
                    { skill: 'Node.js', count: 134 },
                    { skill: 'Python', count: 128 },
                    { skill: 'Java', count: 112 },
                    { skill: 'TypeScript', count: 98 },
                    { skill: 'AWS', count: 87 },
                ],
                matchScoreDistribution: [
                    { range: '90-100', count: 45 },
                    { range: '80-89', count: 78 },
                    { range: '70-79', count: 92 },
                    { range: '60-69', count: 54 },
                    { range: '50-59', count: 23 },
                    { range: '<50', count: 12 },
                ],
                applicationFunnel: [
                    { stage: 'Total Applications', value: 1000, fill: '#3b82f6' },
                    { stage: 'CV Reviewed', value: 850, fill: '#10b981' },
                    { stage: 'Interview Scheduled', value: 450, fill: '#f59e0b' },
                    { stage: 'Interviewed', value: 320, fill: '#ef4444' },
                    { stage: 'Offered', value: 180, fill: '#8b5cf6' },
                    { stage: 'Hired', value: 120, fill: '#ec4899' },
                ],
                summary: {
                    totalUsers: summary?.totals?.users || 0,
                    totalJobs: summary?.totals?.jobs || 0,
                    totalApplications: summary?.totals?.apps || 0,
                    avgMatchScore: 78.5,
                },
            }

            setData(mockData)
        } catch (error) {
            console.error('Failed to load reports:', error)
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }

    const handleRefresh = async () => {
        setRefreshing(true)
        await loadReports()
    }

    const handlePresetChange = (presetValue: string) => {
        setPreset(presetValue)
        const now = new Date()
        let from = new Date()

        switch (presetValue) {
            case '7days':
                from = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
                break
            case '30days':
                from = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
                break
            case '90days':
                from = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
                break
            case 'year':
                from = new Date(now.getFullYear(), 0, 1)
                break
        }

        setDateRange({
            from: from.toISOString().split('T')[0],
            to: now.toISOString().split('T')[0],
        })
    }

    const exportReport = () => {
        alert('Export functionality would download CSV/PDF report with all analytics data')
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-12">
                <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-muted-foreground">Loading comprehensive analytics...</p>
            </div>
        )
    }

    return (
        <div className="p-6 space-y-6">
            {/* Premium Header with Gradient */}
            <div className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-primary/5 to-background p-8 rounded-2xl border">
                <div className="absolute top-0 right-0 size-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <Sparkles size={16} className="text-primary" />
                            <span>Home / Analytics</span>
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                            Advanced Analytics Dashboard
                        </h1>
                        <p className="text-muted-foreground">
                            Real-time insights and comprehensive data visualization for strategic decision making
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleRefresh}
                            disabled={refreshing}
                            className="px-4 py-2 border rounded-lg hover:bg-accent flex items-center gap-2 transition-colors disabled:opacity-50"
                        >
                            <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
                            Refresh
                        </button>
                        <button
                            onClick={exportReport}
                            className="px-4 py-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
                        >
                            <Download size={16} />
                            Export
                        </button>
                    </div>
                </div>
            </div>

            {/* Enhanced Date Range & Filters */}
            <div className="bg-card p-6 rounded-xl border shadow-sm">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Calendar size={20} className="text-primary" />
                        <span className="font-medium">Time Range:</span>
                    </div>

                    {/* Preset Buttons */}
                    <div className="flex gap-2">
                        {[
                            { label: '7 Days', value: '7days' },
                            { label: '30 Days', value: '30days' },
                            { label: '90 Days', value: '90days' },
                            { label: 'Year', value: 'year' },
                        ].map((p) => (
                            <button
                                key={p.value}
                                onClick={() => handlePresetChange(p.value)}
                                className={`px-3 py-1 rounded-lg text-sm transition-all ${preset === p.value
                                        ? 'bg-primary text-primary-foreground shadow-md'
                                        : 'bg-muted hover:bg-muted/80'
                                    }`}
                            >
                                {p.label}
                            </button>
                        ))}
                    </div>

                    <div className="h-6 w-px bg-border"></div>

                    {/* Custom Date Inputs */}
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium">From:</label>
                        <input
                            type="date"
                            value={dateRange.from}
                            onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                            className="px-3 py-1.5 border rounded-lg bg-background text-sm"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium">To:</label>
                        <input
                            type="date"
                            value={dateRange.to}
                            onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                            className="px-3 py-1.5 border rounded-lg bg-background text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Premium Summary Cards with Animations */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="group bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all hover:shadow-xl hover:scale-105 cursor-pointer">
                    <div className="flex items-center justify-between mb-3">
                        <Users className="size-10 text-blue-600 group-hover:scale-110 transition-transform" />
                        <div className="px-2 py-1 bg-blue-500/20 rounded-full text-xs font-medium text-blue-700">+12%</div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">Total Users</p>
                    <p className="text-3xl font-bold text-blue-600">{data?.summary.totalUsers}</p>
                    <p className="text-xs text-muted-foreground mt-2">↑ Growing steadily</p>
                </div>

                <div className="group bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent p-6 rounded-xl border border-green-500/20 hover:border-green-500/40 transition-all hover:shadow-xl hover:scale-105 cursor-pointer">
                    <div className="flex items-center justify-between mb-3">
                        <Briefcase className="size-10 text-green-600 group-hover:scale-110 transition-transform" />
                        <div className="px-2 py-1 bg-green-500/20 rounded-full text-xs font-medium text-green-700">+8%</div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">Active Jobs</p>
                    <p className="text-3xl font-bold text-green-600">{data?.summary.totalJobs}</p>
                    <p className="text-xs text-muted-foreground mt-2">↑ More opportunities</p>
                </div>

                <div className="group bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent p-6 rounded-xl border border-orange-500/20 hover:border-orange-500/40 transition-all hover:shadow-xl hover:scale-105 cursor-pointer">
                    <div className="flex items-center justify-between mb-3">
                        <Send className="size-10 text-orange-600 group-hover:scale-110 transition-transform" />
                        <div className="px-2 py-1 bg-orange-500/20 rounded-full text-xs font-medium text-orange-700">+15%</div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">Applications</p>
                    <p className="text-3xl font-bold text-orange-600">{data?.summary.totalApplications}</p>
                    <p className="text-xs text-muted-foreground mt-2">↑ High engagement</p>
                </div>

                <div className="group bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all hover:shadow-xl hover:scale-105 cursor-pointer">
                    <div className="flex items-center justify-between mb-3">
                        <Target className="size-10 text-purple-600 group-hover:scale-110 transition-transform" />
                        <div className="px-2 py-1 bg-purple-500/20 rounded-full text-xs font-medium text-purple-700">Excellent</div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">Match Quality</p>
                    <p className="text-3xl font-bold text-purple-600">{data?.summary.avgMatchScore}%</p>
                    <p className="text-xs text-muted-foreground mt-2">↑ AI-powered precision</p>
                </div>
            </div>

            {/* Main Charts Grid - Enhanced with Area Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Applications Trend - Area Chart */}
                <div className="bg-card p-6 rounded-xl border shadow-sm hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <TrendingUp className="size-5 text-primary" />
                            Applications Trend
                        </h3>
                        <Zap className="size-4 text-yellow-500" />
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={data?.applicationsOverTime}>
                            <defs>
                                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorAccepted" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="date" stroke="#6b7280" />
                            <YAxis stroke="#6b7280" />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Area
                                type="monotone"
                                dataKey="count"
                                stroke="#3b82f6"
                                fillOpacity={1}
                                fill="url(#colorCount)"
                                name="Total Applications"
                            />
                            <Area
                                type="monotone"
                                dataKey="accepted"
                                stroke="#10b981"
                                fillOpacity={1}
                                fill="url(#colorAccepted)"
                                name="Accepted"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Application Funnel */}
                <div className="bg-card p-6 rounded-xl border shadow-sm hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Filter className="size-5 text-primary" />
                            Application Pipeline
                        </h3>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <FunnelChart>
                            <Tooltip content={<CustomTooltip />} />
                            <Funnel dataKey="value" data={data?.applicationFunnel}>
                                <LabelList position="right" fill="#000" stroke="none" dataKey="stage" />
                                {data?.applicationFunnel.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Funnel>
                        </FunnelChart>
                    </ResponsiveContainer>
                    <div className="mt-4 grid grid-cols-3 gap-2">
                        {data?.applicationFunnel.slice(0, 3).map((stage, idx) => (
                            <div key={idx} className="text-center p-2 bg-muted/30 rounded-lg">
                                <p className="text-xs text-muted-foreground">{stage.stage}</p>
                                <p className="text-lg font-bold" style={{ color: stage.fill }}>{stage.value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* User Growth - Stacked Bar */}
                <div className="bg-card p-6 rounded-xl border shadow-sm hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Users className="size-5 text-green-600" />
                        User Growth Analysis
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data?.userGrowth}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="month" stroke="#6b7280" />
                            <YAxis stroke="#6b7280" />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar dataKey="users" fill="#10b981" name="Total Users" radius={[8, 8, 0, 0]} />
                            <Bar dataKey="recruiters" fill="#3b82f6" name="Recruiters" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Match Score Distribution */}
                <div className="bg-card p-6 rounded-xl border shadow-sm hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Target className="size-5 text-purple-600" />
                        Match Score Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data?.matchScoreDistribution}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="range" stroke="#6b7280" />
                            <YAxis stroke="#6b7280" />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]}>
                                {data?.matchScoreDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Jobs by Status - Donut */}
                <div className="bg-card p-6 rounded-xl border shadow-sm hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-semibold mb-4">Jobs Status Overview</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={data?.jobsByStatus}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={90}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="count"
                            >
                                {data?.jobsByStatus.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Top Skills - Horizontal Bar */}
                <div className="bg-card p-6 rounded-xl border shadow-sm hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-semibold mb-4">Top Skills in Demand</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data?.topSkills} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis type="number" stroke="#6b7280" />
                            <YAxis dataKey="skill" type="category" width={100} stroke="#6b7280" />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="count" fill="#8b5cf6" radius={[0, 8, 8, 0]}>
                                {data?.topSkills.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Key Performance Indicators - Enhanced */}
            <div className="bg-gradient-to-br from-card to-muted/30 p-6 rounded-xl border shadow-sm">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <Sparkles className="size-5 text-yellow-500" />
                    Key Performance Indicators
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-card p-5 rounded-xl border hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-muted-foreground">Success Rate</p>
                            <div className="size-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                <TrendingUp className="size-4 text-green-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-green-600">67%</p>
                        <div className="flex items-center gap-1 mt-2">
                            <span className="text-xs font-medium text-green-600">↑ 5%</span>
                            <span className="text-xs text-muted-foreground">vs last month</span>
                        </div>
                    </div>

                    <div className="bg-card p-5 rounded-xl border hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-muted-foreground">Avg Time to Hire</p>
                            <div className="size-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                <Calendar className="size-4 text-blue-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-blue-600">14 days</p>
                        <div className="flex items-center gap-1 mt-2">
                            <span className="text-xs font-medium text-blue-600">↓ 2 days</span>
                            <span className="text-xs text-muted-foreground">improvement</span>
                        </div>
                    </div>

                    <div className="bg-card p-5 rounded-xl border hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-muted-foreground">Active Recruiters</p>
                            <div className="size-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                                <Users className="size-4 text-purple-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-purple-600">45</p>
                        <div className="flex items-center gap-1 mt-2">
                            <span className="text-xs font-medium text-purple-600">↑ 8 new</span>
                            <span className="text-xs text-muted-foreground">this month</span>
                        </div>
                    </div>

                    <div className="bg-card p-5 rounded-xl border hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-muted-foreground">Platform Uptime</p>
                            <div className="size-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                <Zap className="size-4 text-green-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-green-600">99.9%</p>
                        <div className="flex items-center gap-1 mt-2">
                            <span className="text-xs font-medium text-green-600">Excellent</span>
                            <span className="text-xs text-muted-foreground">reliability</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
