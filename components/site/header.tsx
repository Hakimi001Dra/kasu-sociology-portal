// components/site/header.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const navItems = [
  { href: '/#about', label: 'About' },
  { href: '/journals', label: 'Journals' },
  { href: '/faculty', label: 'Faculty' },
  { href: '/news', label: 'News & Events' },
  { href: '/programmes', label: 'Programmes' },
  { href: '/submit', label: 'Submit Paper', isButton: true },
]

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Top Bar */}
      <div className="bg-kasu-green text-white/80 text-xs py-1.5">
        <div className="container-custom flex justify-between items-center">
          <span>📍 Faculty of Social Sciences, Kaduna State University — Kaduna, Nigeria</span>
          <div className="hidden md:flex gap-4">
            <Link href="#" className="hover:text-kasu-gold transition">KASU Main Site</Link>
            <Link href="#" className="hover:text-kasu-gold transition">E-Library</Link>
            <Link href="#" className="hover:text-kasu-gold transition">Contact</Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-kasu-green shadow-sm">
        <div className="container-custom flex items-center justify-between h-[72px]">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-kasu-green rounded-full flex items-center justify-center font-playfair text-lg font-bold text-kasu-gold">
              SΩC
            </div>
            <div className="leading-tight">
              <span className="font-playfair font-semibold text-kasu-green block text-sm">
                Sociology Department
              </span>
              <span className="text-xs text-muted uppercase tracking-wide">
                Kaduna State University
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      px-3 py-1.5 text-sm font-medium rounded-md transition-all
                      ${item.isButton 
                        ? 'bg-kasu-green text-white hover:bg-kasu-green-mid' 
                        : 'text-secondary hover:bg-kasu-green-light hover:text-kasu-green'
                      }
                      ${pathname === item.href ? 'bg-kasu-green-light text-kasu-green' : ''}
                    `}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-border py-4 px-4">
            <ul className="flex flex-col gap-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      block px-3 py-2 text-sm font-medium rounded-md transition-all
                      ${item.isButton 
                        ? 'bg-kasu-green text-white text-center' 
                        : 'text-secondary hover:bg-kasu-green-light hover:text-kasu-green'
                      }
                    `}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </>
  )
}