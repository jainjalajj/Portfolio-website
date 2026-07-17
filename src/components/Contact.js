'use client'

import { useState, useEffect, useRef } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Github, Linkedin, Twitter } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { PERSONAL_INFO, SOCIAL_LINKS, CONTACT_CONFIG } from '@/lib/constants'
import { cn, validateEmail } from '@/lib/utils'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: null
  })
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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (formStatus.error) {
      setFormStatus(prev => ({ ...prev, error: null }))
    }
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      return 'Name is required'
    }
    if (!formData.email.trim()) {
      return 'Email is required'
    }
    if (!validateEmail(formData.email)) {
      return 'Please enter a valid email address'
    }
    if (!formData.subject.trim()) {
      return 'Subject is required'
    }
    if (!formData.message.trim()) {
      return 'Message is required'
    }
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const validationError = validateForm()
    if (validationError) {
      setFormStatus({
        loading: false,
        success: false,
        error: validationError
      })
      return
    }

    setFormStatus({
      loading: true,
      success: false,
      error: null
    })

    try {
      const templateParams = {
        name: formData.name,
        from_name: formData.name,
        email: formData.email,
        from_email: formData.email,
        reply_to: formData.email,
        subject: formData.subject,
        message: formData.message,
      }

      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )

      if (response.status !== 200) {
        throw new Error('Failed to send message')
      }

      setFormStatus({
        loading: false,
        success: true,
        error: null
      })

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })

      // Hide success message after 5 seconds
      setTimeout(() => {
        setFormStatus(prev => ({ ...prev, success: false }))
      }, 5000)

    } catch (error) {
      setFormStatus({
        loading: false,
        success: false,
        error: 'Failed to send message. Please try again or contact me directly.'
      })
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: PERSONAL_INFO.email,
      href: `mailto:${PERSONAL_INFO.email}`,
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: PERSONAL_INFO.location,
      href: `https://maps.google.com/?q=${encodeURIComponent(PERSONAL_INFO.location)}`,
      color: 'text-red-600 dark:text-red-400'
    }
  ]

  const socialLinks = [
    { icon: Github, href: SOCIAL_LINKS.github, label: 'GitHub' },
    { icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: SOCIAL_LINKS.twitter, label: 'Twitter' }
  ]

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-gradient-to-b from-pink-50 to-blue-50 dark:bg-none dark:bg-slate-900/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={cn('text-center mb-16 space-y-4', isVisible && 'fade-in')}>
          <h2 className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide">
            Get In Touch
          </h2>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-slate-900 dark:text-white leading-tight">
            Let's Work{' '}
            <span className="text-primary-600 dark:text-primary-400">Together</span>
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you. 
            Send me a message and I'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Information */}
          <div className={cn('space-y-8', isVisible && 'fade-in')} style={{animationDelay: '200ms'}}>
            <div>
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Let's start a conversation
              </h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                I'm always interested in new opportunities, whether that's working on an exciting project, 
                joining a innovative team, or discussing potential collaborations. Don't hesitate to reach out!
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-slate-200 dark:border-slate-700"
                >
                  <div className={cn('p-3 rounded-lg bg-slate-100 dark:bg-slate-700 group-hover:scale-110 transition-transform duration-300', item.color)}>
                    <item.icon size={24} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {item.label}
                    </div>
                    <div className="text-slate-900 dark:text-white font-semibold group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                      {item.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-8">
              <h5 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Follow me on social media
              </h5>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:scale-110 border border-slate-200 dark:border-slate-700"
                    aria-label={social.label}
                  >
                    <social.icon size={24} className="text-slate-600 dark:text-slate-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700/50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-700 dark:text-green-400 font-semibold">
                  Available for new projects
                </span>
              </div>
              <p className="text-green-600 dark:text-green-300 text-sm">
                I'm currently accepting new freelance projects and full-time opportunities. 
                Let's discuss how I can help bring your ideas to life.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className={cn('', isVisible && 'fade-in')} style={{animationDelay: '400ms'}}>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Send me a message
              </h4>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-4 focus:ring-primary-500/50 focus:border-primary-500 transition-colors duration-300 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
                    placeholder="Your full name"
                    required
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-4 focus:ring-primary-500/50 focus:border-primary-500 transition-colors duration-300 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-4 focus:ring-primary-500/50 focus:border-primary-500 transition-colors duration-300 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
                    placeholder="What's this about?"
                    required
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-4 focus:ring-primary-500/50 focus:border-primary-500 transition-colors duration-300 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 resize-none"
                    placeholder="Tell me about your project, ideas, or just say hello..."
                    required
                  />
                </div>

                {/* Status Messages */}
                {formStatus.error && (
                  <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/50 rounded-lg text-red-700 dark:text-red-400">
                    <AlertCircle size={20} />
                    <span className="text-sm">{formStatus.error}</span>
                  </div>
                )}

                {formStatus.success && (
                  <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/50 rounded-lg text-green-700 dark:text-green-400">
                    <CheckCircle size={20} />
                    <span className="text-sm">
                      Message sent successfully! I'll get back to you within 24 hours.
                    </span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={formStatus.loading}
                  className={cn(
                    'w-full flex items-center justify-center gap-3 px-8 py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-primary-500/50',
                    formStatus.loading && 'animate-pulse'
                  )}
                >
                  {formStatus.loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 text-center">
                Your information is secure and will never be shared with third parties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
