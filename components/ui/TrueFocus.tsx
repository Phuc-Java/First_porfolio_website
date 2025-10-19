"use client";

import { useEffect, useRef, useState, memo } from 'react';
import { motion } from 'motion/react';

/**
 * TrueFocus - Interactive focus effect component
 * Highlights words/phrases with animated border on hover
 */

interface TrueFocusProps {
  sentence: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  className?: string;
  phrases?: string[]; // Để group words thành phrases
}

interface FocusRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const TrueFocus = memo<TrueFocusProps>(({
  sentence,
  manualMode = true, // Default manual mode for hover
  blurAmount = 4,
  borderColor = '#00d9ff',
  glowColor = 'rgba(0, 217, 255, 0.6)',
  animationDuration = 0.3,
  pauseBetweenAnimations = 1,
  className = '',
  phrases
}) => {
  // Split by phrases if provided, otherwise by words
  const items = phrases || sentence.split(' ');
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusRect, setFocusRect] = useState<FocusRect>({ x: 0, y: 0, width: 0, height: 0 });

  // Auto-cycle animation when not in manual mode
  useEffect(() => {
    if (!manualMode) {
      const interval = setInterval(
        () => {
          setCurrentIndex(prev => (prev + 1) % items.length);
        },
        (animationDuration + pauseBetweenAnimations) * 1000
      );

      return () => clearInterval(interval);
    }
  }, [manualMode, animationDuration, pauseBetweenAnimations, items.length]);

  // Update focus rectangle position
  useEffect(() => {
    if (currentIndex === -1 || !itemRefs.current[currentIndex] || !containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = itemRefs.current[currentIndex]!.getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height
    });
  }, [currentIndex, items.length]);

  const handleMouseEnter = (index: number) => {
    if (manualMode) {
      setCurrentIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (manualMode) {
      setCurrentIndex(-1); // Hide focus when mouse leaves
    }
  };

  return (
    <div 
      className={`relative flex gap-3 justify-center items-center flex-wrap ${className}`} 
      ref={containerRef}
    >
      {items.map((item, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={`${item}-${index}`}
            ref={el => {
              itemRefs.current[index] = el;
            }}
            className="relative cursor-pointer text-gray-300 transition-all"
            style={
              {
                filter: isActive ? 'blur(0px)' : `blur(${blurAmount}px)`,
                transition: `filter ${animationDuration}s ease, color ${animationDuration}s ease`,
                color: isActive ? '#ffffff' : undefined
              } as React.CSSProperties
            }
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {item}
          </span>
        );
      })}


      {/* Animated Focus Border */}
      <motion.div
        className="absolute top-0 left-0 pointer-events-none box-border border-0"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: currentIndex >= 0 ? 1 : 0
        }}
        transition={{
          duration: animationDuration,
          ease: 'easeOut'
        }}
        style={
          {
            '--border-color': borderColor,
            '--glow-color': glowColor
          } as React.CSSProperties
        }
      >
        {/* Corner Brackets - Clean & Elegant */}
        <span
          className="absolute w-4 h-4 border-[2.5px] rounded-sm top-[-8px] left-[-8px] border-r-0 border-b-0"
          style={{
            borderColor: borderColor,
            filter: `drop-shadow(0 0 6px ${glowColor})`,
            transition: 'all 0.3s ease'
          }}
        />
        <span
          className="absolute w-4 h-4 border-[2.5px] rounded-sm top-[-8px] right-[-8px] border-l-0 border-b-0"
          style={{
            borderColor: borderColor,
            filter: `drop-shadow(0 0 6px ${glowColor})`,
            transition: 'all 0.3s ease'
          }}
        />
        <span
          className="absolute w-4 h-4 border-[2.5px] rounded-sm bottom-[-8px] left-[-8px] border-r-0 border-t-0"
          style={{
            borderColor: borderColor,
            filter: `drop-shadow(0 0 6px ${glowColor})`,
            transition: 'all 0.3s ease'
          }}
        />
        <span
          className="absolute w-4 h-4 border-[2.5px] rounded-sm bottom-[-8px] right-[-8px] border-l-0 border-t-0"
          style={{
            borderColor: borderColor,
            filter: `drop-shadow(0 0 6px ${glowColor})`,
            transition: 'all 0.3s ease'
          }}
        />
      </motion.div>
    </div>
  );
});

TrueFocus.displayName = 'TrueFocus';

export { TrueFocus };
