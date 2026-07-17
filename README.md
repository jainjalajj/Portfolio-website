# Jalaj Jain - Developer Portfolio

A modern, responsive, and vibrant personal portfolio built with Next.js, Tailwind CSS, and React.

## Features
- **Next.js 13+**: Optimized performance and SEO.
- **Tailwind CSS**: Sleek, modern styling with a custom vibrant light mode and a deep dark mode.
- **Responsive Design**: Looks great on mobile, tablet, and desktop.
- **Dynamic Animations**: Intersection Observers used for scroll-triggered animations and statistic counters.
- **EmailJS Integration**: Fully functional contact form without needing a backend server.
- **Dark/Light Theme Toggle**: Saves user preference automatically.

## Getting Started

1. **Install dependencies:**
   `ash
   npm install
   ``n
2. **Set up Environment Variables:**
   Create a .env.local file in the root directory and add your EmailJS credentials to enable the contact form:
   `env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ``n
3. **Run the development server:**
   `ash
   npm run dev
   ``n
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com). Simply link your GitHub repository to Vercel and add your environment variables in the Vercel project settings.
