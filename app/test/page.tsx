"use client";

import Galaxy from '@/components/Galaxy';
import { useState } from 'react';

/**
 * Test page - For testing Galaxy effects and animations
 */
export default function TestPage() {
  const [config, setConfig] = useState({
    focal: [0.5, 0.5],
    rotation: [1.0, 0.0],
    starSpeed: 0.5,
    density: 1,
    hueShift: 140,
    speed: 1.0,
    glowIntensity: 0.3,
    saturation: 0.0,
    twinkleIntensity: 0.3,
    rotationSpeed: 0.1,
    repulsionStrength: 2,
    autoCenterRepulsion: 0,
    mouseRepulsion: true,
    mouseInteraction: true,
    transparent: false,
  });

  return (
    <div className="relative w-full min-h-screen overflow-auto bg-black">
      {/* Galaxy Background */}
      <div className="fixed inset-0 w-full h-full">
        <Galaxy 
          focal={config.focal as [number, number]}
          rotation={config.rotation as [number, number]}
          starSpeed={config.starSpeed}
          density={config.density}
          hueShift={config.hueShift}
          speed={config.speed}
          glowIntensity={config.glowIntensity}
          saturation={config.saturation}
          twinkleIntensity={config.twinkleIntensity}
          rotationSpeed={config.rotationSpeed}
          repulsionStrength={config.repulsionStrength}
          autoCenterRepulsion={config.autoCenterRepulsion}
          mouseRepulsion={config.mouseRepulsion}
          mouseInteraction={config.mouseInteraction}
          transparent={config.transparent}
        />
      </div>

      {/* Control Panel */}
      <div className="relative z-10 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-black/60 border border-white/20 rounded-3xl p-8 space-y-6">
            <h1 className="text-3xl font-bold text-white mb-6">Galaxy Effect Tester</h1>
            
            {/* Hue Shift */}
            <div>
              <label className="block text-white/80 mb-2">
                Hue Shift: {config.hueShift}°
              </label>
              <input
                type="range"
                min="0"
                max="360"
                value={config.hueShift}
                onChange={(e) => setConfig({...config, hueShift: Number(e.target.value)})}
                className="w-full"
              />
            </div>

            {/* Star Speed */}
            <div>
              <label className="block text-white/80 mb-2">
                Star Speed: {config.starSpeed.toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={config.starSpeed}
                onChange={(e) => setConfig({...config, starSpeed: Number(e.target.value)})}
                className="w-full"
              />
            </div>

            {/* Density */}
            <div>
              <label className="block text-white/80 mb-2">
                Density: {config.density.toFixed(2)}
              </label>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={config.density}
                onChange={(e) => setConfig({...config, density: Number(e.target.value)})}
                className="w-full"
              />
            </div>

            {/* Speed */}
            <div>
              <label className="block text-white/80 mb-2">
                Animation Speed: {config.speed.toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="3"
                step="0.1"
                value={config.speed}
                onChange={(e) => setConfig({...config, speed: Number(e.target.value)})}
                className="w-full"
              />
            </div>

            {/* Glow Intensity */}
            <div>
              <label className="block text-white/80 mb-2">
                Glow Intensity: {config.glowIntensity.toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={config.glowIntensity}
                onChange={(e) => setConfig({...config, glowIntensity: Number(e.target.value)})}
                className="w-full"
              />
            </div>

            {/* Saturation */}
            <div>
              <label className="block text-white/80 mb-2">
                Saturation: {config.saturation.toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={config.saturation}
                onChange={(e) => setConfig({...config, saturation: Number(e.target.value)})}
                className="w-full"
              />
            </div>

            {/* Twinkle Intensity */}
            <div>
              <label className="block text-white/80 mb-2">
                Twinkle Intensity: {config.twinkleIntensity.toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={config.twinkleIntensity}
                onChange={(e) => setConfig({...config, twinkleIntensity: Number(e.target.value)})}
                className="w-full"
              />
            </div>

            {/* Rotation Speed */}
            <div>
              <label className="block text-white/80 mb-2">
                Rotation Speed: {config.rotationSpeed.toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="0.5"
                step="0.01"
                value={config.rotationSpeed}
                onChange={(e) => setConfig({...config, rotationSpeed: Number(e.target.value)})}
                className="w-full"
              />
            </div>

            {/* Repulsion Strength */}
            <div>
              <label className="block text-white/80 mb-2">
                Repulsion Strength: {config.repulsionStrength.toFixed(1)}
              </label>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={config.repulsionStrength}
                onChange={(e) => setConfig({...config, repulsionStrength: Number(e.target.value)})}
                className="w-full"
              />
            </div>

            {/* Toggles */}
            <div className="space-y-3 pt-4">
              <label className="flex items-center gap-3 text-white/80">
                <input
                  type="checkbox"
                  checked={config.mouseInteraction}
                  onChange={(e) => setConfig({...config, mouseInteraction: e.target.checked})}
                  className="w-5 h-5"
                />
                Mouse Interaction
              </label>

              <label className="flex items-center gap-3 text-white/80">
                <input
                  type="checkbox"
                  checked={config.mouseRepulsion}
                  onChange={(e) => setConfig({...config, mouseRepulsion: e.target.checked})}
                  className="w-5 h-5"
                />
                Mouse Repulsion
              </label>

              <label className="flex items-center gap-3 text-white/80">
                <input
                  type="checkbox"
                  checked={config.transparent}
                  onChange={(e) => setConfig({...config, transparent: e.target.checked})}
                  className="w-5 h-5"
                />
                Transparent Background
              </label>
            </div>

            {/* Preset Buttons */}
            <div className="pt-6 space-y-3">
              <p className="text-white/80 font-semibold">Presets:</p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setConfig({
                    ...config,
                    hueShift: 140,
                    starSpeed: 0.5,
                    density: 1,
                    saturation: 0,
                  })}
                  className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/30 rounded-lg text-white transition-all"
                >
                  Default (Cyan)
                </button>
                <button
                  onClick={() => setConfig({
                    ...config,
                    hueShift: 280,
                    starSpeed: 0.3,
                    density: 1.2,
                    saturation: 0.6,
                  })}
                  className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/30 rounded-lg text-white transition-all"
                >
                  Purple Galaxy
                </button>
                <button
                  onClick={() => setConfig({
                    ...config,
                    hueShift: 0,
                    starSpeed: 0.8,
                    density: 1.5,
                    saturation: 0.8,
                  })}
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 rounded-lg text-white transition-all"
                >
                  Red Nebula
                </button>
                <button
                  onClick={() => setConfig({
                    ...config,
                    hueShift: 200,
                    starSpeed: 0.2,
                    density: 0.5,
                    saturation: 0.3,
                  })}
                  className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 rounded-lg text-white transition-all"
                >
                  Deep Space
                </button>
              </div>
            </div>

            {/* Export Config */}
            <div className="pt-6 border-t border-white/10">
              <p className="text-white/80 mb-2 font-semibold">Current Config:</p>
              <pre className="bg-black/40 p-4 rounded-lg text-xs text-white/70 overflow-auto">
                {JSON.stringify(config, null, 2)}
              </pre>
            </div>
          </div>

          {/* Test Content Sections */}
          <div className="mt-12 space-y-8">
            <div className="backdrop-blur-md bg-white/5 border border-white/20 rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Test Section 1</h2>
              <p className="text-white/70">
                This is a test section to see how content looks with the Galaxy background.
                You can scroll down to see more sections.
              </p>
            </div>

            <div className="backdrop-blur-md bg-white/5 border border-white/20 rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Test Section 2</h2>
              <p className="text-white/70">
                Another test section with different content. The Galaxy should remain fixed
                in the background while you scroll.
              </p>
            </div>

            <div className="backdrop-blur-md bg-white/5 border border-white/20 rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Test Section 3</h2>
              <p className="text-white/70">
                Final test section. Try interacting with the mouse to see the repulsion effect!
              </p>
            </div>
          </div>

          {/* Bottom Spacing */}
          <div className="h-20"></div>
        </div>
      </div>
    </div>
  );
}
