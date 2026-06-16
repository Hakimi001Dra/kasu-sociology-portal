export type Journal = {
  id: string
  title: string
  slug: string
  authors: string
  abstract: string
  volume: number
  year: number
  published_date: string
  tags: string[] | null
  pdf_url: string | null
  created_at: string
  updated_at: string
}

export type Faculty = {
  id: string
  name: string
  title: string
  specialization: string
  email: string | null
  office: string | null
  photo_url: string | null
  display_order: number
  created_at: string
  updated_at: string
}

export type NewsEvent = {
  id: string
  title: string
  slug: string
  type: 'Seminar' | 'Call for Papers' | 'Department News' | 'Workshop'
  date: string
  description: string
  image_url: string | null
  created_at: string
  updated_at: string
}

export type Programme = {
  id: string
  title: string
  level: 'B.Sc' | 'M.Sc' | 'PhD'
  description: string
  duration: string | null
  created_at: string
  updated_at: string
}