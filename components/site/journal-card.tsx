import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import type { Journal } from '@/types/database'

// Helper to format date safely
function formatDate(dateString: string) {
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return 'Invalid date'
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  } catch {
    return 'Invalid date'
  }
}

// Map tags to badge styles (add more as needed)
const badgeColorMap: Record<string, string> = {
  'Urban Studies': 'bg-blue-50 text-blue-700',
  'Policy': 'bg-orange-50 text-orange-700',
  'Gender': 'bg-pink-50 text-pink-700',
  'Rural': 'bg-green-50 text-green-700',
  'Politics': 'bg-purple-50 text-purple-700',
  'Identity': 'bg-indigo-50 text-indigo-700',
  'Social Capital': 'bg-teal-50 text-teal-700',
  'Youth': 'bg-cyan-50 text-cyan-700',
  'Religion': 'bg-amber-50 text-amber-700',
  'Health': 'bg-emerald-50 text-emerald-700',
  'Climate': 'bg-lime-50 text-lime-700',
  'Displacement': 'bg-red-50 text-red-700',
}

export function JournalCard({ article }: { article: Journal }) {
  return (
    <div className="bg-white border border-border rounded-lg p-5 transition-all hover:shadow-lg hover:-translate-y-0.5 hover:border-kasu-green-mid relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-kasu-green" />
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-semibold tracking-wide uppercase text-kasu-green bg-kasu-green-light px-2.5 py-1 rounded-full">
          Vol. {article.volume} · {article.year}
        </span>
        <span className="text-xs text-muted">{formatDate(article.published_date)}</span>
      </div>
      <h3 className="font-plex font-semibold text-base text-primary leading-tight mb-2 line-clamp-2">
        {article.title}
      </h3>
      <p className="text-xs text-muted italic mb-3">{article.authors}</p>
      <p className="text-sm text-secondary leading-relaxed mb-4 line-clamp-3">
        {article.abstract}
      </p>
      <div className="flex justify-between items-center pt-3 border-t border-border mt-auto">
        <div className="flex gap-1.5 flex-wrap">
          {article.tags?.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" className={badgeColorMap[tag] || 'bg-gray-100 text-gray-700'}>
              {tag}
            </Badge>
          ))}
        </div>
        <Link href={`/journals/${article.slug}`} className="text-sm font-medium text-kasu-green hover:gap-2 transition-all inline-flex items-center gap-1">
          Read →
        </Link>
      </div>
    </div>
  )
}