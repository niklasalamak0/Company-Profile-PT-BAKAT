import 'server-only'
import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

function admin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error('Supabase env is missing (URL / SERVICE_ROLE_KEY)')
  }
  return createClient(url, key, { auth: { persistSession: false } })
}

function json(data: any, init?: number | ResponseInit) {
  const base =
    typeof init === 'number' ? { status: init } : (init ?? {})
  return NextResponse.json(data, {
    ...base,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      ...(base as any).headers,
    },
  })
}

export async function OPTIONS() {
  return json({ ok: true })
}

export async function GET() {
  try {
    const { data, error } = await admin()
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase GET error:', error)
      return json({ error: 'DB error' }, 500)
    }
    return json({ data })
  } catch (e) {
    console.error(e)
    return json({ error: 'Server error' }, 500)
  }
}

export async function POST(req: NextRequest) {
  try {
    const raw = await req.json()
    const name = String(raw?.name ?? '').trim()
    const email = String(raw?.email ?? '').trim().toLowerCase()
    const phone = String(raw?.phone ?? '').trim()
    const company = raw?.company ? String(raw.company).trim() : null
    const service_type = String(raw?.service_type ?? '').trim()
    const message = String(raw?.message ?? '').trim()

    if (!name || !email || !phone || !service_type || !message) {
      return json({ error: 'Semua field wajib diisi.' }, 400)
    }
    const emailOk = /\S+@\S+\.\S+/.test(email)
    const phoneOk = /^[0-9+\s()-]{8,}$/.test(phone)
    if (!emailOk || !phoneOk) {
      return json({ error: 'Email atau nomor telepon tidak valid.' }, 400)
    }

    const { data, error } = await admin()
      .from('contacts')
      .insert({
        name,
        email,
        phone,
        company,
        service_type, // nilai seperti "advertising", "building_care", dll.
        message,
        status: 'new', // boleh dihilangkan bila default sudah di DB
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase INSERT error:', error)
      return json({ error: 'Gagal menyimpan data.' }, 500)
    }

    return json({ data }, 201)
  } catch (e) {
    console.error(e)
    return json({ error: 'Server error' }, 500)
  }
}
