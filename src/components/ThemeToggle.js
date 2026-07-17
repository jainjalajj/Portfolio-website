'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [hasClicked, setHasClicked] = useState(true)

  // Ensure component is mounted before rendering to avoid hydration issues
  useEffect(() => {
    setMounted(true)
    
    const clickedBefore = localStorage.getItem('themeClicked') === 'true'
    setHasClicked(clickedBefore)

    // Get initial theme from localStorage
    const savedTheme = localStorage.getItem('theme')
    const shouldBeDark = savedTheme === 'dark'
    setIsDark(shouldBeDark)
    
    // Apply theme to document
    if (shouldBeDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setIsDark(e.matches)
        if (e.matches) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    
    if (!hasClicked) {
      setHasClicked(true)
      localStorage.setItem('themeClicked', 'true')
    }
    
    if (newTheme) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }

    // Trigger a custom event for theme change
    window.dispatchEvent(new CustomEvent('themeChange', { 
      detail: { isDark: newTheme } 
    }))
  }

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 animate-pulse" />
    )
  }

  return (
    <div className="relative flex items-center justify-center">
      {!hasClicked && (
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none w-32 animate-pulse-slow z-50">
          <span className="text-primary-600 dark:text-primary-400 font-display font-bold whitespace-nowrap -rotate-12 mt-4 animate-bounce">
            Click it!
          </span>
          <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round">
            <path d="M10,50 Q40,10 90,50 M80,35 L90,50 L75,60" />
          </svg>
        </div>
      )}
      <button
      onClick={toggleTheme}
      className={cn(
        'relative inline-flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-500/50',
        'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700',
        'text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400',
        'transform hover:scale-110 active:scale-95'
      )}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-5 h-5">
        {/* Sun Icon */}
        <Sun
          size={20}
          className={cn(
            'absolute inset-0 transition-all duration-300 transform',
            isDark
              ? 'rotate-90 scale-0 opacity-0'
              : 'rotate-0 scale-100 opacity-100'
          )}
        />
        
        {/* Moon Icon */}
        <Moon
          size={20}
          className={cn(
            'absolute inset-0 transition-all duration-300 transform',
            isDark
              ? 'rotate-0 scale-100 opacity-100'
              : '-rotate-90 scale-0 opacity-0'
          )}
        />
      </div>
      
      {/* Subtle glow effect */}
      <div
        className={cn(
          'absolute inset-0 rounded-lg transition-opacity duration-300',
          'bg-gradient-to-r from-yellow-400/20 to-orange-400/20 dark:from-blue-400/20 dark:to-purple-400/20',
          'opacity-0 hover:opacity-100'
        )}
      />
      </button>
    </div>
  )
}
