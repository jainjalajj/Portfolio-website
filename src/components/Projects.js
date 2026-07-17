'use client'

import { useState, useEffect, useRef } from 'react'
import { ExternalLink, Github, Filter, X, Calendar, Tag, Star } from 'lucide-react'
import { PROJECTS_DATA } from '@/lib/constants'
import { cn } from '@/lib/utils'

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [filter, setFilter] = useState('All')
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  const categories = ['All', 'Full Stack', 'Frontend', 'Backend', 'Mobile']
  const filteredProjects = filter === 'All' 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(project => project.category === filter)

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

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null)
      }
    }

    if (selectedProject) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [selectedProject])

  const ProjectCard = ({ project, index }) => (
    <div
      className={cn(
        'group relative bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-200 dark:border-slate-700',
        isVisible && 'fade-in'
      )}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
          <Star size={12} fill="currentColor" />
          Featured
        </div>
      )}

      {/* Project Image */}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjFGNUY5Ii8+CjxyZWN0IHg9IjE1MCIgeT0iMTEwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjOTRBM0I4Ii8+CjxjaXJjbGUgY3g9IjE3MCIgY3k9IjEzMCIgcj0iMTAiIGZpbGw9IiNGMUY1RjkiLz4KPHRleHQgeD0iMjAwIiB5PSIyMDAiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNjQ3NDhCIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Qcm9qZWN0IEltYWdlPC90ZXh0Pgo8L3N2Zz4K`
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick Actions */}
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/90 hover:bg-white text-slate-700 rounded-full transition-all duration-300 transform hover:scale-110"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={16} />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/90 hover:bg-white text-slate-700 rounded-full transition-all duration-300 transform hover:scale-110"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={16} />
            </a>
          )}
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        {/* Project Meta */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/20 px-3 py-1 rounded-full">
            {project.category}
          </span>
          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            <Calendar size={12} />
            {project.year}
          </div>
        </div>

        {/* Project Title */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
          {project.title}
        </h3>

        {/* Project Description */}
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech, techIndex) => (
            <span
              key={techIndex}
              className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-md"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-xs text-slate-500 dark:text-slate-400">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>

        {/* View Details Button */}
        <button
          onClick={() => setSelectedProject(project)}
          className="w-full bg-slate-100 dark:bg-slate-700 hover:bg-primary-600 hover:text-white text-slate-700 dark:text-slate-300 py-2 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary-500/50"
        >
          View Details
        </button>
      </div>
    </div>
  )

  const ProjectModal = ({ project, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white dark:bg-slate-700/90 dark:hover:bg-slate-700 rounded-full transition-all duration-300"
        >
          <X size={20} />
        </button>

        {/* Project Image */}
        <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjFGNUY5Ii8+CjxyZWN0IHg9IjE1MCIgeT0iMTEwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjOTRBM0I4Ii8+CjxjaXJjbGUgY3g9IjE3MCIgY3k9IjEzMCIgcj0iMTAiIGZpbGw9IiNGMUY1RjkiLz4KPHRleHQgeD0iMjAwIiB5PSIyMDAiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNjQ3NDhCIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Qcm9qZWN0IEltYWdlPC90ZXh0Pgo8L3N2Zz4K`
            }}
          />
        </div>

        {/* Project Details */}
        <div className="p-8">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {project.title}
              </h2>
              <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Tag size={14} />
                  {project.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {project.year}
                </span>
                <span className={cn(
                  'px-3 py-1 rounded-full text-xs font-semibold',
                  project.status === 'Completed' 
                    ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                    : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'
                )}>
                  {project.status}
                </span>
              </div>
            </div>
            
            <div className="flex gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
              )}
              
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  <Github size={16} />
                  View Code
                </a>
              )}
            </div>
          </div>

          {/* Project Description */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">About This Project</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Technologies Used */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Technologies Used</h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg font-medium text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Features (if available) */}
          {project.features && (
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Key Features</h3>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-gradient-to-b from-purple-50 to-pink-50 dark:bg-none dark:bg-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-10 w-40 h-40 bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={cn('text-center mb-16 space-y-4', isVisible && 'fade-in')}>
          <h2 className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide">
            Portfolio
          </h2>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-slate-900 dark:text-white leading-tight">
            Featured{' '}
            <span className="text-primary-600 dark:text-primary-400">Projects</span>
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A showcase of my recent work, featuring web applications, mobile apps, and other digital solutions 
            that demonstrate my skills and creativity.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className={cn('flex flex-wrap justify-center gap-3 mb-12', isVisible && 'fade-in')} style={{animationDelay: '200ms'}}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={cn(
                'flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary-500/50',
                filter === category
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm border border-slate-200 dark:border-slate-700'
              )}
            >
              {category !== 'All' && <Filter size={16} />}
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* No Projects Message */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              No projects found
            </h4>
            <p className="text-slate-600 dark:text-slate-400">
              Try selecting a different category or check back later for new projects.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className={cn('text-center', isVisible && 'fade-in')} style={{animationDelay: '600ms'}}>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 max-w-2xl mx-auto">
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Interested in working together?
            </h4>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. 
              Let's create something amazing together!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary-500/50"
              >
                Start a Project
              </button>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 text-slate-700 dark:text-slate-200 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-slate-500/50"
              >
                <Github size={20} />
                View All Projects
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  )
}
