'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const progressRef = useRef(null)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = document.documentElement.scrollTop
          const maxHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
          const progress = (scrolled / maxHeight) * 100

          // Update SVG directly via ref — no React re-render
          if (progressRef.current) {
            progressRef.current.setAttribute('stroke-dasharray', `${progress}, 100`)
          }

          // Only trigger re-render when visibility threshold crosses
          const shouldBeVisible = scrolled > 300
          setIsVisible(prev => prev !== shouldBeVisible ? shouldBeVisible : prev)

          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-8 right-8 z-40 p-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary-500/50 group',
        'animate-fade-in'
      )}
      aria-label="Scroll to top"
    >
      {/* Progress Circle */}
      <svg
        className="absolute inset-0 w-full h-full -rotate-90 opacity-30"
        viewBox="0 0 36 36"
      >
        <path
          className="text-white/20"
          strokeDasharray="100, 100"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          ref={progressRef}
          className="text-white"
          strokeDasharray="0, 100"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      
      {/* Arrow Icon */}
      <ArrowUp 
        size={20} 
        className="relative z-10 group-hover:-translate-y-1 transition-transform duration-300" 
      />
    </button>
  )
}

