# Jalaj Jain - Developer Portfolio

A premium, modern, and highly responsive personal portfolio built with Next.js, Tailwind CSS, and Framer Motion. 
Designed with a sleek **iOS 18-inspired Glassmorphism** aesthetic, featuring frosted glass panels, deep blurs, and an interactive glowing custom cursor.

## Features
- **Next.js 13+ (App Router)**: Optimized performance, fast rendering, and SEO friendly.
- **Tailwind CSS & Glassmorphism**: Sleek, modern styling utilizing a custom `.glass-panel` utility with deep `backdrop-blur-2xl` and subtle translucent borders.
- **Framer Motion Animations**: Smooth scroll-triggered fade-ins, spring-based cursor tracking, and fluid progress bar animations.
- **Interactive Custom Cursor**: A dynamic, glowing orb with physics-based trailing that morphs upon hovering over interactive elements.
- **Responsive Design**: Flawless layout scaling across mobile, tablet, and desktop viewports.
- **EmailJS Integration**: Fully functional, serverless contact form.
- **Dark/Light Theme Toggle**: Saves user preference automatically.

## Sections Included
1. **Hero**: Impactful introduction with glowing CTAs.
2. **About**: Personal bio, stats, and quick skills overview.
3. **Experience**: A polished vertical timeline detailing professional roles (e.g., Tech Mahindra Project INDUS 2.0).
4. **Skills**: Categorized technical proficiencies with animated percentage bars.
5. **Projects**: Featured projects displayed in clean, two-column glass cards.
6. **Contact**: "Don't be a stranger" section with social links and direct email CTA.

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory and add your EmailJS credentials:
   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) (or `3001` depending on port availability) with your browser to see the result.

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com). Simply link your GitHub repository to Vercel and add your environment variables in the Vercel project settings.
