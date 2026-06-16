import { createServerClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Users, Newspaper, GraduationCap } from 'lucide-react'

async function getStats() {
  const supabase = await createServerClient()
  const [journals, faculty, news, programmes] = await Promise.all([
    supabase.from('journals').select('*', { count: 'exact', head: true }),
    supabase.from('faculty').select('*', { count: 'exact', head: true }),
    supabase.from('news_events').select('*', { count: 'exact', head: true }),
    supabase.from('programmes').select('*', { count: 'exact', head: true }),
  ])
  return {
    journals: journals.count || 0,
    faculty: faculty.count || 0,
    news: news.count || 0,
    programmes: programmes.count || 0,
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const cards = [
    { title: 'Journals', value: stats.journals, icon: BookOpen, color: 'bg-blue-500' },
    { title: 'Faculty Members', value: stats.faculty, icon: Users, color: 'bg-green-500' },
    { title: 'News & Events', value: stats.news, icon: Newspaper, color: 'bg-orange-500' },
    { title: 'Programmes', value: stats.programmes, icon: GraduationCap, color: 'bg-purple-500' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-playfair font-bold text-kasu-green mb-6">Dashboard</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${card.color} bg-opacity-10`}>
                <card.icon className="h-4 w-4 text-gray-700" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}