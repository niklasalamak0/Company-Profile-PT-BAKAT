// app/api/contacts/route.ts
import 'server-only'
import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

function admin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createClient(url, key, { auth: { persistSession: false } })
}

export async function GET() {
  const { data, error } = await admin()
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: 'DB error' }, { status: 500 })
  return NextResponse.json({ data })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, phone, company, service_type, message } = body ?? {}
  if (!name || !email || !phone || !service_type || !message)
    return NextResponse.json({ error: 'Semua field wajib diisi.' }, { status: 400 })

  const { data, error } = await admin()
    .from('contacts')
    .insert({ name, email, phone, company: company ?? null, service_type, message, status: 'new' })
    .select()
    .single()
  if (error) return NextResponse.json({ error: 'Gagal menyimpan data.' }, { status: 500 })
  return NextResponse.json({ data }, { status: 201 })
}

export async function OPTIONS() { return NextResponse.json({}) }
