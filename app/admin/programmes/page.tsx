import { createServerClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { deleteProgramme } from '@/actions/admin'
import { Button } from '@/components/ui/button'
import { Plus, Pencil, Trash2 } from 'lucide-react'

export default async function AdminProgrammesPage() {
  const supabase = await createServerClient()
  const { data: programmes } = await supabase
    .from('programmes')
    .select('*')
    .order('level', { ascending: true })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-playfair font-bold text-kasu-green">Manage Programmes</h1>
        <Link href="/admin/programmes/new">
          <Button className="bg-kasu-green hover:bg-kasu-green-mid">
            <Plus size={16} className="mr-1" /> Add Programme
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {programmes?.map((programme) => (
              <tr key={programme.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{programme.title}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{programme.level}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{programme.duration || '-'}</td>
                <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                  <Link href={`/admin/programmes/${programme.id}/edit`}>
                    <Button variant="outline" size="sm"><Pencil size={14} /></Button>
                  </Link>
                  <form action={deleteProgramme.bind(null, programme.id)} className="inline">
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