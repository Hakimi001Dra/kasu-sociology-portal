// app/submit/page.tsx
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata = {
  title: 'Submit Paper — Department of Sociology, KASU',
  description: 'Submit your research to the KASU Journal of Sociology & Social Sciences.',
}

export default function SubmitPage() {
  return (
    <>
      <div className="bg-kasu-green py-12">
        <div className="container-custom">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white">Submit Your Research</h1>
          <p className="text-white/70 text-lg mt-2 max-w-2xl">
            Share your work with the academic community through our peer-reviewed journal.
          </p>
        </div>
      </div>
      <section className="section-padding bg-cream">
        <div className="container-custom max-w-4xl">
          <div className="bg-white border border-border rounded-xl p-6 md:p-8 shadow-sm">
            <h2 className="font-playfair text-2xl font-semibold text-primary mb-6">Manuscript Submission Form</h2>
            <form className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1">Author Name(s) *</label>
                  <input type="text" className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:border-kasu-gold" placeholder="Dr. Jane Doe; Prof. John Musa" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1">Email Address *</label>
                  <input type="email" className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:border-kasu-gold" placeholder="author@institution.edu.ng" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Manuscript Title *</label>
                <input type="text" className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:border-kasu-gold" placeholder="Full title of your paper" />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Research Area</label>
                <select className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:border-kasu-gold">
                  <option>Urban Sociology</option>
                  <option>Gender & Society</option>
                  <option>Political Sociology</option>
                  <option>Health Sociology</option>
                  <option>Environmental Sociology</option>
                  <option>Rural Development</option>
                  <option>Criminology</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Abstract (max 250 words) *</label>
                <textarea rows={4} className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:border-kasu-gold resize-vertical" placeholder="Paste your abstract here…"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Manuscript File (PDF/DOCX)</label>
                <input type="file" className="w-full text-sm text-muted file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-kasu-green file:text-white hover:file:bg-kasu-green-mid" />
              </div>
              <div className="pt-4">
                <Button type="submit" variant="gold" size="lg" className="w-full md:w-auto">Submit Manuscript →</Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}