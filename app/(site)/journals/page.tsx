import { createServerClient } from '@/lib/supabase/server'
import { JournalCard } from '@/components/site/journal-card'
import { SearchBar } from '@/components/site/search-bar'

export const metadata = {
  title: 'Journals — Department of Sociology, KASU',
  description: 'Peer-reviewed research publications from the Department of Sociology at Kaduna State University.',
}

export default async function JournalsPage() {
  const supabase = await createServerClient()
  const { data: journals } = await supabase
    .from('journals')
    .select('*')
    .order('year', { ascending: false })
    .order('volume', { ascending: false })

  return (
    <>
      <div className="bg-kasu-green py-12">
        <div className="container-custom">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white">
            Research Journals
          </h1>
          <p className="text-white/70 text-lg mt-2 max-w-2xl">
            The KASU Journal of Sociology & Social Sciences — advancing sociological knowledge in Nigeria and beyond.
          </p>
        </div>
      </div>
      <SearchBar />
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {journals?.map((article) => (
              <JournalCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}