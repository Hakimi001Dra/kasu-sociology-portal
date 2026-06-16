import { createServerClient } from '@/lib/supabase/server'

export async function getSiteSettings() {
  const supabase = await createServerClient()
  const { data } = await supabase.from('settings').select('key, value')
  const settings: Record<string, string> = {}
  data?.forEach(s => { settings[s.key] = s.value })
  return settings
}