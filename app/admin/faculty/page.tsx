import { createServerClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { deleteFaculty } from '@/actions/admin'
import { Button } from '@/components/ui/button'
import { Plus, Pencil, Trash2 } from 'lucide-react'

export default async function AdminFacultyPage() {
  const supabase = await createServerClient()
  const { data: faculty } = await supabase
    .from('faculty')
    .select('*')
    .order('display_order', { ascending: true })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-playfair font-bold text-kasu-green">Manage Faculty</h1>
        <Link href="/admin/faculty/new">
          <Button className="bg-kasu-green hover:bg-kasu-green-mid">
            <Plus size={16} className="mr-1" /> Add Faculty
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {faculty?.map((member) => (
              <tr key={member.id}>
                <td className="px-6 py-4">
                  {member.photo_url ? (
                    <img src={member.photo_url} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">No img</div>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{member.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{member.title}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{member.specialization}</td>
                <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                  <Link href={`/admin/faculty/${member.id}/edit`}>
                    <Button variant="outline" size="sm"><Pencil size={14} /></Button>
                  </Link>
                  <form action={deleteFaculty.bind(null, member.id)} className="inline">
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