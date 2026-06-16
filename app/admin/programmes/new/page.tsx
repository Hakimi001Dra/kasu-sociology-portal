'use client'

import { useRouter } from 'next/navigation'
import { createProgramme } from '@/actions/admin'
import { Button } from '@/components/ui/button'

export default function NewProgrammePage() {
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    await createProgramme(formData)
    router.push('/admin/programmes')
  }

  return (
    <div>
      <h1 className="text-2xl font-playfair font-bold text-kasu-green mb-6">Add Programme</h1>
      <form action={handleSubmit} className="max-w-2xl space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input name="title" required className="w-full border rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Level *</label>
          <select name="level" required className="w-full border rounded-md px-3 py-2">
            <option value="B.Sc">B.Sc</option>
            <option value="M.Sc">M.Sc</option>
            <option value="PhD">PhD</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description *</label>
          <textarea name="description" rows={4} required className="w-full border rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Duration (e.g., "4 years")</label>
          <input name="duration" className="w-full border rounded-md px-3 py-2" />
        </div>
        <div className="flex gap-3 pt-4">
          <Button type="submit" className="bg-kasu-green">Save Programme</Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        </div>
      </form>
    </div>
  )
}