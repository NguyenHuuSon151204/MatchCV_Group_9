import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const from = searchParams.get('from')
        const to = searchParams.get('to')

        // Build backend URL
        const backendUrl = new URL('http://localhost:5185/api/admin/reports')
        if (from) backendUrl.searchParams.set('from', from)
        if (to) backendUrl.searchParams.set('to', to)

        // Forward request to backend with cookies
        const response = await fetch(backendUrl.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': request.headers.get('cookie') || '',
            },
            credentials: 'include',
        })

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Backend request failed' },
                { status: response.status }
            )
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error: any) {
        console.error('Reports API route error:', error)
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        )
    }
}
