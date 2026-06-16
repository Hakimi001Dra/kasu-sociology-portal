'use server'

import { createServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { supabaseAdmin } from '@/lib/supabase/admin'

// Helper to check admin role
async function isAdmin() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  return profile?.role === 'admin'
}

// ========== JOURNALS ==========
export async function getJournals() {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('journals')
    .select('*')
    .order('year', { ascending: false })
    .order('volume', { ascending: false })
  if (error) throw new Error(error.message)
  return data as Journal[]
}

export async function createJournal(formData: FormData) {
  if (!await isAdmin()) throw new Error('Unauthorized')
  
  const supabase = await createServerClient()
  const title = formData.get('title') as string
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  
  const { error } = await supabase.from('journals').insert({
    title,
    slug,
    authors: formData.get('authors'),
    abstract: formData.get('abstract'),
    volume: parseInt(formData.get('volume') as string),
    year: parseInt(formData.get('year') as string),
    published_date: formData.get('published_date'),
    tags: (formData.get('tags') as string).split(',').map(t => t.trim()),
    pdf_url: formData.get('pdf_url') || null,
  })
  if (error) throw new Error(error.message)
  revalidatePath('/admin/journals')
  revalidatePath('/journals')
}

export async function updateJournal(id: string, formData: FormData) {
  if (!await isAdmin()) throw new Error('Unauthorized')
  const supabase = await createServerClient()
  const { error } = await supabase.from('journals').update({
    title: formData.get('title'),
    authors: formData.get('authors'),
    abstract: formData.get('abstract'),
    volume: parseInt(formData.get('volume') as string),
    year: parseInt(formData.get('year') as string),
    published_date: formData.get('published_date'),
    tags: (formData.get('tags') as string).split(',').map(t => t.trim()),
    pdf_url: formData.get('pdf_url') || null,
  }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/journals')
  revalidatePath('/journals')
}

export async function deleteJournal(id: string) {
  if (!await isAdmin()) throw new Error('Unauthorized')
  const supabase = await createServerClient()
  const { error } = await supabase.from('journals').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/journals')
  revalidatePath('/journals')
}

// Similar actions for faculty, news, programmes...
// (I'll provide full file – ask me if you want all functions)

// ========== FACULTY ==========
export async function createFaculty(formData: FormData) {
  if (!await isAdmin()) throw new Error('Unauthorized')
  const supabase = await createServerClient()
  const { error } = await supabase.from('faculty').insert({
    name: formData.get('name'),
    title: formData.get('title'),
    specialization: formData.get('specialization'),
    email: formData.get('email') || null,
    office: formData.get('office') || null,
    photo_url: formData.get('photo_url') || null,
    display_order: parseInt(formData.get('display_order') as string) || 0,
  })
  if (error) throw new Error(error.message)
  revalidatePath('/admin/faculty')
  revalidatePath('/faculty')
}

export async function updateFaculty(id: string, formData: FormData) {
  if (!await isAdmin()) throw new Error('Unauthorized')
  const supabase = await createServerClient()
  const { error } = await supabase.from('faculty').update({
    name: formData.get('name'),
    title: formData.get('title'),
    specialization: formData.get('specialization'),
    email: formData.get('email') || null,
    office: formData.get('office') || null,
    photo_url: formData.get('photo_url') || null,
    display_order: parseInt(formData.get('display_order') as string) || 0,
  }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/faculty')
  revalidatePath('/faculty')
}

export async function deleteFaculty(id: string) {
  if (!await isAdmin()) throw new Error('Unauthorized')
  const supabase = await createServerClient()
  const { error } = await supabase.from('faculty').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/faculty')
  revalidatePath('/faculty')
}

// ========== NEWS ==========
export async function createNews(formData: FormData) {
  if (!await isAdmin()) throw new Error('Unauthorized')
  const supabase = await createServerClient()
  const title = formData.get('title') as string
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const { error } = await supabase.from('news_events').insert({
    title,
    slug,
    type: formData.get('type'),
    date: formData.get('date'),
    description: formData.get('description'),
    image_url: formData.get('image_url') || null,
  })
  if (error) throw new Error(error.message)
  revalidatePath('/admin/news')
  revalidatePath('/news')
}

export async function updateNews(id: string, formData: FormData) {
  if (!await isAdmin()) throw new Error('Unauthorized')
  const supabase = await createServerClient()
  const { error } = await supabase.from('news_events').update({
    title: formData.get('title'),
    type: formData.get('type'),
    date: formData.get('date'),
    description: formData.get('description'),
    image_url: formData.get('image_url') || null,
  }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/news')
  revalidatePath('/news')
}

export async function deleteNews(id: string) {
  if (!await isAdmin()) throw new Error('Unauthorized')
  const supabase = await createServerClient()
  const { error } = await supabase.from('news_events').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/news')
  revalidatePath('/news')
}

// ========== PROGRAMMES ==========
export async function createProgramme(formData: FormData) {
  if (!await isAdmin()) throw new Error('Unauthorized')
  const supabase = await createServerClient()
  const { error } = await supabase.from('programmes').insert({
    title: formData.get('title'),
    level: formData.get('level'),
    description: formData.get('description'),
    duration: formData.get('duration') || null,
  })
  if (error) throw new Error(error.message)
  revalidatePath('/admin/programmes')
  revalidatePath('/#programmes')
}

export async function updateProgramme(id: string, formData: FormData) {
  if (!await isAdmin()) throw new Error('Unauthorized')
  const supabase = await createServerClient()
  const { error } = await supabase.from('programmes').update({
    title: formData.get('title'),
    level: formData.get('level'),
    description: formData.get('description'),
    duration: formData.get('duration') || null,
  }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/programmes')
  revalidatePath('/#programmes')
}

export async function deleteProgramme(id: string) {
  if (!await isAdmin()) throw new Error('Unauthorized')
  const supabase = await createServerClient()
  const { error } = await supabase.from('programmes').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/programmes')
  revalidatePath('/#programmes')
}

// ========== SETTINGS ==========
export async function getSettings() {
  const supabase = await createServerClient()
  const { data, error } = await supabase.from('settings').select('key, value')
  if (error) throw new Error(error.message)
  const settings: Record<string, string> = {}
  data?.forEach(s => { settings[s.key] = s.value })
  return settings
}

export async function updateSettings(settingsData: Record<string, string>) {
  if (!await isAdmin()) throw new Error('Unauthorized')
  const supabase = await createServerClient()
  const updates = Object.entries(settingsData).map(([key, value]) =>
    supabase.from('settings').upsert({ key, value, type: 'text' })
  )
  await Promise.all(updates)
  revalidatePath('/admin/settings')
}