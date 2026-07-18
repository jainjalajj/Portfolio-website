'use client'

import { Mail, Github, Linkedin, Twitter, Instagram } from 'lucide-react'
import { PERSONAL_INFO, SOCIAL_LINKS } from '@/lib/constants'
import { motion } from 'framer-motion'

export default function Contact() {
  const socialLinks = [
    { icon: Github, href: SOCIAL_LINKS.github, label: 'GitHub' },
    { icon: Twitter, href: SOCIAL_LINKS.twitter, label: 'Twitter' },
    { icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
    { icon: Instagram, href: SOCIAL_LINKS.instagram, label: 'Instagram' }
  ].filter(link => link.href && link.href !== '')

  return (
    <section id="contact" className="py-32 relative overflow-hidden flex flex-col items-center justify-center text-center bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h2 className="text-5xl md:text-7xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
            Still looking to join a team
          </h2>
          
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            I'm a passionate developer currently looking for new opportunities in Software Engineering and AI/ML. 
            If you have a position available or just want to say hi, feel free to{' '}
            <a 
              href={`mailto:${PERSONAL_INFO.email}`}
              className="inline-flex items-center gap-2 glass-panel hover:bg-white/10 text-slate-900 dark:text-white px-4 py-1 rounded-full font-semibold mx-1"
            >
              <Mail size={20} />
              email me
            </a>
            .
          </p>

          <div className="pt-16 space-y-6">
            <h3 className="text-lg font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              Don't be a stranger
            </h3>
            <div className="flex justify-center items-center gap-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 glass-panel hover:bg-white/10 rounded-full transition-all duration-300 transform hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon size={28} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
