 import { throttle } from './utils'

// Animation configuration
export const ANIMATION_CONFIG = {
  duration: 600,
  delay: 100,
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
}

// Initialize all animations
export function initializeAnimations() {
  try {
    console.log('Starting animation initialization...')
    initializeScrollAnimations()
    initializeParallaxEffect()
    initializeProgressBars()
    initializeCounters()
    console.log('All animations initialized successfully')
  } catch (error) {
    console.error('Error during animation initialization:', error)
    // Fallback: make all elements visible
    setTimeout(() => {
      document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
        el.classList.add('visible')
      })
    }, 100)
  }
}

// Scroll-based animations using Intersection Observer
export function initializeScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: ANIMATION_CONFIG.rootMargin,
    threshold: ANIMATION_CONFIG.threshold
  }

  // Keep track of animated elements to prevent re-animation
  const animatedElements = new Set()

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const element = entry.target
      
      if (entry.isIntersecting && !animatedElements.has(element)) {
        // Mark as animated to prevent re-triggering
        animatedElements.add(element)
        
        // Add visible class immediately to prevent fading
        element.classList.add('visible')
        
        // Add a small delay for staggered animations only for siblings
        const siblings = Array.from(element.parentNode?.children || [])
        const index = siblings.indexOf(element)
        const delay = index * 50 // Reduced delay for smoother experience
        
        if (delay > 0) {
          element.style.transitionDelay = `${delay}ms`
        }
        
        // Don't unobserve - keep observing but use the Set to prevent re-animation
      } else if (!entry.isIntersecting && animatedElements.has(element)) {
        // Keep the element visible even when scrolling away
        // This prevents the fading issue
        element.classList.add('visible')
      }
    })
  }, observerOptions)

  // Wait for DOM to be ready
  const initializeObserver = () => {
    try {
      // Observe all elements with animation classes
      const animationClasses = ['.fade-in', '.slide-in-left', '.slide-in-right', '.scale-in']
      let totalElements = 0
      
      animationClasses.forEach(className => {
        const elements = document.querySelectorAll(className)
        console.log(`Found ${elements.length} elements with class ${className}`)
        
        elements.forEach((el) => {
          // Only observe if not already visible
          if (!el.classList.contains('visible') && !animatedElements.has(el)) {
            observer.observe(el)
            totalElements++
          }
        })
      })

      // Observe skill progress bars
      document.querySelectorAll('.skill-progress').forEach((el) => {
        if (!animatedElements.has(el)) {
          observer.observe(el)
          totalElements++
        }
      })

      // Observe counter elements
      document.querySelectorAll('.counter').forEach((el) => {
        if (!animatedElements.has(el)) {
          observer.observe(el)
          totalElements++
        }
      })
      
      console.log(`Total elements being observed: ${totalElements}`)
      
      // If no elements found, something might be wrong - show all content
      if (totalElements === 0) {
        console.warn('No animation elements found, showing all content')
        setTimeout(() => {
          document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
            el.classList.add('visible')
          })
        }, 100)
      }
    } catch (error) {
      console.error('Error in initializeObserver:', error)
    }
  }

  // Initialize immediately if DOM is ready, otherwise wait
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeObserver)
  } else {
    initializeObserver()
  }
}

// Parallax scrolling effect
export function initializeParallaxEffect() {
  const parallaxElements = document.querySelectorAll('.parallax')
  
  if (parallaxElements.length === 0) return

  const updateParallax = throttle(() => {
    const scrolled = window.pageYOffset
    const rate = scrolled * -0.5

    parallaxElements.forEach((element) => {
      const speed = element.dataset.speed || 0.5
      const yPos = -(scrolled * speed)
      element.style.transform = `translate3d(0, ${yPos}px, 0)`
    })
  }, 10)

  window.addEventListener('scroll', updateParallax)
}

// Animate progress bars
export function initializeProgressBars() {
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progressBar = entry.target
        const percentage = progressBar.dataset.percentage || 0
        const progressFill = progressBar.querySelector('.progress-fill')
        
        if (progressFill) {
          setTimeout(() => {
            progressFill.style.width = `${percentage}%`
            progressFill.style.transition = 'width 2s ease-out'
          }, 200)
        }

        // Animate the percentage number
        const percentageElement = progressBar.querySelector('.percentage-number')
        if (percentageElement) {
          animateCounter(percentageElement, 0, percentage, 2000, '%')
        }

        progressObserver.unobserve(entry.target)
      }
    })
  }, { threshold: 0.5 })

  document.querySelectorAll('.skill-progress').forEach((bar) => {
    progressObserver.observe(bar)
  })
}

// Animate counters
export function initializeCounters() {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target
        const target = parseInt(counter.dataset.target) || 0
        const suffix = counter.dataset.suffix || ''
        const duration = parseInt(counter.dataset.duration) || 2000

        animateCounter(counter, 0, target, duration, suffix)
        counterObserver.unobserve(entry.target)
      }
    })
  }, { threshold: 0.5 })

  document.querySelectorAll('.counter').forEach((counter) => {
    counterObserver.observe(counter)
  })
}

// Counter animation function
export function animateCounter(element, start, end, duration, suffix = '') {
  const startTime = performance.now()
  const difference = end - start

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // Easing function (ease-out)
    const easeOut = 1 - Math.pow(1 - progress, 3)
    const current = Math.floor(start + (difference * easeOut))

    element.textContent = current + suffix

    if (progress < 1) {
      requestAnimationFrame(updateCounter)
    } else {
      element.textContent = end + suffix
    }
  }

  requestAnimationFrame(updateCounter)
}

// Typing animation
export function createTypingAnimation(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ''

  function typeWriter() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(typeWriter, speed)
    }
  }

  typeWriter()
}

// Stagger animation for lists
export function staggerAnimation(elements, delay = 100) {
  elements.forEach((element, index) => {
    element.style.animationDelay = `${index * delay}ms`
    element.classList.add('animate-slide-up')
  })
}

// Hover tilt effect
export function initializeTiltEffect() {
  const tiltElements = document.querySelectorAll('.tilt-effect')

  tiltElements.forEach((element) => {
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
    })

    element.addEventListener('mouseleave', () => {
      element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
    })
  })
}

// Smooth reveal animation for sections
export function revealSection(sectionId, direction = 'up') {
  const section = document.getElementById(sectionId)
  if (!section) return

  const elements = section.querySelectorAll('h1, h2, h3, h4, h5, h6, p, .card, .button, img')
  
  elements.forEach((element, index) => {
    element.classList.add('fade-in')
    element.style.transitionDelay = `${index * 100}ms`
    
    // Add direction-specific classes
    if (direction === 'up') {
      element.style.transform = 'translateY(30px)'
    } else if (direction === 'left') {
      element.style.transform = 'translateX(-30px)'
    } else if (direction === 'right') {
      element.style.transform = 'translateX(30px)'
    }

    // Trigger animation
    setTimeout(() => {
      element.classList.add('visible')
    }, index * 100)
  })
}

// Particle animation (optional)
export function createParticles(container, count = 50) {
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div')
    particle.className = 'particle'
    particle.style.cssText = `
      position: absolute;
      width: 2px;
      height: 2px;
      background: rgba(56, 189, 248, 0.5);
      border-radius: 50%;
      pointer-events: none;
      animation: float ${Math.random() * 3 + 2}s infinite ease-in-out;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 2}s;
    `
    container.appendChild(particle)
  }
}

// CSS keyframes for particle animation (to be added to CSS)
export const particleCSS = `
@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.5;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 1;
  }
}
`

// Cleanup function to remove event listeners
export function cleanupAnimations() {
  // Remove scroll listeners
  window.removeEventListener('scroll', initializeParallaxEffect)
  
  // Remove intersection observers
  // Note: In a real implementation, you'd store references to observers
  // and disconnect them here
}
