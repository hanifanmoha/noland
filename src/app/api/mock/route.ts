import { decodeFieldTree, renderMocker } from '@/utils/mock'
import { NextRequest, NextResponse } from 'next/server'

async function handler(request: NextRequest) {
    const query = request.nextUrl.searchParams.get('_q')

    try {
        const rootField = decodeFieldTree(query ?? '')
        const jsonData = renderMocker(rootField)
        return NextResponse.json(jsonData)
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 400 })
    }
}

export async function GET(request: NextRequest) {
    return handler(request)
}

export async function POST(request: NextRequest) {
    return handler(request)
}

export async function PUT(request: NextRequest) {
    return handler(request)
}

export async function DELETE(request: NextRequest) {
    return handler(request)
}

export async function PATCH(request: NextRequest) {
    return handler(request)
}

export async function OPTIONS(request: NextRequest) {
    return handler(request)
}

export async function HEAD(request: NextRequest) {
    return handler(request)
}