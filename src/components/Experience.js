'use client'

import { Briefcase, Calendar, MapPin } from 'lucide-react'
import { EXPERIENCE_DATA } from '@/lib/constants'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-transparent">
      {/* Background Elements */}
      <div className="absolute top-20 right-1/4 w-40 h-40 bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-1/4 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20 space-y-4"
        >
          <h2 className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide">
            Professional Experience
          </h2>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-slate-900 dark:text-white leading-tight">
            My <span className="text-primary-600 dark:text-primary-400">Journey</span>
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A look back at the roles and projects that have shaped my career in artificial intelligence, software engineering, and beyond.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500/20 via-primary-500/50 to-primary-500/20 transform lg:-translate-x-1/2" />

          <div className="space-y-12">
            {EXPERIENCE_DATA.map((exp, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.6 }}
                  className={cn(
                    "relative flex flex-col lg:flex-row items-center",
                    isEven ? "lg:flex-row-reverse" : ""
                  )}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 lg:left-1/2 w-4 h-4 rounded-full bg-primary-600 dark:bg-primary-500 border-4 border-white dark:border-slate-900 transform -translate-x-1/2 z-10 shadow-lg" />
                  
                  {/* Content Container */}
                  <div className={cn(
                    "w-full lg:w-1/2 pl-16 pr-4 lg:px-12",
                    isEven ? "lg:text-left" : "lg:text-right"
                  )}>
                    <div className="glass-panel rounded-3xl p-8 hover:shadow-xl transition-all duration-300">
                      <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        {exp.role}
                      </h4>
                      <h5 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-4 flex items-center gap-2 lg:justify-start">
                        <Briefcase size={20} className={cn("hidden lg:block", isEven ? "" : "lg:ml-auto")} />
                        {exp.company}
                      </h5>
                      
                      <div className={cn(
                        "flex flex-wrap items-center gap-4 text-sm font-medium text-slate-500 dark:text-slate-400 mb-6",
                        !isEven && "lg:justify-end"
                      )}>
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          {exp.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={16} />
                          {exp.location}
                        </div>
                      </div>

                      <ul className={cn(
                        "space-y-3 text-slate-600 dark:text-slate-400 text-base leading-relaxed text-left",
                        !isEven && "lg:text-right"
                      )}>
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className={cn(
                              "w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 shrink-0",
                              !isEven && "lg:order-last lg:mt-2.5"
                            )} />
                            <span className={cn("flex-1", !isEven && "lg:text-right")}>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
