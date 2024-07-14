import { decodeFieldTree, renderMocker } from '@/utils/mock'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('_q')

  try {
    const rootField = decodeFieldTree(query ?? '')
    const jsonData = renderMocker(rootField)
    return NextResponse.json(jsonData)
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 })
  }
}
