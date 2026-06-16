import { createServerClient } from '@/lib/supabase/server'
import { SearchBar } from '@/components/site/search-bar'
import { JournalCard } from '@/components/site/journal-card'
import { NewsCard } from '@/components/site/news-card'
import { FacultyCard } from '@/components/site/faculty-card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'

export default async function HomePage() {
  const supabase = await createServerClient()

  // Fetch all required data from Supabase
  const [
    { data: journals },
    { data: faculty },
    { data: newsEvents },
    { data: programmes },
  ] = await Promise.all([
    supabase.from('journals').select('*').order('year', { ascending: false }).order('volume', { ascending: false }),
    supabase.from('faculty').select('*').order('display_order', { ascending: true }),
    supabase.from('news_events').select('*').order('date', { ascending: false }).limit(4),
    supabase.from('programmes').select('*'),
  ])

  // Calculate dynamic stats
  const yearsOfPublication = journals?.length
    ? new Date().getFullYear() - Math.min(...journals.map(j => j.year)) + 1
    : 0
  // Calculate unique research areas from journal tags
  const uniqueTags = new Set(journals?.flatMap(j => j.tags || []) || [])
  const researchAreas = uniqueTags.size
  const publishedArticles = journals?.length || 0
  const facultyMembers = faculty?.length || 0

  const featuredArticles = journals?.slice(0, 6) || []

  return (
    <>
      {/* HERO SECTION */}
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
                The Department of Sociology at Kaduna State University publishes peer‑reviewed research, drives social inquiry, and prepares the next generation of sociologists for Nigeria and beyond.
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

            {/* Dynamic Stats Cards */}
            <div className="hidden md:block bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <span className="font-playfair text-4xl font-bold text-kasu-gold">{yearsOfPublication}+</span>
                  <span className="block text-white/60 text-xs tracking-wide mt-1">Years of Publication</span>
                </div>
                <div className="text-center">
                  <span className="font-playfair text-4xl font-bold text-kasu-gold">{researchAreas}</span>
                  <span className="block text-white/60 text-xs tracking-wide mt-1">Active Research Areas</span>
                </div>
                <hr className="col-span-2 border-white/10" />
                <div className="text-center">
                  <span className="font-playfair text-4xl font-bold text-kasu-gold">{publishedArticles}+</span>
                  <span className="block text-white/60 text-xs tracking-wide mt-1">Published Articles</span>
                </div>
                <div className="text-center">
                  <span className="font-playfair text-4xl font-bold text-kasu-gold">{facultyMembers}</span>
                  <span className="block text-white/60 text-xs tracking-wide mt-1">Faculty & Associates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SearchBar />

      {/* JOURNALS SECTION */}
      <section className="section-padding bg-cream" id="journals">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-kasu-green to-kasu-green-mid rounded-xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <div>
              <h3 className="font-playfair text-xl md:text-2xl text-white font-semibold">
                KASU Journal of Sociology & Social Sciences — Vol. 12, Issue 1 (2025)
              </h3>
              <p className="text-white/70 text-sm mt-1">
                Now available online. 14 peer‑reviewed articles covering urbanisation, policy, gender, and conflict studies in Nigeria.
              </p>
            </div>
            <div className="flex gap-3">
              <Button asChild variant="gold" className="whitespace-nowrap">
                <Link href="/journals">Read Full Issue</Link>
              </Button>
              <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Link href="#">Download PDF</Link>
              </Button>
            </div>
          </div>

          <div className="mb-8">
            <span className="text-xs font-semibold tracking-wider uppercase text-kasu-gold block mb-2">Research & Publications</span>
            <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-primary heading-underline pb-4">
              Featured Journal Articles
            </h2>
            <p className="text-secondary mt-2 max-w-2xl">
              Selected peer‑reviewed articles published by faculty, researchers, and contributors to the KASU Journal of Sociology & Social Sciences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <JournalCard key={article.id} article={article} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="gold">
              <Link href="/journals">View All Publications →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* NEWS & EVENTS SECTION */}
      <section className="section-padding" id="news">
        <div className="container-custom">
          <div className="mb-8">
            <span className="text-xs font-semibold tracking-wider uppercase text-kasu-gold block mb-2">Departmental Activities</span>
            <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-primary heading-underline pb-4">
              News & Upcoming Events
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {newsEvents?.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>

            <div className="space-y-5">
              <div className="bg-white border border-border rounded-lg p-5">
                <h4 className="font-playfair font-semibold text-kasu-green border-b-2 border-kasu-gold-light pb-3 mb-3">Quick Links</h4>
                <ul className="space-y-2">
                  {['Journal Author Guidelines', 'Editorial Board', 'Postgraduate Programmes', 'Undergraduate Programmes', 'Research Ethics Policy', 'Staff Directory', 'Contact the HOD'].map((link) => (
                    <li key={link} className="text-sm text-secondary flex items-start gap-2">
                      <span className="text-kasu-gold font-bold">›</span>
                      <Link href="#" className="hover:text-kasu-green transition">{link}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-border rounded-lg p-5">
                <h4 className="font-playfair font-semibold text-kasu-green border-b-2 border-kasu-gold-light pb-3 mb-3">Archive by Volume</h4>
                <ul className="space-y-2">
                  {['Volume 12 (2025)', 'Volume 11 (2024)', 'Volume 10 (2023)', 'Volume 9 (2022)', 'Volume 8 (2021)', 'Volume 7 (2020)'].map((vol) => (
                    <li key={vol} className="text-sm text-secondary flex items-start gap-2">
                      <span className="text-kasu-gold font-bold">›</span>
                      <Link href="#" className="hover:text-kasu-green transition">{vol}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-border rounded-lg p-5">
                <h4 className="font-playfair font-semibold text-kasu-green border-b-2 border-kasu-gold-light pb-3 mb-3">Indexed In</h4>
                <ul className="space-y-2">
                  {['African Journals Online (AJOL)', 'Google Scholar', 'NigeriaJournalsOnline (NJOL)', 'EBSCO Academic'].map((idx) => (
                    <li key={idx} className="text-sm text-secondary flex items-start gap-2">
                      <span className="text-kasu-gold font-bold">›</span>
                      <span>{idx}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="section-padding bg-cream" id="about">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <span className="text-xs font-semibold tracking-wider uppercase text-kasu-gold block mb-2">About the Department</span>
              <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-primary heading-underline pb-4">
                Rooted in Kaduna.<br />Engaged with the World.
              </h2>
              <p className="text-secondary mt-4">
                The Department of Sociology at Kaduna State University is one of the foremost centres for sociological research and teaching in North‑Central Nigeria. We combine rigorous scholarship with deep community engagement.
              </p>
              <p className="text-secondary mt-4">
                Our research programmes address the most pressing social challenges in Kaduna State and Nigeria at large — from inter‑ethnic relations and rural development to urban poverty, health inequalities, and climate‑induced displacement.
              </p>
              <div className="space-y-4 mt-6">
                {[
                  { icon: '📚', title: 'Peer-Reviewed Research', desc: 'All publications undergo rigorous double‑blind review by expert panels drawn from Nigerian and international universities.' },
                  { icon: '🎓', title: 'Academic Programmes', desc: 'B.Sc., M.Sc., and Ph.D. in Sociology, with specialisations in development, criminology, and health sociology.' },
                  { icon: '🤝', title: 'Community Partnerships', desc: 'Collaborative research with state ministries, NGOs, and communities across Kaduna State.' },
                ].map((feature) => (
                  <div key={feature.title} className="flex gap-3 pt-3 border-t border-border">
                    <div className="w-9 h-9 bg-kasu-green-light rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h5 className="font-semibold text-kasu-green">{feature.title}</h5>
                      <p className="text-sm text-muted">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Accordion.Root type="single" collapsible className="space-y-3">
                {[
                  { title: '📋 Editorial Policy & Scope', content: 'The KASU Journal of Sociology & Social Sciences (KJSSS) publishes original research in all areas of sociology and cognate social science disciplines. The journal welcomes empirical, theoretical, and policy‑oriented contributions relevant to Nigerian and African societies. Articles should be 6,000–9,000 words including references, formatted in APA 7th edition.' },
                  { title: '👥 Head of Department', content: 'Prof. Maryam Aliyu\nProfessor of Social Stratification & Development\nOffice: Room 204, Faculty of Social Sciences\nEmail: hod.sociology@kasu.edu.ng\nOffice Hours: Mon & Wed, 10am – 1pm' },
                  { title: '🌍 Research Areas', content: `Urban Sociology · Rural Development · Social Stratification · Political Sociology · Sociology of Health · Gender & Society · Criminology · Environmental Sociology · Religion & Society · Migration Studies · Conflict & Peacebuilding` },
                  { title: '📅 Academic Calendar 2024/25', content: 'First Semester: October – February\nSecond Semester: March – July\nPostgraduate Admissions: Applications open August\nJournal Submission Deadlines: March (Vol. 1) · September (Vol. 2)' },
                ].map((panel, idx) => (
                  <Accordion.Item key={idx} value={`panel-${idx}`} className="border border-border rounded-lg overflow-hidden">
                    <Accordion.Header className="bg-kasu-green-light">
                      <Accordion.Trigger className="w-full flex justify-between items-center p-4 text-left font-semibold text-kasu-green hover:bg-kasu-green-light/70 transition-colors group">
                        <span className="flex gap-2 items-center">{panel.title}</span>
                        <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="p-4 text-sm text-secondary leading-relaxed whitespace-pre-line">
                      {panel.content}
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </div>
          </div>
        </div>
      </section>

      {/* FACULTY SECTION */}
      <section className="section-padding" id="faculty">
        <div className="container-custom">
          <div className="mb-8 text-center md:text-left">
            <span className="text-xs font-semibold tracking-wider uppercase text-kasu-gold block mb-2">Our People</span>
            <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-primary heading-underline pb-4">
              Faculty & Staff
            </h2>
            <p className="text-secondary mt-2 max-w-2xl">
              Meet the scholars leading research and teaching at the Department of Sociology, KASU.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {faculty?.map((member) => (
              <FacultyCard key={member.id} member={member} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="gold">
              <Link href="/faculty">View All Faculty →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SUBMISSION SECTION */}
      <section className="section-padding bg-kasu-green text-white" id="submit">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <span className="text-xs font-semibold tracking-wider uppercase text-kasu-gold block mb-2">For Researchers</span>
              <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-white heading-underline pb-4">
                Submit Your Research
              </h2>
              <p className="text-white/70 mt-2">
                We welcome original research from Nigerian and international scholars. All submissions are double‑blind peer reviewed and decisions communicated within 8 weeks.
              </p>
              <ol className="mt-8 space-y-4">
                {[
                  'Prepare your manuscript according to the KJSSS Author Guidelines (APA 7th edition, 6,000–9,000 words)',
                  'Remove all author‑identifying information for blind review',
                  'Submit via the online portal or email the editorial office directly',
                  'Receive acknowledgement and your manuscript reference number',
                  'Peer review process (8–12 weeks average turnaround)',
                  'Revisions, acceptance, and publication in next available issue',
                ].map((step, idx) => (
                  <li key={idx} className="flex gap-3 text-white/80 text-sm">
                    <span className="font-playfair text-2xl font-bold text-kasu-gold leading-none min-w-[30px]">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <h4 className="font-playfair text-xl font-semibold text-white mb-4">Quick Submission Form</h4>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Author Name(s)</label>
                  <input type="text" className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/40 focus:outline-none focus:border-kasu-gold" placeholder="Dr. Jane Doe; Prof. John Musa" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Email Address</label>
                  <input type="email" className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/40 focus:outline-none focus:border-kasu-gold" placeholder="author@institution.edu.ng" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Manuscript Title</label>
                  <input type="text" className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/40 focus:outline-none focus:border-kasu-gold" placeholder="Full title of your paper" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Research Area</label>
                  <select className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-kasu-gold">
                    <option className="bg-kasu-green">Urban Sociology</option>
                    <option className="bg-kasu-green">Gender & Society</option>
                    <option className="bg-kasu-green">Political Sociology</option>
                    <option className="bg-kasu-green">Health Sociology</option>
                    <option className="bg-kasu-green">Environmental Sociology</option>
                    <option className="bg-kasu-green">Rural Development</option>
                    <option className="bg-kasu-green">Criminology</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Abstract (max 250 words)</label>
                  <textarea rows={3} className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/40 focus:outline-none focus:border-kasu-gold resize-vertical" placeholder="Paste your abstract here…"></textarea>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button asChild variant="gold" className="flex-1 text-center">
                    <Link href="#">Submit via Portal →</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 flex-1">
                    <Link href="mailto:kjsss@kasu.edu.ng">Email Editorial Office</Link>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}