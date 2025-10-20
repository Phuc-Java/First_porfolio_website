"use client";

import { useEffect, useMemo } from "react";

type Props = {
  baseTitle?: string;
  variations?: string[];
  speed?: number; // ms per character (typing)
  pause?: number; // ms between full string and deletion
  deleteSpeed?: number; // optional faster delete speed
};

export default function AnimatedTitle({
  baseTitle = "Portfolio",
  variations,
  speed = 80,
  pause = 900,
  deleteSpeed,
}: Props): null {
  const items = useMemo(() => {
    // Keep the variants professional and localizable; no dev/debug strings
    return variations && variations.length > 0
      ? variations
      : [baseTitle, `${baseTitle} — Nguyễn Tuấn Phúc`, `${baseTitle} • Web Developer`];
  }, [baseTitle, variations]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    let rafId = 0;
    let last = performance.now();
    let acc = 0;
    let currentIndex = 0;
    const typingInterval = Math.max(20, speed);
    const deletingInterval = deleteSpeed ? Math.max(10, deleteSpeed) : Math.max(10, Math.round(typingInterval * 0.6));
    let mode: "typing" | "pausing" | "deleting" = "typing";
    let pauseStart = 0;

  // Avoid picking up development or tooling titles (localhost, port numbers, create next app, etc.)
  const isDevTitle = (t: string) => /localhost|127\.0\.0\.1|:\d{2,5}|create\s*next|nextjs|vercel/i.test(t);
  const rawInitial = document.title || baseTitle;
  const initialTitle = isDevTitle(rawInitial) ? baseTitle : rawInitial;

  // Start target and keep an internal record of the previous full title to avoid flashes
  let target = items[currentIndex];
  let prevFull = target; // will be updated when a full word is typed
    // Start from common prefix to reduce rewrites and visual jump
    function commonPrefix(a: string, b: string) {
      const len = Math.min(a.length, b.length);
      let i = 0;
      while (i < len && a[i] === b[i]) i++;
      return i;
    }

  let currentLength = commonPrefix(initialTitle, target);
  // Initialize title to the computed prefix but never set to dev titles
  document.title = target.slice(0, currentLength) || baseTitle;

    // Pause when tab hidden to save CPU and avoid weird title states
    let visible = !document.hidden;
    const onVisibility = () => {
      visible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    function frame(now: number) {
      if (!visible) {
        last = now;
        rafId = requestAnimationFrame(frame);
        return;
      }

      const delta = now - last;
      last = now;
      acc += delta;

      if (mode === "typing") {
        while (acc >= typingInterval) {
          acc -= typingInterval;
          currentLength++;
          document.title = target.slice(0, currentLength);
          if (currentLength >= target.length) {
            // we reached the full target
            prevFull = target;
            mode = "pausing";
            pauseStart = now;
            break;
          }
        }
      } else if (mode === "pausing") {
        if (now - pauseStart >= pause) {
          mode = "deleting";
        }
      } else if (mode === "deleting") {
        while (acc >= deletingInterval) {
          acc -= deletingInterval;
          currentLength--;
          // Keep at least 0
          currentLength = Math.max(0, currentLength);
          document.title = target.slice(0, currentLength);
          if (currentLength <= 0) {
            // move to next and compute prefix from previously known full title
            currentIndex = (currentIndex + 1) % items.length;
            const next = items[currentIndex];
            const prefix = commonPrefix(prevFull, next);
            target = next;
            currentLength = prefix;
            mode = "typing";
            break;
          }
        }
      }

      rafId = requestAnimationFrame(frame);
    }

    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [baseTitle, items, speed, pause, deleteSpeed]);

  return null;
}
