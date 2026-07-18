'use client'

import { Award, Star, Download, ExternalLink } from 'lucide-react'
import { PERSONAL_INFO, ABOUT_DATA } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-transparent">
      {/* Background Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
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
                  window.open(PERSONAL_INFO.resume, '_blank')
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
          </motion.div>

          {/* Right Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Profile Image */}
            <div className="relative max-w-md mx-auto">
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

            {/* Skills Preview */}
            <div className="glass-panel rounded-xl p-6 space-y-4 max-w-md mx-auto">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white text-center">
                Core Technologies
              </h4>
              
              <div className="flex flex-wrap justify-center gap-3">
                {['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'PostgreSQL'].map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 glass-panel text-slate-700 dark:text-slate-200 rounded-lg text-sm font-medium hover:scale-105 transform"
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
          </motion.div>
        </div>

        {/* Bottom Section - Quote or Philosophy */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 text-center max-w-3xl mx-auto"
        >
          <blockquote className="text-xl lg:text-2xl font-medium text-slate-700 dark:text-slate-300 italic leading-relaxed">
            "Code is like humor. When you have to explain it, it's bad. I strive to write clean, 
            intuitive code that speaks for itself and creates meaningful user experiences."
          </blockquote>
          <cite className="block mt-4 text-primary-600 dark:text-primary-400 font-semibold">
            — Jalaj (Claude humor)
          </cite>
        </motion.div>
      </div>
    </section>
  )
}
