'use client'

import { Heart, ArrowUp, Github, Linkedin, Twitter, Mail } from 'lucide-react'
import { PERSONAL_INFO, SOCIAL_LINKS, NAVIGATION_ITEMS } from '@/lib/constants'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const handleNavClick = (href) => {
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)
    
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <footer className="relative bg-slate-900 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-5" />
      
      <div className="relative">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick('#home')
                  }}
                  className="text-2xl font-bold font-display hover:text-primary-400 transition-colors duration-300"
                >
                  {PERSONAL_INFO.firstName}
                </a>
              </div>
              
              <p className="text-slate-400 text-lg leading-relaxed mb-6 max-w-md">
                {PERSONAL_INFO.title} passionate about creating exceptional digital experiences 
                that combine beautiful design with powerful functionality.
              </p>
              
              <div className="flex items-center gap-2 text-slate-400 mb-8">
                <span>Made with</span>
                <Heart size={16} className="text-red-400 animate-pulse" fill="currentColor" />
                <span>and lots of ☕ in {PERSONAL_INFO.location}</span>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all duration-300 transform hover:scale-110"
                  aria-label="GitHub Profile"
                >
                  <Github size={20} className="text-slate-400 group-hover:text-white transition-colors duration-300" />
                </a>
                
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all duration-300 transform hover:scale-110"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={20} className="text-slate-400 group-hover:text-white transition-colors duration-300" />
                </a>
                
                <a
                  href={SOCIAL_LINKS.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all duration-300 transform hover:scale-110"
                  aria-label="Twitter Profile"
                >
                  <Twitter size={20} className="text-slate-400 group-hover:text-white transition-colors duration-300" />
                </a>
                
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="group p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all duration-300 transform hover:scale-110"
                  aria-label="Send Email"
                >
                  <Mail size={20} className="text-slate-400 group-hover:text-white transition-colors duration-300" />
                </a>
              </div>
            </div>

            {/* Navigation Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Navigation</h4>
              <ul className="space-y-3">
                {NAVIGATION_ITEMS.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault()
                        handleNavClick(item.href)
                      }}
                      className="text-slate-400 hover:text-primary-400 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-0 h-px bg-primary-400 transition-all duration-300 group-hover:w-4"></span>
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Get In Touch</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Email</p>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-slate-400 hover:text-primary-400 transition-colors duration-300"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
                
                <div>
                  <p className="text-sm text-slate-500 mb-1">Phone</p>
                  <a
                    href={`tel:${PERSONAL_INFO.phone}`}
                    className="text-slate-400 hover:text-primary-400 transition-colors duration-300"
                  >
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
                
                <div>
                  <p className="text-sm text-slate-500 mb-1">Location</p>
                  <p className="text-slate-400">{PERSONAL_INFO.location}</p>
                </div>
              </div>

              {/* Quick CTA */}
              <div className="mt-6 p-4 bg-slate-800 rounded-lg border border-slate-700">
                <p className="text-sm text-slate-400 mb-3">Ready to start a project?</p>
                <button
                  onClick={() => handleNavClick('#contact')}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary-500/50"
                >
                  Let's Talk
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Copyright */}
              <div className="flex flex-col md:flex-row items-center gap-4 text-slate-400 text-sm">
                <p>© {currentYear} {PERSONAL_INFO.name}. All rights reserved.</p>
                <div className="hidden md:block w-px h-4 bg-slate-700"></div>
                <p>Built with Next.js, Tailwind CSS, and lots of passion.</p>
              </div>

              {/* Back to Top Button */}
              <button
                onClick={scrollToTop}
                className="group flex items-center gap-2 text-slate-400 hover:text-primary-400 transition-all duration-300 transform hover:scale-105"
                aria-label="Back to top"
              >
                <span className="text-sm font-medium">Back to top</span>
                <div className="p-1 bg-slate-800 group-hover:bg-slate-700 rounded transition-colors duration-300">
                  <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
                </div>
              </button>
            </div>

            {/* Additional Links */}
            <div className="flex justify-center items-center mt-6 pt-6 border-t border-slate-800 text-xs text-slate-500">
              <button
                onClick={() => window.open(PERSONAL_INFO.resume, '_blank')}
                className="hover:text-slate-400 transition-colors duration-300"
              >
                Download Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
