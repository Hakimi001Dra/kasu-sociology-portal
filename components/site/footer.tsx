// components/site/footer.tsx
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-black text-white/70 pt-12 pb-6">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-kasu-green rounded-full flex items-center justify-center font-playfair text-sm font-bold text-kasu-gold">
                SΩC
              </div>
              <div>
                <div className="font-playfair text-base font-semibold text-white">Department of Sociology</div>
                <div className="text-xs text-white/50">Kaduna State University</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              Advancing sociological knowledge in Northern Nigeria and contributing to the national conversation on social development, equity, and justice.
            </p>
            <p className="text-xs mt-3 leading-relaxed">
              Faculty of Social Sciences, KASU<br />
              Tafawa Balewa Way, Kaduna, Nigeria<br />
              sociology@kasu.edu.ng · +234 (0) 62 XXX XXXX
            </p>
          </div>

          {[
            { title: 'Publications', links: ['Journal Home', 'Current Issue', 'Archives', 'Author Guidelines', 'Editorial Board', 'Peer Review Policy'] },
            { title: 'Department', links: ['About Us', 'Faculty & Staff', 'Research Areas', 'Programmes', 'Postgraduate', 'Contact HOD'] },
            { title: 'Resources', links: ['KASU E-Library', 'AJOL Listings', 'Research Ethics', 'Student Resources', 'News Archive', 'KASU Main Portal'] },
          ].map((col) => (
            <div key={col.title}>
              <h5 className="text-xs font-semibold tracking-wider uppercase text-kasu-gold mb-3">{col.title}</h5>
              <ul className="space-y-1.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs">
          <span>© 2025 Department of Sociology, Kaduna State University. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-kasu-gold transition">Privacy Policy</Link>
            <Link href="#" className="hover:text-kasu-gold transition">Accessibility</Link>
            <Link href="#" className="hover:text-kasu-gold transition">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}