export interface JournalArticle {
  id: string
  slug: string
  title: string
  authors: string
  abstract: string
  volume: number
  year: number
  publishedDate: string
  tags: string[]
  pdfUrl?: string
}