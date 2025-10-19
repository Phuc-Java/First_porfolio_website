"use client";

import { PageContainer } from '@/components/layout/PageContainer';
import { Header } from '@/components/layout/Header';
import { NavigationDock } from '@/components/ui/NavigationDock';
import { BlurText } from '@/components/ui/BlurText';
import { TrueFocus } from '@/components/ui/TrueFocus';
import { NAVIGATION_ITEMS } from '@/lib/constants/navigation';
import Lanyard from '../components/Lanyard'
import TextType from '../components/TextType';
import { useRouter } from 'next/navigation';

/**
 * Home page - Landing page with animated hero section
 * Features BlurText for name and TrueFocus for interactive subtitle
 */
export default function HomePage() {
  const router = useRouter();

  return (
    <PageContainer>
      <Header />

      {/* 3D Lanyard Background */}
      <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />

      {/* Hero Section - Center */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6">
        <div className="max-w-6xl w-full text-center mt-12">
          {/* Name Title - Balanced Size */}
          <div className="mb-8 md:mb-10">
            <BlurText
              text="Nguyễn Tuấn Phúc"
              delay={300}
              animateBy="words"
              direction="top"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-wide leading-tight font-[family-name:var(--font-playfair)]"
            />
          </div>

          {/* Subtitle with Interactive Focus */}
          <div className="mb-6 md:mb-8">
            <TrueFocus
              sentence="Web Developer"
              manualMode={true}
              blurAmount={3}
              borderColor="#00d9ff"
              glowColor="rgba(0, 217, 255, 0.6)"
              animationDuration={0.5}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-wider font-[family-name:var(--font-playfair)]"
            />
          </div>

          {/* Animated Typing Text with Color Transitions */}
          <div className="mt-8 flex justify-center">
            <TextType 
              text={[
                "Chào mừng đến với website cá nhân của mình",
                "Website này dùng để giới thiệu bản thân và các dự án",
                "Chúc bạn một ngày vui vẻ!"
              ]}
              typingSpeed={80}
              pauseDuration={2000}
              deletingSpeed={50}
              showCursor={true}
              cursorCharacter="|"
              textColors={[
                "#00d9ff",  // Cyan
                "#ff6b9d",  // Pink
                "#c084fc",  // Purple
              ]}
              className="text-base sm:text-lg md:text-xl font-light text-white/90 max-w-2xl px-4 transition-colors duration-500"
              cursorClassName="text-cyan-400 font-bold"
            />
          </div>

        </div>
      </main>

      {/* Navigation Dock - Bottom */}
      <nav className="relative z-20 pb-8 flex justify-center">
        <NavigationDock items={NAVIGATION_ITEMS} />
      </nav>
    </PageContainer>
  );
}
