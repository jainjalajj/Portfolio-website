'use client'

import { useEffect } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import ErrorBoundary from '@/components/ErrorBoundary'

export default function HomePage() {
  useEffect(() => {
    // Mark body as loaded for any remaining CSS fallbacks
    document.body.classList.add('loaded')
  }, [])

  return (
    <ErrorBoundary>
      <main className="relative">
        <Header />

        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />

        <Footer />
        <ScrollToTop />
      </main>
    </ErrorBoundary>
  )
}
