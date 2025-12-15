export function formatMetaJson(jsonString: string | null | undefined): string {
    if (!jsonString) return '-'

    try {
        const data = JSON.parse(jsonString)
        const parts: string[] = []

        // Format common fields
        if (data.RecruiterId || data.recruiterId) {
            parts.push(`Recruiter: #${data.RecruiterId || data.recruiterId}`)
        }
        if (data.CompanyName || data.companyName) {
            parts.push(`Company: ${data.CompanyName || data.companyName}`)
        }
        if (data.OldStatus || data.oldStatus) {
            parts.push(`Status: ${data.OldStatus || data.oldStatus} → ${data.NewStatus || data.newStatus || data.Status || data.status}`)
        } else if (data.Status || data.status) {
            parts.push(`Status: ${data.Status || data.status}`)
        }
        if (data.reason) {
            parts.push(`Reason: ${data.reason}`)
        }
        if (data.durationDays !== undefined && data.durationDays !== null) {
            parts.push(`Duration: ${data.durationDays === null ? 'Permanent' : data.durationDays + ' days'}`)
        }
        if (data.bannedUntil) {
            parts.push(`Until: ${new Date(data.bannedUntil).toLocaleDateString()}`)
        }
        if (data.plan || data.Plan) {
            parts.push(`Plan: ${data.plan || data.Plan}`)
        }
        if (data.assignedUserId !== undefined) {
            parts.push(`User ID: ${data.assignedUserId || 'None'}`)
        }

        return parts.length > 0 ? parts.join(', ') : JSON.stringify(data)
    } catch (e) {
        return jsonString
    }
}
