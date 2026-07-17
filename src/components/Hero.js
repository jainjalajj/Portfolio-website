'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, Download, Mail, Github, Linkedin, Twitter } from 'lucide-react'
import { PERSONAL_INFO, SOCIAL_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export default function Hero() {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  
  const titles = [
    PERSONAL_INFO.title,
    'UI/UX Enthusiast',
    'Problem Solver',
    'Creative Developer'
  ]

  // Typing animation effect
  useEffect(() => {
    const currentTitle = titles[currentIndex]
    
    if (isTyping) {
      if (displayText.length < currentTitle.length) {
        const timer = setTimeout(() => {
          setDisplayText(currentTitle.slice(0, displayText.length + 1))
        }, 100)
        return () => clearTimeout(timer)
      } else {
        const timer = setTimeout(() => {
          setIsTyping(false)
        }, 2000)
        return () => clearTimeout(timer)
      }
    } else {
      if (displayText.length > 0) {
        const timer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 50)
        return () => clearTimeout(timer)
      } else {
        setCurrentIndex((prev) => (prev + 1) % titles.length)
        setIsTyping(true)
      }
    }
  }, [displayText, currentIndex, isTyping, titles])

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({
      behavior: 'smooth'
    })
  }

  const handleDownloadResume = () => {
    window.open(PERSONAL_INFO.resume, '_blank')
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 lg:pt-32 overflow-hidden bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-hero-pattern opacity-5" />
      
      {/* Animated Background Shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary-500/10 rounded-full blur-xl animate-pulse-slow" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-primary-600/10 rounded-full blur-2xl animate-bounce-slow" />
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-primary-400/10 rounded-full blur-lg animate-pulse-slow delay-1000" />
      
      {/* Parallax Elements */}
      <div className="parallax absolute top-1/4 left-1/3 w-2 h-2 bg-primary-500 rounded-full opacity-60" data-speed="0.3" />
      <div className="parallax absolute top-3/4 right-1/4 w-1 h-1 bg-primary-600 rounded-full opacity-40" data-speed="0.5" />
      <div className="parallax absolute top-1/2 left-1/6 w-3 h-3 bg-primary-400 rounded-full opacity-30" data-speed="0.7" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Profile Image */}
          <div className="mb-8 relative inline-block">
            <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-white dark:border-slate-700 shadow-2xl mx-auto relative z-10 hover-glow">
              <img
                src={PERSONAL_INFO.profileImage}
                alt={PERSONAL_INFO.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjFGNUY5Ii8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIzMCIgZmlsbD0iIzk0QTNCOCIvPgo8cGF0aCBkPSJNNDAgMTYwQzQwIDEzNS44IDYwLjIgMTE2IDg1IDExNkgxMTVDMTM5LjggMTE2IDE2MCAxMzUuOCAxNjAgMTYwVjIwMEg0MFYxNjBaIiBmaWxsPSIjOTRBM0I4Ii8+Cjwvc3ZnPgo='
                }}
              />
            </div>
            {/* Floating animation rings */}
            <div className="absolute inset-0 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full border-2 border-primary-500/20 animate-ping mx-auto" />
            <div className="absolute inset-2 w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full border border-primary-600/30 animate-pulse mx-auto" />
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-display text-slate-900 dark:text-white mb-6 fade-in">
            Hi, I'm{' '}
            <span className="text-primary-600 dark:text-primary-400 relative">
              {PERSONAL_INFO.firstName}
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary-600 to-primary-400 transform scale-x-0 animate-scale-x origin-left" />
            </span>
          </h1>

          {/* Typing Animation */}
          <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-700 dark:text-slate-300 mb-8 min-h-[2.5rem] lg:min-h-[3rem] fade-in" style={{animationDelay: '200ms'}}>
            <span className="inline-block">
              {displayText}
              <span className="inline-block w-0.5 h-8 lg:h-10 bg-primary-600 dark:bg-primary-400 ml-1 animate-pulse" />
            </span>
          </div>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed fade-in" style={{animationDelay: '400ms'}}>
            {PERSONAL_INFO.subtitle}. I create exceptional digital experiences 
            that combine beautiful design with powerful functionality.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 fade-in" style={{animationDelay: '600ms'}}>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primary-500/50"
            >
              <Mail size={20} />
              Get In Touch
              <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </button>
            
            <button
              onClick={handleDownloadResume}
              className="group relative inline-flex items-center gap-2 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-2 border-slate-300 dark:border-slate-600 hover:border-primary-500 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary-500/50"
            >
              <Download size={20} />
              Download CV
            </button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center items-center gap-6 mb-16 fade-in" style={{animationDelay: '800ms'}}>
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-primary-100 dark:hover:bg-primary-900/20 text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
              aria-label="GitHub Profile"
            >
              <Github size={24} />
            </a>
            
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-primary-100 dark:hover:bg-primary-900/20 text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={24} />
            </a>
            
            <a
              href={SOCIAL_LINKS.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-primary-100 dark:hover:bg-primary-900/20 text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
              aria-label="Twitter Profile"
            >
              <Twitter size={24} />
            </a>
          </div>

          {/* Scroll Indicator */}
          <button
            onClick={scrollToAbout}
            className="group animate-bounce hover:animate-none transition-all duration-300 fade-in"
            style={{animationDelay: '1000ms'}}
            aria-label="Scroll to About section"
          >
            <div className="flex flex-col items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300">
              <span className="text-sm font-medium">Scroll Down</span>
              <ChevronDown size={24} className="group-hover:translate-y-1 transition-transform duration-300" />
            </div>
          </button>
        </div>
      </div>

      {/* Background Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-slate-900 to-transparent pointer-events-none" />
    </section>
  )
}
