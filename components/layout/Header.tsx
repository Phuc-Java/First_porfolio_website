"use client";

import Image from "next/image";
import ShinyText from "../ShinyText";

/**
 * Site header with logo and animated title
 * Shows ShinyText effect on hover
 */
export function Header() {
  return (
    <header className="text-white p-7">
      <div className="group flex items-center gap-4 w-fit cursor-pointer">
        {/* Logo with hover animation */}
        <div className="transition-all duration-500 group-hover:rotate-12 group-hover:scale-125">
          <Image 
            src="/logo.png" 
            alt="Logo" 
            width={36} 
            height={36}
            className="object-contain drop-shadow-[0_0_13px_rgba(255,255,255,0.27)]"
            priority
          />
        </div>
        
        {/* Animated text appears on hover */}
        <div className="opacity-0 translate-x-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-700 ease-out">
          <ShinyText 
            text="My Personal Website" 
            disabled={false} 
            speed={3} 
            className="text-3xl font-bold tracking-tight"
          />
        </div>
      </div>
    </header>
  );
}
