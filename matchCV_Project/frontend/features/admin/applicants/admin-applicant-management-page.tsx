'use client'

import { useEffect, useState } from 'react'
import { adminService } from '@/lib/services/admin-service'
import { Eye, X, Filter, ArrowUp, ArrowDown } from 'lucide-react'

interface Application {
    id: number
    jobId: number
    candidateId: number
    status: string
    scoreSnapshot?: number
    summary?: string
    createdAt: string
    updatedAt?: string
    candidateName: string
    candidateEmail: string
    jobTitle: string
    jobCompany: string
    recruiterName?: string
    recruiterEmail?: string
    recruiterId?: number
}

export function AdminApplicantManagementPage() {
    const [applications, setApplications] = useState<Application[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedApp, setSelectedApp] = useState<Application | null>(null)
    const [showDetailModal, setShowDetailModal] = useState(false)
    const [showStatusModal, setShowStatusModal] = useState(false)
    const [newStatus, setNewStatus] = useState('')
    const [adminNotes, setAdminNotes] = useState('')
    const [showFilters, setShowFilters] = useState(false)
    const [filters, setFilters] = useState({
        search: '',
        status: '',
    })
    const [sortBy, setSortBy] = useState('createdAt')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

    useEffect(() => {
        loadApplications()
    }, [filters])

    const loadApplications = async () => {
        try {
            setLoading(true)
            setError(null)
            const params: any = {}
            if (filters.search) params.search = filters.search
            if (filters.status) params.status = filters.status

            const response = await adminService.getAllApplications(params)
            let appsList = Array.isArray(response.data) ? response.data : []

            appsList.sort((a: Application, b: Application) => {
                let aVal: any = a[sortBy as keyof Application]
                let bVal: any = b[sortBy as keyof Application]

                if (sortBy === 'createdAt' || sortBy === 'updatedAt') {
                    aVal = aVal ? new Date(aVal).getTime() : 0
                    bVal = bVal ? new Date(bVal).getTime() : 0
                }

                if (aVal == null) aVal = ''
                if (bVal == null) bVal = ''

                if (sortOrder === 'asc') {
                    return aVal > bVal ? 1 : -1
                } else {
                    return aVal < bVal ? 1 : -1
                }
            })

            setApplications(appsList)
        } catch (err: any) {
            console.error('Failed to load applications:', err)
            setError('Failed to load applications. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleViewDetails = (app: Application) => {
        setSelectedApp(app)
        setShowDetailModal(true)
    }

    const handleUpdateStatus = (app: Application) => {
        setSelectedApp(app)
        setNewStatus(app.status)
        setAdminNotes('')
        setShowStatusModal(true)
    }

    const handleSaveStatus = async () => {
        if (!selectedApp) return

        try {
            await adminService.updateApplicationStatus(selectedApp.id, {
                status: newStatus,
                adminNotes,
            })
            setShowStatusModal(false)
            setSelectedApp(null)
            setNewStatus('')
            setAdminNotes('')
            loadApplications()
            alert('Application status updated successfully!')
        } catch (error: any) {
            console.error('Failed to update status:', error)
            alert('Failed to update status. Please try again.')
        }
    }

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A'
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
    }

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800'
            case 'reviewed':
                return 'bg-blue-100 text-blue-800'
            case 'shortlisted':
                return 'bg-green-100 text-green-800'
            case 'rejected':
                return 'bg-red-100 text-red-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <div className="p-6">
            <div className="mb-6 flex justify-between items-start">
                <div>
                    <div className="text-sm text-muted-foreground mb-1">Home / Applicants</div>
                    <h1 className="text-2xl font-bold mb-2">Applicant Management</h1>
                    <p className="text-muted-foreground">
                        View and manage all job applications across the platform
                    </p>
                </div>
                <button
                    className="px-4 py-2 border rounded hover:bg-accent text-sm flex items-center gap-2"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <Filter size={16} />
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
            </div>

            {showFilters && (
                <div className="mb-6 p-6 bg-card border rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Filters</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Search</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded"
                                placeholder="Candidate name, email, job title..."
                                value={filters.search}
                                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Status</label>
                            <select
                                className="w-full px-3 py-2 border rounded bg-background text-foreground"
                                value={filters.status}
                                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                            >
                                <option value="">All Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Reviewed">Reviewed</option>
                                <option value="Shortlisted">Shortlisted</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {error && <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded-lg">{error}</div>}

            <div className="bg-card border rounded-lg">
                <div className="p-4 border-b flex justify-between items-center">
                    <div>
                        <h3 className="font-semibold">All Applications</h3>
                        <span className="text-sm text-muted-foreground">
                            {applications.length} application{applications.length !== 1 ? 's' : ''}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="text-sm">Sort by:</label>
                        <select
                            className="px-3 py-1 border rounded text-sm bg-background text-foreground"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="createdAt">Applied Date</option>
                            <option value="candidateName">Candidate</option>
                            <option value="jobTitle">Job Title</option>
                            <option value="status">Status</option>
                            <option value="scoreSnapshot">Score</option>
                        </select>
                        <button
                            className="p-1 border rounded hover:bg-accent"
                            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        >
                            {sortOrder === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="p-8 text-center text-muted-foreground">Loading applications...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="p-3 text-left text-sm font-medium">ID</th>
                                    <th className="p-3 text-left text-sm font-medium">CANDIDATE</th>
                                    <th className="p-3 text-left text-sm font-medium">JOB</th>
                                    <th className="p-3 text-left text-sm font-medium">RECRUITER</th>
                                    <th className="p-3 text-left text-sm font-medium">SCORE</th>
                                    <th className="p-3 text-left text-sm font-medium">STATUS</th>
                                    <th className="p-3 text-left text-sm font-medium">APPLIED</th>
                                    <th className="p-3 text-left text-sm font-medium">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="p-8 text-center text-muted-foreground">
                                            No applications found.
                                        </td>
                                    </tr>
                                ) : (
                                    applications.map((app) => (
                                        <tr key={app.id} className="border-b hover:bg-accent/50">
                                            <td className="p-3 text-sm">#{app.id}</td>
                                            <td className="p-3">
                                                <div>
                                                    <div className="font-medium">{app.candidateName}</div>
                                                    <div className="text-xs text-muted-foreground">{app.candidateEmail}</div>
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <div>
                                                    <div className="font-medium">{app.jobTitle}</div>
                                                    <div className="text-xs text-muted-foreground">{app.jobCompany}</div>
                                                </div>
                                            </td>
                                            <td className="p-3 text-sm">
                                                {app.recruiterName ? (
                                                    <div>
                                                        <div>{app.recruiterName}</div>
                                                        <div className="text-xs text-muted-foreground">{app.recruiterEmail}</div>
                                                    </div>
                                                ) : (
                                                    'N/A'
                                                )}
                                            </td>
                                            <td className="p-3 text-sm">
                                                {app.scoreSnapshot ? (
                                                    <span className="font-semibold">{app.scoreSnapshot.toFixed(1)}%</span>
                                                ) : (
                                                    'N/A'
                                                )}
                                            </td>
                                            <td className="p-3">
                                                <span className={`px-2 py-1 rounded text-xs ${getStatusColor(app.status)}`}>
                                                    {app.status}
                                                </span>
                                            </td>
                                            <td className="p-3 text-sm">{formatDate(app.createdAt)}</td>
                                            <td className="p-3">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        className="p-1 hover:bg-accent rounded"
                                                        onClick={() => handleViewDetails(app)}
                                                        title="View Details"
                                                    >
                                                        <Eye size={16} />
                                                    </button>
                                                    <button
                                                        className="px-2 py-1 text-xs border rounded hover:bg-accent"
                                                        onClick={() => handleUpdateStatus(app)}
                                                    >
                                                        Update Status
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            {showDetailModal && selectedApp && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    onClick={() => setShowDetailModal(false)}
                >
                    <div
                        className="bg-card border rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-card">
                            <h3 className="text-lg font-semibold">Application Details</h3>
                            <button
                                className="text-muted-foreground hover:text-foreground"
                                onClick={() => setShowDetailModal(false)}
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Application ID:</label>
                                <p>#{selectedApp.id}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Candidate:</label>
                                <p className="font-medium">{selectedApp.candidateName}</p>
                                <p className="text-sm text-muted-foreground">{selectedApp.candidateEmail}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Job:</label>
                                <p className="font-medium">{selectedApp.jobTitle}</p>
                                <p className="text-sm text-muted-foreground">{selectedApp.jobCompany}</p>
                            </div>
                            {selectedApp.recruiterName && (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Recruiter:</label>
                                    <p>{selectedApp.recruiterName} ({selectedApp.recruiterEmail})</p>
                                </div>
                            )}
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Match Score:</label>
                                <p className="text-2xl font-bold">
                                    {selectedApp.scoreSnapshot ? `${selectedApp.scoreSnapshot.toFixed(1)}%` : 'N/A'}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Status:</label>
                                <p>
                                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(selectedApp.status)}`}>
                                        {selectedApp.status}
                                    </span>
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Applied Date:</label>
                                <p>{formatDate(selectedApp.createdAt)}</p>
                            </div>
                            {selectedApp.summary && (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground mb-2 block">
                                        AI Summary:
                                    </label>
                                    <div className="prose max-w-none">
                                        <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded">
                                            {selectedApp.summary}
                                        </pre>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="p-6 border-t flex justify-end">
                            <button
                                className="px-4 py-2 border rounded hover:bg-accent"
                                onClick={() => setShowDetailModal(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Update Status Modal */}
            {showStatusModal && selectedApp && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    onClick={() => setShowStatusModal(false)}
                >
                    <div
                        className="bg-card border rounded-lg max-w-md w-full mx-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6 border-b flex justify-between items-center">
                            <h3 className="text-lg font-semibold">Update Application Status</h3>
                            <button
                                className="text-muted-foreground hover:text-foreground"
                                onClick={() => setShowStatusModal(false)}
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Application:</label>
                                <p className="text-sm">
                                    {selectedApp.candidateName} → {selectedApp.jobTitle}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">New Status *</label>
                                <select
                                    className="w-full px-3 py-2 border rounded bg-background text-foreground"
                                    value={newStatus}
                                    onChange={(e) => setNewStatus(e.target.value)}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Reviewed">Reviewed</option>
                                    <option value="Shortlisted">Shortlisted</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Admin Notes</label>
                                <textarea
                                    className="w-full px-3 py-2 border rounded min-h-[100px]"
                                    placeholder="Optional notes about this status change..."
                                    value={adminNotes}
                                    onChange={(e) => setAdminNotes(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="p-6 border-t flex justify-end gap-2">
                            <button
                                className="px-4 py-2 border rounded hover:bg-accent"
                                onClick={() => setShowStatusModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
                                onClick={handleSaveStatus}
                            >
                                Update Status
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
