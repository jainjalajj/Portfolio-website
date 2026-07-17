'use client'

import { useState, useEffect, useRef } from 'react'
import { Award, Users, Coffee, Star, Download, ExternalLink } from 'lucide-react'
import { PERSONAL_INFO, ABOUT_DATA } from '@/lib/constants'
import { cn } from '@/lib/utils'

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  const [animatedStats, setAnimatedStats] = useState({
    experience: 0,
    projects: 0,
    clients: 0
  })

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            startCounterAnimations()
          }
        })
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Counter animations
  const startCounterAnimations = () => {
    const duration = 2000
    const experienceTarget = parseInt(ABOUT_DATA.experience) || 5
    const projectsTarget = parseInt(ABOUT_DATA.projectsCompleted) || 50
    const clientsTarget = parseInt(ABOUT_DATA.happyClients) || 30

    const animate = (start, end, setter, suffix = '') => {
      const startTime = performance.now()
      
      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easeOut = 1 - Math.pow(1 - progress, 3)
        const current = Math.floor(start + (end - start) * easeOut)
        
        setter(current)
        
        if (progress < 1) {
          requestAnimationFrame(updateCounter)
        }
      }
      
      requestAnimationFrame(updateCounter)
    }

    animate(0, experienceTarget, (val) => setAnimatedStats(prev => ({ ...prev, experience: val })))
    animate(0, projectsTarget, (val) => setAnimatedStats(prev => ({ ...prev, projects: val })))
    animate(0, clientsTarget, (val) => setAnimatedStats(prev => ({ ...prev, clients: val })))
  }

  const stats = [
    {
      icon: Award,
      label: 'Years Experience',
      value: animatedStats.experience,
      suffix: '+',
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: Coffee,
      label: 'Projects Completed',
      value: animatedStats.projects,
      suffix: '+',
      color: 'text-green-600 dark:text-green-400'
    },
    {
      icon: Users,
      label: 'Happy Clients',
      value: animatedStats.clients,
      suffix: '+',
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      icon: Star,
      label: 'Certifications',
      value: ABOUT_DATA.certifications?.length || 3,
      suffix: '',
      color: 'text-orange-600 dark:text-orange-400'
    }
  ]

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-blue-100 to-white dark:bg-none dark:bg-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content Section */}
          <div className={cn('space-y-8', isVisible && 'fade-in')}>
            {/* Section Header */}
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide">
                About Me
              </h2>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-slate-900 dark:text-white leading-tight">
                Passionate Developer with a{' '}
                <span className="text-primary-600 dark:text-primary-400">Creative Vision</span>
              </h3>
            </div>

            {/* Bio */}
            <div className="space-y-6">
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                {ABOUT_DATA.bio}
              </p>
              
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
                or sharing my knowledge with the developer community. I believe in continuous learning and staying 
                up-to-date with the latest industry trends.
              </p>
            </div>

            {/* Education & Interests */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  Education
                </h4>
                <div className="text-slate-600 dark:text-slate-400">
                  <p className="font-medium">{ABOUT_DATA.education?.degree}</p>
                  <p className="text-sm">{ABOUT_DATA.education?.university}</p>
                  <p className="text-sm">Class of {ABOUT_DATA.education?.year} • GPA: {ABOUT_DATA.education?.gpa}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  Interests
                </h4>
                <div className="flex flex-wrap gap-2">
                  {ABOUT_DATA.interests?.map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Certifications</h4>
              <div className="space-y-2">
                {ABOUT_DATA.certifications?.map((cert, index) => (
                  <div key={index} className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <div className="w-2 h-2 bg-primary-600 dark:text-primary-400 rounded-full" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => {
                  const link = document.createElement('a')
                  link.href = PERSONAL_INFO.resume
                  link.download = `${PERSONAL_INFO.name}_Resume.pdf`
                  document.body.appendChild(link)
                  link.click()
                  document.body.removeChild(link)
                }}
                className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary-500/50"
              >
                <Download size={20} />
                Download Resume
              </button>
              
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-2 border-slate-300 dark:border-slate-600 hover:border-primary-500 px-6 py-3 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-500/50"
              >
                <ExternalLink size={20} />
                View Projects
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className={cn('space-y-8', isVisible && 'fade-in')} style={{animationDelay: '200ms'}}>
            {/* Profile Image */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary-500 to-purple-600 p-1">
                <div className="w-full h-full rounded-xl overflow-hidden bg-white dark:bg-slate-800">
                  <img
                    src={PERSONAL_INFO.profileImage}
                    alt={`${PERSONAL_INFO.name} working`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjFGNUY5Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE2MCIgcj0iNjAiIGZpbGw9IiM5NEEzQjgiLz4KPHBhdGggZD0iTTgwIDMyMEM4MCAyNzEuNiAxMjAuNCAyMzIgMTcwIDIzMkgyMzBDMjc5LjYgMjMyIDMyMCAyNzEuNiAzMjAgMzIwVjQwMEg4MFYzMjBaIiBmaWxsPSIjOTRBM0I4Ii8+Cjwvc3ZnPgo='
                    }}
                  />
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce delay-300" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full animate-pulse delay-700" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group relative bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className={cn("p-3 rounded-full bg-slate-100 dark:bg-slate-700 group-hover:scale-110 transition-transform duration-300", stat.color)}>
                      <stat.icon size={24} />
                    </div>
                    
                    <div className="space-y-1">
                      <div className={cn("text-2xl font-bold", stat.color)}>
                        {stat.value}{stat.suffix}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>

            {/* Skills Preview */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 space-y-4">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white text-center">
                Core Technologies
              </h4>
              
              <div className="flex flex-wrap justify-center gap-3">
                {['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'PostgreSQL'].map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-white dark:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-shadow duration-300 hover:scale-105 transform"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="text-center pt-2">
                <button
                  onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold text-sm transition-colors duration-300 hover:underline"
                >
                  View All Skills →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Quote or Philosophy */}
        <div className={cn('mt-20 text-center max-w-3xl mx-auto', isVisible && 'fade-in')} style={{animationDelay: '400ms'}}>
          <blockquote className="text-xl lg:text-2xl font-medium text-slate-700 dark:text-slate-300 italic leading-relaxed">
            "Code is like humor. When you have to explain it, it's bad. I strive to write clean, 
            intuitive code that speaks for itself and creates meaningful user experiences."
          </blockquote>
          <cite className="block mt-4 text-primary-600 dark:text-primary-400 font-semibold">
            — {PERSONAL_INFO.name}
          </cite>
        </div>
      </div>
    </section>
  )
}
