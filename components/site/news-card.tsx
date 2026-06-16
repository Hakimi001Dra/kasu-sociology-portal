// components/site/news-card.tsx
import type { NewsEvent } from '@/types/news'

const typeStyles = {
  Seminar: 'text-kasu-gold',
  'Call for Papers': 'text-red-600',
  'Department News': 'text-kasu-green',
  Workshop: 'text-kasu-gold',
}

export function NewsCard({ item }: { item: NewsEvent }) {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const date = new Date(item.date)
  
  return (
    <div className="flex gap-4 p-5 bg-white border border-border rounded-lg transition-all hover:border-kasu-green hover:shadow-sm">
      <div className="bg-kasu-green text-white rounded-lg px-3 py-2 text-center min-w-[60px] h-fit">
        <span className="font-playfair text-2xl font-bold leading-none">{date.getDate()}</span>
        <span className="text-xs uppercase tracking-wide block mt-1 opacity-80">{monthNames[date.getMonth()]}</span>
      </div>
      <div>
        <span className={`text-xs font-semibold uppercase tracking-wide ${typeStyles[item.type as keyof typeof typeStyles] || 'text-kasu-green'}`}>
          {item.type}
        </span>
        <h4 className="font-semibold text-kasu-green mt-1">{item.title}</h4>
        <p className="text-sm text-secondary mt-1 line-clamp-3">{item.description}</p>
      </div>
    </div>
  )
}