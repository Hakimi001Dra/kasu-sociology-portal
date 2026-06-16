'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { FileUpload } from '@/components/admin/file-upload'

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchSettings()
  }, [])

  async function fetchSettings() {
    const { data, error } = await supabase.from('settings').select('key, value')
    if (!error && data) {
      const settingsMap: Record<string, string> = {}
      data.forEach(s => { settingsMap[s.key] = s.value })
      setSettings(settingsMap)
    }
    setLoading(false)
  }

  async function updateSetting(key: string, value: string) {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  async function saveSettings() {
    setSaving(true)
    const updates = Object.entries(settings).map(([key, value]) =>
      supabase.from('settings').upsert({ key, value, type: 'text' })
    )
    await Promise.all(updates)
    alert('Settings saved successfully!')
    setSaving(false)
  }

  async function handleLogoUpload(url: string, key: string) {
    updateSetting(key, url)
  }

  if (loading) return <div className="p-6">Loading settings...</div>

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-playfair font-bold text-kasu-green mb-6">Website Settings</h1>
      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        {/* Site Identity */}
        <div>
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">Site Identity</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Site Name</label>
              <input
                type="text"
                value={settings.site_name || ''}
                onChange={e => updateSetting('site_name', e.target.value)}
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tagline</label>
              <input
                type="text"
                value={settings.site_tagline || ''}
                onChange={e => updateSetting('site_tagline', e.target.value)}
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Main Logo (light background)</label>
              <FileUpload bucket="logos" onUpload={url => handleLogoUpload(url, 'logo_url')} accept="image/*" label="Upload Logo" />
              {settings.logo_url && (
                <img src={settings.logo_url} alt="Logo preview" className="mt-2 h-12 object-contain" />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Dark/Transparent Logo (for dark backgrounds)</label>
              <FileUpload bucket="logos" onUpload={url => handleLogoUpload(url, 'logo_light_url')} accept="image/*" label="Upload Logo" />
              {settings.logo_light_url && (
                <img src={settings.logo_light_url} alt="Light logo preview" className="mt-2 h-12 object-contain" />
              )}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">Contact Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" value={settings.contact_email || ''} onChange={e => updateSetting('contact_email', e.target.value)} className="w-full border rounded-md px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input type="text" value={settings.contact_phone || ''} onChange={e => updateSetting('contact_phone', e.target.value)} className="w-full border rounded-md px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <textarea rows={2} value={settings.contact_address || ''} onChange={e => updateSetting('contact_address', e.target.value)} className="w-full border rounded-md px-3 py-2" />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">Social Media Links</h2>
          <div className="space-y-4">
            <div><label className="block text-sm font-medium mb-1">Facebook URL</label><input type="url" value={settings.facebook_url || ''} onChange={e => updateSetting('facebook_url', e.target.value)} className="w-full border rounded-md px-3 py-2" /></div>
            <div><label className="block text-sm font-medium mb-1">Twitter/X URL</label><input type="url" value={settings.twitter_url || ''} onChange={e => updateSetting('twitter_url', e.target.value)} className="w-full border rounded-md px-3 py-2" /></div>
            <div><label className="block text-sm font-medium mb-1">LinkedIn URL</label><input type="url" value={settings.linkedin_url || ''} onChange={e => updateSetting('linkedin_url', e.target.value)} className="w-full border rounded-md px-3 py-2" /></div>
          </div>
        </div>

        {/* Footer Copyright */}
        <div>
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">Footer</h2>
          <div>
            <label className="block text-sm font-medium mb-1">Copyright Text</label>
            <input type="text" value={settings.footer_copyright || ''} onChange={e => updateSetting('footer_copyright', e.target.value)} className="w-full border rounded-md px-3 py-2" />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <Button onClick={saveSettings} disabled={saving} className="bg-kasu-green">
            {saving ? 'Saving...' : 'Save All Settings'}
          </Button>
        </div>
      </div>
    </div>
  )
}