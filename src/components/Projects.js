'use client'

import { ExternalLink, Github, Calendar, Star } from 'lucide-react'
import { PROJECTS_DATA, SOCIAL_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Projects() {
  const ProjectRow = ({ project, index }) => {
    const isEven = index % 2 === 0

    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="group relative glass-panel rounded-3xl overflow-hidden"
      >
        <div className={cn("flex flex-col", isEven ? "lg:flex-row" : "lg:flex-row-reverse")}>
          {/* Image Section */}
          <div className="w-full lg:w-1/2 relative overflow-hidden bg-slate-100 dark:bg-slate-700 min-h-[300px] lg:min-h-[400px]">
            {project.featured && (
              <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                <Star size={12} fill="currentColor" />
                Featured
              </div>
            )}
            <Image
              src={project.image}
              alt={project.title}
              width={600}
              height={400}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs font-bold tracking-wider uppercase text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-3 py-1 rounded-full">
                {project.category}
              </span>
              <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 font-medium">
                <Calendar size={14} />
                {project.year}
              </div>
            </div>

            <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
              {project.title}
            </h3>

            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="text-sm font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-lg"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 mt-auto">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <ExternalLink size={18} />
                  Visit Website
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 glass-panel hover:bg-white/10 text-slate-900 dark:text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1"
                >
                  <Github size={18} />
                  View Source
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-transparent">
      {/* Background Elements */}
      <div className="absolute top-20 right-10 w-40 h-40 bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20 space-y-4"
        >
          <h2 className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide">
            Portfolio
          </h2>
          <h3 className="text-4xl lg:text-5xl font-bold font-display text-slate-900 dark:text-white leading-tight">
            Featured{' '}
            <span className="text-primary-600 dark:text-primary-400">Projects</span>
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A showcase of my recent work, featuring web applications, AI models, and other digital solutions 
            that demonstrate my skills and creativity.
          </p>
        </motion.div>

        {/* Projects List */}
        <div className="flex flex-col gap-16 lg:gap-24 mb-24 max-w-6xl mx-auto">
          {PROJECTS_DATA.map((project, index) => (
            <ProjectRow key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="glass-panel rounded-3xl p-10 max-w-3xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-400 via-purple-500 to-pink-500" />
            <h4 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Interested in seeing more?
            </h4>
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 leading-relaxed max-w-xl mx-auto">
              Check out my GitHub for more projects, experiments, and contributions to open-source.
            </p>
            <div className="flex justify-center">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-slate-500/50"
              >
                <Github size={24} />
                Explore my GitHub
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
