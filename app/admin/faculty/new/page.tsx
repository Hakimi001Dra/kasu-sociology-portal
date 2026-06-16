'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createFaculty } from '@/actions/admin'
import { FileUpload } from '@/components/admin/file-upload'
import { Button } from '@/components/ui/button'

export default function NewFacultyPage() {
  const router = useRouter()
  const [photoUrl, setPhotoUrl] = useState('')

  async function handleSubmit(formData: FormData) {
    if (photoUrl) formData.append('photo_url', photoUrl)
    await createFaculty(formData)
    router.push('/admin/faculty')
  }

  return (
    <div>
      <h1 className="text-2xl font-playfair font-bold text-kasu-green mb-6">Add Faculty Member</h1>
      <form action={handleSubmit} className="max-w-2xl space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium mb-1">Name *</label>
          <input name="name" required className="w-full border rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input name="title" required className="w-full border rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Specialization *</label>
          <input name="specialization" required className="w-full border rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input name="email" type="email" className="w-full border rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Office</label>
          <input name="office" className="w-full border rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Display Order</label>
          <input name="display_order" type="number" defaultValue={0} className="w-full border rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Photo</label>
          <FileUpload bucket="faculty-photos" onUpload={setPhotoUrl} accept="image/*" label="Upload Photo" />
          {photoUrl && <img src={photoUrl} alt="Preview" className="mt-2 w-20 h-20 rounded-full object-cover" />}
        </div>
        <div className="flex gap-3 pt-4">
          <Button type="submit" className="bg-kasu-green">Save Faculty</Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        </div>
      </form>
    </div>
  )
}