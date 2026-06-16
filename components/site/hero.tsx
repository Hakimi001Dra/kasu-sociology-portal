// components/site/hero.tsx
'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="bg-kasu-green py-20 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_39px,rgba(255,255,255,0.03)_39px,rgba(255,255,255,0.03)_40px),repeating-linear-gradient(90deg,transparent,transparent_39px,rgba(255,255,255,0.03)_39px,rgba(255,255,255,0.03)_40px)]" />
      <div className="container-custom relative">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-kasu-gold bg-kasu-gold/15 border border-kasu-gold/30 px-3 py-1.5 rounded-full mb-6">
              Advancing Social Science in Northern Nigeria
            </div>
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Understanding Society,<br />
              <em className="text-kasu-gold not-italic">Shaping the Future</em>
            </h1>
            <p className="text-white/75 text-lg mt-4 max-w-lg">
              The Department of Sociology at Kaduna State University publishes peer-reviewed research, drives social inquiry, and prepares the next generation of sociologists for Nigeria and beyond.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button asChild size="lg" className="bg-kasu-gold text-kasu-green hover:bg-kasu-gold/90 font-semibold">
                <Link href="/journals">Browse Our Journals →</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/40 text-white/90 hover:bg-white/10">
                <Link href="/#about">About the Department</Link>
              </Button>
            </div>
          </div>

          {/* Stats Cards - Desktop only */}
          <div className="hidden md:block bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <span className="font-playfair text-4xl font-bold text-kasu-gold">12+</span>
                <span className="block text-white/60 text-xs tracking-wide mt-1">Years of Publication</span>
              </div>
              <div className="text-center">
                <span className="font-playfair text-4xl font-bold text-kasu-gold">6</span>
                <span className="block text-white/60 text-xs tracking-wide mt-1">Active Research Areas</span>
              </div>
              <hr className="col-span-2 border-white/10" />
              <div className="text-center">
                <span className="font-playfair text-4xl font-bold text-kasu-gold">200+</span>
                <span className="block text-white/60 text-xs tracking-wide mt-1">Published Articles</span>
              </div>
              <div className="text-center">
                <span className="font-playfair text-4xl font-bold text-kasu-gold">48</span>
                <span className="block text-white/60 text-xs tracking-wide mt-1">Faculty & Associates</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}