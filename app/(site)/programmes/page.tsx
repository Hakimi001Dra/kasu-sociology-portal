import { createServerClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata = {
  title: 'Academic Programmes — Department of Sociology, KASU',
  description: 'Explore our B.Sc., M.Sc., and Ph.D. programmes in Sociology at Kaduna State University.',
}

export default async function ProgrammesPage() {
  const supabase = await createServerClient()
  const { data: programmes } = await supabase
    .from('programmes')
    .select('*')
    .order('level', { ascending: true })

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'B.Sc': return 'border-blue-500 bg-blue-50'
      case 'M.Sc': return 'border-green-500 bg-green-50'
      case 'PhD': return 'border-purple-500 bg-purple-50'
      default: return 'border-gray-500 bg-gray-50'
    }
  }

  return (
    <>
      <div className="bg-kasu-green py-12">
        <div className="container-custom">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white">
            Academic Programmes
          </h1>
          <p className="text-white/70 text-lg mt-2 max-w-2xl">
            Discover our undergraduate and postgraduate programmes in Sociology.
          </p>
        </div>
      </div>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programmes?.map((programme) => (
              <div
                key={programme.id}
                className={`border-l-4 rounded-lg shadow-sm bg-white p-6 ${getLevelColor(programme.level)}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-playfair text-xl font-bold text-primary">
                    {programme.title}
                  </h3>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white shadow-sm">
                    {programme.level}
                  </span>
                </div>
                <p className="text-secondary text-sm mb-3">{programme.description}</p>
                {programme.duration && (
                  <p className="text-xs text-muted flex items-center gap-1">
                    <span>⏱️</span> Duration: {programme.duration}
                  </p>
                )}
              </div>
            ))}
          </div>

          {(!programmes || programmes.length === 0) && (
            <div className="text-center py-12">
              <p className="text-secondary">No programmes have been added yet. Please check back later.</p>
            </div>
          )}

          <div className="mt-12 text-center">
            <Button asChild variant="gold">
              <Link href="/submit">Apply Now →</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}