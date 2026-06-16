'use client'

import { useRouter } from 'next/navigation'
import { createJournal } from '@/actions/admin'
import { Button } from '@/components/ui/button'

export default function NewJournalPage() {
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    await createJournal(formData)
    router.push('/admin/journals')
  }

  return (
    <div>
      <h1 className="text-2xl font-playfair font-bold text-kasu-green mb-6">New Journal Article</h1>
      <form action={handleSubmit} className="max-w-2xl space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input name="title" required className="w-full border rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Authors *</label>
          <input name="authors" required className="w-full border rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Abstract *</label>
          <textarea name="abstract" rows={5} required className="w-full border rounded-md px-3 py-2" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Volume *</label>
            <input name="volume" type="number" required className="w-full border rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Year *</label>
            <input name="year" type="number" required className="w-full border rounded-md px-3 py-2" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Published Date *</label>
          <input name="published_date" type="date" required className="w-full border rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
          <input name="tags" placeholder="Urban Studies, Policy" className="w-full border rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">PDF URL</label>
          <input name="pdf_url" placeholder="https://..." className="w-full border rounded-md px-3 py-2" />
        </div>
        <div className="flex gap-3 pt-4">
          <Button type="submit" className="bg-kasu-green">Save Article</Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        </div>
      </form>
    </div>
  )
}