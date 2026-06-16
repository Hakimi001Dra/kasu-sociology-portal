import { createServerClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const supabase = await createServerClient()
  const { data: journals } = await supabase.from('journals').select('slug')
  return journals?.map((j) => ({ slug: j.slug })) || []
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createServerClient()
  const { data: article } = await supabase
    .from('journals')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!article) notFound()

  return (
    <>
      <div className="bg-kasu-green py-12">
        <div className="container-custom">
          <Link href="/journals" className="inline-flex items-center gap-2 text-kasu-gold hover:text-kasu-gold/80 mb-4">
            <ArrowLeft size={16} /> Back to Journals
          </Link>
          <h1 className="font-playfair text-3xl md:text-5xl font-bold text-white max-w-4xl">
            {article.title}
          </h1>
          <div className="flex flex-wrap gap-4 mt-4 text-white/80">
            <span>{article.authors}</span>
            <span>•</span>
            <span>Vol. {article.volume} · {article.year}</span>
            <span>•</span>
            <span>Published: {new Date(article.published_date).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-playfair text-2xl font-semibold text-primary mb-4">Abstract</h2>
            <p className="text-secondary leading-relaxed mb-8">{article.abstract}</p>

            <div className="bg-cream border-l-4 border-kasu-gold p-6 rounded-r-lg my-8">
              <p className="text-sm text-muted mb-2"><strong>Volume:</strong> {article.volume} · Issue 1 · {article.year}</p>
              <p className="text-sm text-muted mb-2"><strong>Authors:</strong> {article.authors}</p>
              <p className="text-sm text-muted"><strong>Keywords:</strong> {article.tags?.join(', ') || 'None'}</p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
              {article.pdf_url ? (
                <Button asChild variant="gold">
                  <Link href={article.pdf_url} target="_blank">Download PDF</Link>
                </Button>
              ) : (
                <Button variant="gold" disabled>Full text coming soon</Button>
              )}
              <Button asChild variant="outline">
                <Link href="/submit">Cite this article</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}