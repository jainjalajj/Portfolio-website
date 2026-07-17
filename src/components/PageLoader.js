'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 300)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    // Ensure loading completes within 3 seconds
    const timeout = setTimeout(() => {
      setProgress(100)
      setTimeout(() => setIsLoading(false), 300)
    }, 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div className={cn(
      'fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-slate-900 transition-opacity duration-300',
      progress >= 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'
    )}>
      <div className="text-center space-y-6">
        {/* Logo/Name */}
        <div className="text-3xl font-bold font-display text-slate-900 dark:text-white">
          Jalaj<span className="text-primary-600 dark:text-primary-400">.</span>
        </div>
        
        {/* Loading Spinner */}
        <div className="relative w-16 h-16 mx-auto">
          <div className="absolute inset-0 border-4 border-slate-200 dark:border-slate-700 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary-600 to-primary-400 transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Loading... {Math.round(Math.min(progress, 100))}%
          </div>
        </div>
      </div>
    </div>
  )
}