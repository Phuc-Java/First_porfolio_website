# 🚀 Personal Website - Clean Architecture

Modern personal portfolio built with Next.js 15, React 19, and Framer Motion.

## ✨ Features

- **Clean Architecture**: Organized folder structure with separation of concerns
- **Performance Optimized**: Dynamic imports, memoization, GPU acceleration
- **Smooth Transitions**: useTransition with loading states for seamless navigation
- **Modern UI**: Threads WebGL background, animated dock navigation
- **Type-Safe**: Full TypeScript support with proper typing
- **Responsive**: Mobile-first design with Tailwind CSS

## 📁 Project Structure

```
web-ca-nhan/
├── app/                          # Next.js app directory
│   ├── (pages)/
│   │   ├── page.tsx             # Home page
│   │   ├── profile/page.tsx     # Profile page
│   │   ├── archive/page.tsx     # Archive page
│   │   └── tasks/page.tsx       # Tasks page
│   ├── layout.tsx               # Root layout
│   ├── template.tsx             # Page template with transitions
│   ├── loading.tsx              # Loading UI
│   └── globals.css              # Global styles
│
├── components/
│   ├── layout/                  # Layout components
│   │   ├── PageContainer.tsx    # Reusable page wrapper
│   │   └── Header.tsx           # Site header
│   ├── ui/                      # UI components
│   │   ├── NavigationDock.tsx   # Dock navigation
│   │   └── LoadingOverlay.tsx   # Loading overlay
│   ├── Threads.tsx              # WebGL background
│   └── ShinyText.tsx            # Animated text
│
├── lib/
│   ├── hooks/                   # Custom hooks
│   │   └── usePageTransition.ts # Page transition hook
│   ├── constants/               # Constants
│   │   └── navigation.tsx       # Navigation config
│   ├── providers/               # Context providers
│   │   └── AppProvider.tsx      # App-level state
│   └── utils.ts                 # Utility functions
│
└── public/                      # Static assets
    └── logo.png
```

## 🎯 Key Components

### PageContainer
Reusable container with Threads background and optimized rendering.
```tsx
<PageContainer>
  <Header />
  <main>...</main>
  <NavigationDock />
</PageContainer>
```

### NavigationDock
Animated navigation with active states and useTransition.
```tsx
<NavigationDock items={NAVIGATION_ITEMS} />
```

### usePageTransition Hook
Custom hook for smooth page transitions with loading states.
```tsx
const { isPending, navigate } = usePageTransition();
navigate('/profile'); // Triggers loading overlay
```

## 🔧 Configuration

### Navigation Items (`lib/constants/navigation.tsx`)
```tsx
export const NAVIGATION_ITEMS = [
  { icon: <HomeIcon />, label: 'Home', href: '/' },
  // ...
];
```

### Dock Config
```tsx
export const DOCK_CONFIG = {
  panelHeight: 68,
  baseItemSize: 50,
  magnification: 70,
};
```

## 🎨 Styling

- **Tailwind CSS v4**: Modern CSS-first approach
- **Custom Animations**: GPU-accelerated transitions
- **Dark Theme**: Black background with white accents
- **Responsive**: Breakpoints for all devices

## ⚡ Performance Optimizations

1. **Dynamic Imports**: Threads component lazy-loaded
2. **React.memo**: Memoized expensive components
3. **will-change**: CSS hints for smooth animations
4. **useTransition**: Non-blocking page transitions
5. **GPU Acceleration**: transform: translateZ(0)

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📝 Code Style

- **Clean Code**: Self-documenting with clear naming
- **JSDoc Comments**: Documentation for complex functions
- **Type Safety**: Strict TypeScript configuration
- **Consistent Formatting**: ESLint + Prettier

## 🎯 Best Practices Implemented

1. **Separation of Concerns**: UI, logic, and data separated
2. **DRY Principle**: Reusable components and constants
3. **Single Responsibility**: Each component has one purpose
4. **Composition over Inheritance**: React composition patterns
5. **Performance First**: Optimizations from the start

## 📦 Dependencies

- **next**: 15.5.6
- **react**: 19.1.0
- **motion**: ^12.23.24 (Framer Motion)
- **tailwindcss**: ^4
- **react-icons**: ^5.5.0
- **ogl**: ^1.0.11 (WebGL for Threads)

## 🔄 Page Transition Flow

```
User clicks navigation → useTransition starts
    ↓
LoadingOverlay appears (isPending = true)
    ↓
Page route changes (client-side)
    ↓
New page renders with PageTransition animation
    ↓
LoadingOverlay fades out (isPending = false)
```

## 🎬 Animation Timeline

- **Loading Overlay**: 200ms fade in/out
- **Page Transition**: 500ms with cubic-bezier
- **Dock Hover**: 300ms scale + color
- **Active Indicator**: Spring animation (300/30)

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React 19 Features](https://react.dev/blog)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📄 License

MIT License - feel free to use this project as a template!

---

**Built with ❤️ using modern web technologies**
