'use client'

import { cn } from '@/lib/utils'

export default function LoadingSpinner({ size = 'md', color = 'primary', className }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const colorClasses = {
    primary: 'border-primary-600',
    white: 'border-white',
    slate: 'border-slate-600'
  }

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div
        className={cn(
          'border-2 border-t-transparent rounded-full animate-spin',
          sizeClasses[size],
          colorClasses[color]
        )}
        role="status"
        aria-label="Loading"
      />
    </div>
  )
}

// Alternative animated loading component
export function LoadingDots({ className }) {
  return (
    <div className={cn('flex items-center justify-center space-x-2', className)}>
      <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  )
}

// Skeleton loading component
export function SkeletonCard({ className }) {
  return (
    <div className={cn('animate-pulse bg-slate-100 dark:bg-slate-800 rounded-xl', className)}>
      <div className="aspect-video bg-slate-200 dark:bg-slate-700 rounded-t-xl" />
      <div className="p-6 space-y-4">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
        <div className="space-y-2">
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-5/6" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-16" />
          <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-20" />
          <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-14" />
        </div>
      </div>
    </div>
  )
}
