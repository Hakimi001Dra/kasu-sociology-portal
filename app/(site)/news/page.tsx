import { createServerClient } from '@/lib/supabase/server'
import { NewsCard } from '@/components/site/news-card'

export const metadata = {
  title: 'News & Events — Department of Sociology, KASU',
  description: 'Stay updated with the latest departmental news, seminars, workshops, and calls for papers.',
}

export default async function NewsPage() {
  const supabase = await createServerClient()
  const { data: news } = await supabase
    .from('news_events')
    .select('*')
    .order('date', { ascending: false })

  return (
    <>
      <div className="bg-kasu-green py-12">
        <div className="container-custom">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white">News & Events</h1>
          <p className="text-white/70 text-lg mt-2 max-w-2xl">
            Latest announcements, seminars, workshops, and departmental activities.
          </p>
        </div>
      </div>
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto space-y-4">
            {news?.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}