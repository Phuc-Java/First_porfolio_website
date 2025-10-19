"use client";

import { ReactNode, memo } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import Threads for better performance
const Threads = dynamic(() => import('../Threads'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-black" />,
});

const MemoizedThreads = memo(Threads);

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Reusable page container with Threads background
 * Optimized with dynamic imports and memoization
 */
export function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <div className={`relative w-full h-screen bg-black overflow-hidden ${className}`}>
      {/* Background Layer - Threads animation */}
      <div 
        className="absolute inset-0 z-0" 
        style={{ willChange: 'transform, opacity' }}
      >
        <MemoizedThreads 
          amplitude={1} 
          distance={0.14} 
          enableMouseInteraction={true} 
        />
      </div>

      {/* Content Layer */}
      <div 
        className="relative z-10 flex flex-col h-full" 
        style={{ willChange: 'transform, opacity' }}
      >
        {children}
      </div>
    </div>
  );
}
