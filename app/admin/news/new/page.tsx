'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createNews } from '@/actions/admin'
import { FileUpload } from '@/components/admin/file-upload'
import { Button } from '@/components/ui/button'

export default function NewNewsPage() {
  const router = useRouter()
  const [imageUrl, setImageUrl] = useState('')

  async function handleSubmit(formData: FormData) {
    if (imageUrl) formData.append('image_url', imageUrl)
    await createNews(formData)
    router.push('/admin/news')
  }

  return (
    <div>
      <h1 className="text-2xl font-playfair font-bold text-kasu-green mb-6">Add News/Event</h1>
      <form action={handleSubmit} className="max-w-2xl space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input name="title" required className="w-full border rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Type *</label>
          <select name="type" required className="w-full border rounded-md px-3 py-2">
            <option value="Seminar">Seminar</option>
            <option value="Call for Papers">Call for Papers</option>
            <option value="Department News">Department News</option>
            <option value="Workshop">Workshop</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date *</label>
          <input name="date" type="date" required className="w-full border rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description *</label>
          <textarea name="description" rows={4} required className="w-full border rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          <FileUpload bucket="news-images" onUpload={setImageUrl} accept="image/*" label="Upload Image" />
          {imageUrl && <img src={imageUrl} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />}
        </div>
        <div className="flex gap-3 pt-4">
          <Button type="submit" className="bg-kasu-green">Save News</Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        </div>
      </form>
    </div>
  )
}