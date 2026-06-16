import { createServerClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { deleteJournal } from '@/actions/admin'
import { Button } from '@/components/ui/button'
import { Plus, Pencil, Trash2 } from 'lucide-react'

export default async function AdminJournalsPage() {
  const supabase = await createServerClient()
  const { data: journals } = await supabase
    .from('journals')
    .select('*')
    .order('year', { ascending: false })
    .order('volume', { ascending: false })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-playfair font-bold text-kasu-green">Manage Journals</h1>
        <Link href="/admin/journals/new">
          <Button className="bg-kasu-green hover:bg-kasu-green-mid">
            <Plus size={16} className="mr-1" /> New Article
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Authors</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vol/Year</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {journals?.map((journal) => (
              <tr key={journal.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{journal.title}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{journal.authors}</td>
                <td className="px-6 py-4 text-sm text-gray-500">Vol.{journal.volume} ({journal.year})</td>
                <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                  <Link href={`/admin/journals/${journal.id}/edit`}>
                    <Button variant="outline" size="sm"><Pencil size={14} /></Button>
                  </Link>
                  <form action={deleteJournal.bind(null, journal.id)} className="inline">
                    <Button variant="destructive" size="sm" type="submit"><Trash2 size={14} /></Button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}