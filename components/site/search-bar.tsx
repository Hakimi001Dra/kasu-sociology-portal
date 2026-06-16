// components/site/search-bar.tsx
'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'

interface SearchBarProps {
  onSearch?: (query: string) => void
  placeholder?: string
}

export function SearchBar({ onSearch, placeholder = 'Author, title, keyword, volume…' }: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) onSearch(query)
  }

  return (
    <div className="bg-kasu-green-light border-t-2 border-kasu-gold py-5">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <span className="text-sm font-semibold text-kasu-green whitespace-nowrap">Search Publications:</span>
          <form onSubmit={handleSubmit} className="flex-1 max-w-2xl">
            <div className="flex bg-white border border-border rounded-md overflow-hidden">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="flex-1 px-4 py-2.5 text-sm outline-none"
              />
              <button
                type="submit"
                className="bg-kasu-green text-white px-6 font-semibold text-sm hover:bg-kasu-green-mid transition-colors flex items-center gap-2"
              >
                <Search size={16} /> Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}