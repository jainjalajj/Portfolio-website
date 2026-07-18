'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    // Check if device supports hover (desktop)
    if (window.matchMedia('(pointer: coarse)').matches) return

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      // Check if hovering over clickable elements
      const target = e.target
      const isClickable = 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        window.getComputedStyle(target).cursor === 'pointer'

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
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full border border-primary-500/30 bg-primary-500/10 pointer-events-none z-[9999] backdrop-blur-[2px] shadow-[0_0_20px_rgba(139,92,246,0.3)] flex items-center justify-center"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.1)',
        }}
        transition={{ type: "spring", mass: 0.1, stiffness: 150, damping: 15 }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-primary-500 rounded-full pointer-events-none z-[10000] shadow-[0_0_10px_rgba(139,92,246,0.8)]"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1
        }}
        transition={{ type: "spring", mass: 0.05, stiffness: 200, damping: 15 }}
      />
    </>
  )
}
