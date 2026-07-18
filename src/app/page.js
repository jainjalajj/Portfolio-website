'use client'

import { useEffect, useState } from 'react'
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
import PageLoader from '@/components/PageLoader'
import { initializeAnimations } from '@/lib/animations'

export default function HomePage() {
  const [isPageLoaded, setIsPageLoaded] = useState(false)
  useEffect(() => {
    // Initialize animations after a short delay to ensure DOM is ready
    const initTimer = setTimeout(() => {
      try {
        console.log('Initializing animations...')
        initializeAnimations()
        console.log('Animations initialized successfully')
      } catch (error) {
        console.error('Animation initialization failed:', error)
      }
    }, 500) // Increased delay to ensure DOM is fully ready

    // Smooth scrolling for anchor links
    const handleAnchorClick = (e) => {
      e.preventDefault()
      const target = document.querySelector(e.currentTarget.getAttribute('href'))
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }

    // Add event listeners to anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]')
    anchorLinks.forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick)
    })

    // Add loading class removal after initial load
    const removeLoadingClass = () => {
      document.body.classList.add('loaded')
      setIsPageLoaded(true)
      // Don't manually trigger animations - let intersection observer handle it
    }

    if (document.readyState === 'complete') {
      removeLoadingClass()
    } else {
      window.addEventListener('load', removeLoadingClass)
    }

    return () => {
      clearTimeout(initTimer)
      window.removeEventListener('load', removeLoadingClass)
      anchorLinks.forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick)
      })
    }
  }, [])

  return (
    <ErrorBoundary>
      <PageLoader />
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
