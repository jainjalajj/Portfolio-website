'use client'

import { useState, useEffect, useRef } from 'react'
import { Code, Database, Cloud, Wrench, Brain, Users } from 'lucide-react'
import { SKILLS_DATA } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { motion, useInView, animate } from 'framer-motion'

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('technical')

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
    const controlsRef = useRef(null)

    const handleViewportEnter = () => {
      controlsRef.current = animate(0, skill.level, {
        duration: 1,
        delay: index * 0.1,
        onUpdate(value) {
          setProgress(Math.round(value))
        }
      })
    }

    const handleViewportLeave = () => {
      if (controlsRef.current) {
        controlsRef.current.stop()
      }
      setProgress(0)
    }

    return (
      <motion.div
        onViewportEnter={handleViewportEnter}
        onViewportLeave={handleViewportLeave}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group skill-progress glass-panel rounded-lg p-4 transition-all duration-300"
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
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
            className="progress-fill absolute left-0 top-0 h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full animate-shimmer" />
        </div>
      </motion.div>
    )
  }

  const ToolGrid = ({ tools }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {tools.map((tool, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="group glass-panel rounded-lg p-4 transition-all duration-300 transform hover:-translate-y-1 text-center"
        >
          <div className="text-slate-800 dark:text-slate-200 font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
            {tool}
          </div>
        </motion.div>
      ))}
    </div>
  )

  const SoftSkillsList = ({ skills }) => (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {skills.map((skill, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="group glass-panel rounded-lg p-6 transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg">
              <Users size={20} className="text-white" />
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
              {skill}
            </h4>
          </div>
        </motion.div>
      ))}
    </div>
  )

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-transparent">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-purple-500/5 rounded-full blur-2xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 space-y-4"
        >
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
        </motion.div>

        {/* Category Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
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
        </motion.div>

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
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="glass-panel rounded-xl p-6 mt-8"
              >
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
              </motion.div>
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
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
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
        </motion.div>
      </div>
    </section>
  )
}
