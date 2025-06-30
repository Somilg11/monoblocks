# Monoblocks Landing Page

A pixel-perfect, fully responsive landing page built with Next.js, featuring a clean black-and-white aesthetic with seamless dark/light mode toggle.



## ✨ Features

- **🎨 Pure Monochrome Design**: Clean black (#000) and white (#fff) aesthetic
- **🌓 Animated Theme Toggle**: Smooth dark/light mode switching with localStorage persistence
- **🎬 Window-Opening Loader**: Cinematic two-panel slide animation on page load
- **📱 Fully Responsive**: Fluid design from 320px to 1920px+ screens
- **🎭 Rich Animations**: Framer Motion for micro-interactions and page transitions
- **♿ Accessibility First**: WCAG compliant with 7:1+ contrast ratios
- **⚡ Performance Optimized**: Lazy loading, reduced motion support, and optimized assets

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom theme configuration
- **Animations**: Framer Motion for React components
- **Icons**: Lucide React
- **TypeScript**: Full type safety
- **Deployment**: Optimized for Vercel

## 🚀 Quick Start

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd monoblocks-landing
   npm install
   ```

2. **Development**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

3. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## 📁 Project Structure

```
├── app/
│   ├── globals.css          # Global styles and CSS variables
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page component
├── components/
│   ├── ui/                  # Reusable UI components
│   ├── header.tsx           # Navigation header
│   ├── hero.tsx             # Hero section
│   ├── features.tsx         # Features grid
│   ├── video-section.tsx    # Video showcase
│   ├── trending-blocks.tsx  # Trending components
│   ├── stats.tsx            # Animated counters
│   ├── testimonials.tsx     # Customer testimonials
│   ├── footer.tsx           # Site footer
│   ├── loader.tsx           # Window-opening animation
│   ├── theme-provider.tsx   # Theme context
│   └── theme-toggle.tsx     # Dark/light mode switch
└── public/
    └── images/              # Static assets
```

## 🎨 Design System

### Color Palette
- **Light Mode**: Pure white (#FFFFFF) backgrounds, black (#000000) text
- **Dark Mode**: Pure black (#000000) backgrounds, white (#FFFFFF) text
- **Accents**: Subtle grays for borders and muted elements

### Typography
- **Font**: Inter Variable for optimal readability
- **Scale**: Fluid typography that scales with viewport
- **Hierarchy**: Clear visual hierarchy with consistent spacing

### Animations
- **Page Load**: Window-opening effect with staggered reveals
- **Interactions**: Subtle hover states and micro-interactions
- **Scroll**: Smooth reveal animations triggered by viewport intersection
- **Reduced Motion**: Respects user preferences for accessibility

## 🔧 Customization

### Theme Colors
Edit CSS variables in `app/globals.css`:

```css
:root {
  --background: 255 255 255;
  --foreground: 0 0 0;
  /* ... */
}

[data-theme="dark"] {
  --background: 0 0 0;
  --foreground: 255 255 255;
  /* ... */
}
```

### Animation Timing
Adjust animation delays and durations in component files:

```tsx
// Example: Modify loader timing
<motion.div
  animate={{ x: '-100%' }}
  transition={{ 
    duration: 1.5,  // Adjust duration
    delay: 0.5,     // Adjust delay
    ease: [0.76, 0, 0.24, 1]  // Custom easing
  }}
/>
```

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px  
- **Desktop**: 1024px - 1439px
- **Large**: 1440px+

## ♿ Accessibility Features

- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Semantic HTML and ARIA labels
- **Color Contrast**: 7:1+ ratio for all text
- **Reduced Motion**: Respects `prefers-reduced-motion`
- **Focus Management**: Clear focus indicators

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Manual Deployment
```bash
npm run build
# Serve the .next folder with your preferred static host
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**AI Tools Used**: V0 for code generation and optimization, GitHub Copilot for development assistance.
