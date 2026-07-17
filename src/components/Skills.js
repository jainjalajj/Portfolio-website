'use client'

import { useState, useEffect, useRef } from 'react'
import { Code, Database, Cloud, Wrench, Brain, Users } from 'lucide-react'
import { SKILLS_DATA } from '@/lib/constants'
import { cn } from '@/lib/utils'

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('technical')
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const categories = [
    {
      id: 'technical',
      name: 'Technical Skills',
      icon: Code,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      id: 'tools',
      name: 'Tools & Software',
      icon: Wrench,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      id: 'soft',
      name: 'Soft Skills',
      icon: Brain,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20'
    }
  ]

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Frontend':
        return '⚡'
      case 'Backend':
        return '⚙️'
      case 'Database':
        return '💾'
      case 'Cloud':
        return '☁️'
      case 'DevOps':
        return '🚀'
      default:
        return '💻'
    }
  }

  const SkillBar = ({ skill, index }) => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
      if (isVisible) {
        const timer = setTimeout(() => {
          setProgress(skill.level)
        }, index * 100 + 200)
        return () => clearTimeout(timer)
      } else {
        setProgress(0)
      }
    }, [isVisible, skill.level, index])

    return (
      <div
        className={cn(
          'group skill-progress bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-200 dark:border-slate-700',
          isVisible && 'fade-in'
        )}
        style={{ animationDelay: `${index * 100}ms` }}
        data-percentage={skill.level}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{skill.icon}</span>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">{skill.name}</h4>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">
                {skill.category}
              </span>
            </div>
          </div>
          <span className="percentage-number text-sm font-bold text-primary-600 dark:text-primary-400">
            {progress}%
          </span>
        </div>
        
        <div className="relative h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="progress-fill absolute left-0 top-0 h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full animate-shimmer" />
        </div>
      </div>
    )
  }

  const ToolGrid = ({ tools }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {tools.map((tool, index) => (
        <div
          key={index}
          className={cn(
            'group bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-slate-200 dark:border-slate-700 text-center',
            isVisible && 'fade-in'
          )}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="text-slate-800 dark:text-slate-200 font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
            {tool}
          </div>
        </div>
      ))}
    </div>
  )

  const SoftSkillsList = ({ skills }) => (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {skills.map((skill, index) => (
        <div
          key={index}
          className={cn(
            'group bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-slate-200 dark:border-slate-700',
            isVisible && 'fade-in'
          )}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg">
              <Users size={20} className="text-white" />
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
              {skill}
            </h4>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-white to-purple-50 dark:bg-none dark:bg-slate-900/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-purple-500/5 rounded-full blur-2xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={cn('text-center mb-16 space-y-4', isVisible && 'fade-in')}>
          <h2 className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide">
            Skills & Expertise
          </h2>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-slate-900 dark:text-white leading-tight">
            Technologies I{' '}
            <span className="text-primary-600 dark:text-primary-400">Master</span>
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A comprehensive overview of my technical skills, tools, and soft skills that I use to create 
            exceptional digital experiences and solve complex problems.
          </p>
        </div>

        {/* Category Tabs */}
        <div className={cn('flex flex-wrap justify-center gap-4 mb-12', isVisible && 'fade-in')} style={{animationDelay: '200ms'}}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                'flex items-center gap-3 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary-500/50',
                activeCategory === category.id
                  ? cn('text-white', category.bgColor.replace('100', '600').replace('900/20', '600'))
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm'
              )}
            >
              <category.icon size={20} />
              {category.name}
            </button>
          ))}
        </div>

        {/* Skills Content */}
        <div className="max-w-6xl mx-auto">
          {activeCategory === 'technical' && (
            <div className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {SKILLS_DATA.technical.map((skill, index) => (
                  <SkillBar key={skill.name} skill={skill} index={index} />
                ))}
              </div>
              
              {/* Technical Skills Summary */}
              <div className={cn('bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mt-8', isVisible && 'fade-in')} style={{animationDelay: '600ms'}}>
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 text-center">
                  Skill Categories
                </h4>
                <div className="flex flex-wrap justify-center gap-4">
                  {['Frontend', 'Backend', 'Database', 'Cloud', 'DevOps'].map((cat, index) => (
                    <div key={cat} className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 rounded-lg px-4 py-2">
                      <span className="text-xl">{getCategoryIcon(cat)}</span>
                      <span className="font-medium text-slate-700 dark:text-slate-300">{cat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeCategory === 'tools' && (
            <ToolGrid tools={SKILLS_DATA.tools} />
          )}

          {activeCategory === 'soft' && (
            <SoftSkillsList skills={SKILLS_DATA.soft} />
          )}
        </div>

        {/* Bottom CTA */}
        <div className={cn('text-center mt-16', isVisible && 'fade-in')} style={{animationDelay: '800ms'}}>
          <div className="bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl p-8 text-white max-w-2xl mx-auto">
            <h4 className="text-xl font-bold mb-4">Ready to collaborate?</h4>
            <p className="mb-6 opacity-90">
              Let's discuss how my skills can help bring your project to life. 
              I'm always excited to work on new challenges and innovative solutions.
            </p>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-primary-600 hover:bg-slate-100 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50"
            >
              Start a Conversation
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
