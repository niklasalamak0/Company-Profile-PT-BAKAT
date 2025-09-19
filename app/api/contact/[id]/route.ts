// app/api/contacts/[id]/route.ts
import 'server-only'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

function admin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const { error } = await admin().from('contacts').delete().eq('id', params.id)
  if (error) return NextResponse.json({ error: 'DB error' }, { status: 500 })
  return NextResponse.json({ ok: true })
}
