'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Upload, X } from 'lucide-react'

interface FileUploadProps {
  bucket: string
  onUpload: (url: string) => void
  accept?: string
  label?: string
}

export function FileUpload({ bucket, onUpload, accept = 'image/*', label = 'Upload File' }: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const supabase = createClient()

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `${fileName}`

    const { error } = await supabase.storage.from(bucket).upload(filePath, file)
    if (error) {
      alert('Upload failed: ' + error.message)
    } else {
      const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(filePath)
      onUpload(publicUrl)
    }
    setUploading(false)
  }

  return (
    <div>
      <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">
        <Upload size={16} />
        {uploading ? 'Uploading...' : label}
        <input type="file" accept={accept} onChange={handleUpload} disabled={uploading} className="hidden" />
      </label>
    </div>
  )
}