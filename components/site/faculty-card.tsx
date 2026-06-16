// components/site/faculty-card.tsx
import type { FacultyMember } from '@/types/faculty'

export function FacultyCard({ member }: { member: FacultyMember }) {
  const initials = member.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="bg-white border border-border rounded-lg overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 text-center group">
      <div className="h-28 bg-kasu-green flex items-center justify-center font-playfair text-3xl font-bold text-kasu-gold">
        {initials}
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-kasu-green">{member.name}</h4>
        <p className="text-xs font-medium text-kasu-green/70 mt-0.5">{member.title}</p>
        <p className="text-xs text-muted italic mt-2 line-clamp-2">{member.specialization}</p>
      </div>
    </div>
  )
}