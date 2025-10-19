'use client';

import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence
} from 'motion/react';
import React, { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { usePageTransition } from '@/lib/hooks/usePageTransition';
import { DOCK_CONFIG } from '@/lib/constants/navigation';
import type { DockItemData } from '@/lib/constants/navigation';
import { LoadingOverlay } from './LoadingOverlay';

/**
 * Navigation Dock - Original smooth magnification (macOS style)
 * Features: Spring physics, dynamic sizing, labels on hover
 */

type DockItemProps = {
  item: DockItemData;
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
  baseItemSize: number;
  magnification: number;
  onClick: () => void;
};

function DockItem({
  item,
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, val => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize
    };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(
    mouseDistance, 
    [-distance, 0, distance], 
    [baseItemSize, magnification, baseItemSize]
  );
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className="relative inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-[#2a2a3e] to-[#1a1a2e] border-white/10 border-2 shadow-lg cursor-pointer hover:border-white/20 transition-colors"
      tabIndex={0}
      role="button"
      aria-label={item.label}
    >
      {/* Icon */}
      <div className="flex items-center justify-center">
        {item.icon}
      </div>
      
      {/* Label on hover */}
      <DockLabel isHovered={isHovered}>{item.label}</DockLabel>
      
      {/* Active indicator */}
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute -bottom-1 w-1 h-1 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"
          initial={false}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </motion.div>
  );
}

type DockLabelProps = {
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
};

function DockLabel({ children, isHovered }: DockLabelProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsubscribe = isHovered.on('change', latest => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute -top-8 left-1/2 -translate-x-1/2 w-fit whitespace-pre rounded-md border border-white/20 bg-black/90 backdrop-blur-sm px-3 py-1.5 text-xs text-white font-medium shadow-xl"
          role="tooltip"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface NavigationDockProps {
  items: readonly DockItemData[];
  className?: string;
}

export function NavigationDock({ items, className = '' }: NavigationDockProps) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);
  const { navigate, isPending } = usePageTransition();

  const spring: SpringOptions = { 
    mass: 0.1, 
    stiffness: 150, 
    damping: 12 
  };
  
  const { panelHeight, baseItemSize, magnification } = DOCK_CONFIG;
  const distance = 150;

  const maxHeight = useMemo(
    () => Math.max(80, magnification + magnification / 2 + 4), 
    [magnification]
  );
  
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
    <>
      <LoadingOverlay isLoading={isPending} />
      <motion.div 
        style={{ height, scrollbarWidth: 'none' }} 
        className="mx-2 flex max-w-full items-center"
      >
        <motion.div
          onMouseMove={({ pageX }) => {
            isHovered.set(1);
            mouseX.set(pageX);
          }}
          onMouseLeave={() => {
            isHovered.set(0);
            mouseX.set(Infinity);
          }}
          className={`${className} flex items-end w-fit gap-3 rounded-2xl border-white/10 border-2 bg-gradient-to-b from-[#1a1a2e]/90 to-[#0a0a0a]/90 backdrop-blur-xl pb-2 px-4 shadow-2xl`}
          style={{ height: panelHeight }}
          role="toolbar"
          aria-label="Navigation dock"
        >
          {items.map((item) => (
            <DockItem
              key={item.href}
              item={item}
              onClick={() => navigate(item.href)}
              mouseX={mouseX}
              spring={spring}
              distance={distance}
              magnification={magnification}
              baseItemSize={baseItemSize}
            />
          ))}
        </motion.div>
      </motion.div>
    </>
  );
}
