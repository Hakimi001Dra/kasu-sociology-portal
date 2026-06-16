export interface NewsEvent {
  id: string
  title: string
  date: string
  type: 'Seminar' | 'Call for Papers' | 'Department News' | 'Workshop'
  description: string
}