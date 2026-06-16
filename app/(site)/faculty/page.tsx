import { createServerClient } from '@/lib/supabase/server'
import { FacultyCard } from '@/components/site/faculty-card'

export const metadata = {
  title: 'Faculty — Department of Sociology, KASU',
  description: 'Meet our distinguished faculty members and their research specializations.',
}

export default async function FacultyPage() {
  const supabase = await createServerClient()
  const { data: faculty } = await supabase
    .from('faculty')
    .select('*')
    .order('display_order', { ascending: true })

  return (
    <>
      <div className="bg-kasu-green py-12">
        <div className="container-custom">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white">Our Faculty</h1>
          <p className="text-white/70 text-lg mt-2 max-w-2xl">
            Dedicated scholars committed to excellence in teaching and research.
          </p>
        </div>
      </div>
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {faculty?.map((member) => (
              <FacultyCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}