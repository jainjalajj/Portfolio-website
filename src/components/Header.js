'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Home, User, Code, Briefcase, Mail } from 'lucide-react'
import { NAVIGATION_ITEMS, PERSONAL_INFO } from '@/lib/constants'
import { cn } from '@/lib/utils'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [activeSection, setActiveSection] = useState('home')

  // Handle scroll effect
  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      setIsScrolled(currentScrollY > 50)
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      lastScrollY = currentScrollY
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href) => {
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)
    
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
    
    setIsMenuOpen(false)
  }

  const getIcon = (iconName) => {
    const icons = {
      Home,
      User,
      Code,
      Briefcase,
      Mail
    }
    const Icon = icons[iconName]
    return Icon ? <Icon size={20} /> : null
  }

  return (
    <header
      className={cn(
        'fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[95%] max-w-6xl rounded-full glass-panel',
        isScrolled ? 'py-1' : 'py-3',
        isVisible ? 'top-6 opacity-100' : '-top-32 opacity-0'
      )}
    >
      <nav className="px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('#home')
              }}
              className="text-xl lg:text-2xl font-bold font-display text-slate-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
            >
              <div className="flex items-center gap-3 group/logo">
                <div className="w-8 h-8 rounded bg-primary-600 dark:bg-primary-500 flex items-center justify-center text-white font-bold text-sm tracking-widest shadow-lg group-hover/logo:scale-110 transition-transform duration-300">
                  JJ
                </div>
                <span className="tracking-tight">{PERSONAL_INFO.name}</span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {NAVIGATION_ITEMS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.href)
                  }}
                  className={cn(
                    'px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-primary-600 dark:hover:text-primary-400 relative group',
                    activeSection === item.href.replace('#', '')
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-slate-700 dark:text-slate-300'
                  )}
                >
                  <span className="flex items-center gap-2">
                    {getIcon(item.icon)}
                    {item.name}
                  </span>
                  
                  {/* Active indicator */}
                  <span
                    className={cn(
                      'absolute bottom-0 left-0 h-0.5 bg-primary-600 dark:bg-primary-400 transition-all duration-200',
                      activeSection === item.href.replace('#', '')
                        ? 'w-full'
                        : 'w-0 group-hover:w-full'
                    )}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Theme Toggle and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors duration-200"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'lg:hidden transition-all duration-300 ease-in-out',
            isMenuOpen
              ? 'max-h-96 opacity-100 pb-4'
              : 'max-h-0 opacity-0 overflow-hidden'
          )}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg rounded-lg mt-2 border border-slate-200/50 dark:border-slate-700/50">
            {NAVIGATION_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item.href)
                }}
                className={cn(
                  'flex items-center gap-3 px-3 py-3 text-base font-medium rounded-lg transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800',
                  activeSection === item.href.replace('#', '')
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                    : 'text-slate-700 dark:text-slate-300'
                )}
              >
                {getIcon(item.icon)}
                {item.name}
                
                {activeSection === item.href.replace('#', '') && (
                  <div className="ml-auto w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full" />
                )}
              </a>
            ))}
            
            {/* Mobile CTA */}
            <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-700">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick('#contact')
                }}
                className="flex items-center justify-center gap-2 w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                <Mail size={20} />
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
