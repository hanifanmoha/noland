import { SPECIAL_QUERY_PARAMS_KEY } from '@/utils/consts'
import { decodeFieldTree } from '@/utils/encoding'
import { renderMocker } from '@/utils/mock'
import { NextRequest, NextResponse } from 'next/server'

async function handler(request: NextRequest) {
    const query = request.nextUrl.searchParams.get(SPECIAL_QUERY_PARAMS_KEY)

    try {
        const { field } = decodeFieldTree(query ?? '')
        const jsonData = renderMocker(field)
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