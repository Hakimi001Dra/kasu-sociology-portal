import { createServerClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { deleteNews } from '@/actions/admin'
import { Button } from '@/components/ui/button'
import { Plus, Pencil, Trash2 } from 'lucide-react'

export default async function AdminNewsPage() {
  const supabase = await createServerClient()
  const { data: news } = await supabase
    .from('news_events')
    .select('*')
    .order('date', { ascending: false })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-playfair font-bold text-kasu-green">Manage News & Events</h1>
        <Link href="/admin/news/new">
          <Button className="bg-kasu-green hover:bg-kasu-green-mid">
            <Plus size={16} className="mr-1" /> Add News
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {news?.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{item.title}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{item.type}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{new Date(item.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                  <Link href={`/admin/news/${item.id}/edit`}>
                    <Button variant="outline" size="sm"><Pencil size={14} /></Button>
                  </Link>
                  <form action={deleteNews.bind(null, item.id)} className="inline">
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