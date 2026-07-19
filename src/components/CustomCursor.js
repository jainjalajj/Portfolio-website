'use client'

import { useEffect, useState, useRef } from 'react'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    // Check if device supports hover (desktop)
    if (window.matchMedia('(pointer: coarse)').matches) return

    const updateMousePosition = (e) => {
      // Direct DOM manipulation for zero lag
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 6}px, ${e.clientY - 6}px, 0)`
      }
      if (ringRef.current) {
        // Add a tiny delay to the ring for the "follower" effect, but keep it smooth
        // If user wants absolute 0 lag for both, just set it instantly:
        ringRef.current.style.transform = `translate3d(${e.clientX - 24}px, ${e.clientY - 24}px, 0)`
      }
      
      // Check if hovering over clickable elements
      const target = e.target
      const isClickable = 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button')

      setIsHovering(isClickable)
    }

    // Hide default cursor globally
    document.documentElement.style.cursor = 'none'

    window.addEventListener('mousemove', updateMousePosition)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      document.documentElement.style.cursor = 'auto'
    }
  }, [])

  // Do not render cursor on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      {/* Outer Glow Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 w-12 h-12 rounded-full border border-primary-500/30 pointer-events-none z-[9999] backdrop-blur-[2px] flex items-center justify-center transition-all duration-300 ease-out will-change-transform`}
        style={{
          boxShadow: '0 0 20px rgba(139,92,246,0.3)',
          transform: 'translate3d(-100px, -100px, 0)',
          backgroundColor: isHovering ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.1)',
          scale: isHovering ? 1.5 : 1,
        }}
      />
      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-3 h-3 bg-primary-500 rounded-full pointer-events-none z-[10000] will-change-transform"
        style={{
          boxShadow: '0 0 10px rgba(139,92,246,0.8)',
          transform: 'translate3d(-100px, -100px, 0)',
          transition: 'opacity 0.2s, scale 0.2s',
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
      />
    </>
  )
}
