"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from 'next/navigation';
import { SkipButton } from "@/components/ui/OverlayButtons";
import TargetCursor from "@/components/TargetCursor";
import "./OpeningOverlay.css";

type Props = {
  src?: string; // path under /public
  duration?: number; // ms to show the gif (approx one full play)
  fadeMs?: number;
};

export default function OpeningOverlay({
  src = "/Gif/gif1.gif",
  duration = 120000,
  fadeMs = 600,
}: Props) {
  const pathname = usePathname?.() ?? '/';

  // Only show the opening overlay on the home page to avoid hiding
  // other routes (404, contact, etc.). If not home, render nothing.
  if (pathname !== '/') return null;
  const [visible, setVisible] = useState(true);
  const [hiding, setHiding] = useState(false);
  const [canSkip, setCanSkip] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const skipTimeoutRef = useRef<number | null>(null);
  const maxTimeoutRef = useRef<number | null>(null);
  const [activeFadeMs, setActiveFadeMs] = useState<number>(fadeMs);

  // ensure activeFadeMs follows prop unless changed by skip
  useEffect(() => setActiveFadeMs(fadeMs), [fadeMs]);

  useEffect(() => {
  // Do NOT auto-hide the opening overlay. It will remain until the user
  // explicitly clicks Skip. We still enable the Skip button after a delay.
  // Show skip button sooner (3s) instead of previously 13s.
  const skipTimer = window.setTimeout(() => setCanSkip(true), 3000);

    // fallback: hide overlay after 10 minutes (600000ms) in case user never
    // clicks skip — this ensures the site remains usable. Keep it long to
    // mimic 'infinite' behavior but still provide a safety net.
    maxTimeoutRef.current = window.setTimeout(() => {
      setHiding(true);
      setTimeout(() => setVisible(false), fadeMs);
    }, 600000);

    return () => {
      clearTimeout(skipTimer);
      if (maxTimeoutRef.current) {
        try { window.clearTimeout(maxTimeoutRef.current); } catch {}
        maxTimeoutRef.current = null;
      }
      // clear any pending skip timeout if component unmounts
      if (skipTimeoutRef.current) {
        try { window.clearTimeout(skipTimeoutRef.current); } catch {}
        skipTimeoutRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // create audio element and attempt to autoplay
    // Attempt to find the global music widget audio first
    const globalAudio = document.getElementById("music-widget-audio") as HTMLAudioElement | null;
    let overlayCreated = false;
    let pausedMusicWidget = false;
    let observedMusicEl: HTMLAudioElement | null = null;
    if (globalAudio) {
      audioRef.current = globalAudio;
    } else {
      const a = document.createElement("audio");
      a.id = "music-widget-audio"; // create the shared element so widget can reuse it
      a.src = "/Music/05 (Khong Phai) (Masew Remix) - Nhieu nghe si - NhacHayVN.mp3";
      a.preload = "auto";
      a.loop = false;
      // DO NOT set autoplay here — user gesture should be required
      // mark overlay-created audio so we can identify it
      a.dataset.overlay = "true";
      try { document.body.appendChild(a); } catch {}
      audioRef.current = a;
      overlayCreated = true;
    }

    // We'll only attempt to play audio on user interaction. Start assuming
    // autoplay is blocked; handlers below will try to play on first interaction.
    let autoplayBlocked = true;

    // hide the music widget portal while overlay visible (avoid duplicate icon)
    const portal = document.getElementById("music-widget-portal");
    if (portal) portal.style.display = "none";
    // element, pause the MusicWidget audio to avoid duplicate playback. We use
    // a MutationObserver to catch late mounts (client-side navigation timing).
    let observer: MutationObserver | null = null;
    if (overlayCreated) {
      const checkAndPause = () => {
        const mw = document.getElementById("music-widget-audio") as HTMLAudioElement | null;
        if (mw && mw !== audioRef.current) {
          try {
            mw.pause();
            mw.dataset.pausedByOverlay = "true";
            pausedMusicWidget = true;
            observedMusicEl = mw;
          } catch {}
        }
      };

      // immediate check in case it already exists
      checkAndPause();

      observer = new MutationObserver(() => {
        checkAndPause();
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }

    // We only start audio on explicit user action (Music button). Do not
    // attach global interaction listeners that cause accidental playback.

    return () => {
      try { if (!document.getElementById("music-widget-portal")) {} } catch {}
      // If we paused the MusicWidget audio earlier, attempt to resume it and
      // remove the marker attribute we added.
      try {
        const mw = observedMusicEl || (document.getElementById("music-widget-audio") as HTMLAudioElement | null);
        if (mw && mw.dataset.pausedByOverlay === "true") {
          mw.play().catch(() => {});
          delete mw.dataset.pausedByOverlay;
        }
      } catch {}

      if (observer) {
        try { observer.disconnect(); } catch {}
        observer = null;
      }

      // do not pause globalAudio here; leave playing state management to MusicWidget
      audioRef.current = null;
      if (portal) portal.style.display = "";
    };
  }, []);


  if (!visible) return null;

  return (
    <div
      aria-hidden={!visible}
      className={`opening-overlay ${hiding ? "hidden" : "visible"}`}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
        transition: `opacity ${activeFadeMs}ms ease`,
        opacity: hiding ? 0 : 1,
      }}
    >
      <div className="night-bg" />
  {/* custom target cursor for overlay */}
  <TargetCursor spinDuration={2} hideDefaultCursor={true} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <div style={{
        padding: 20,
        background: "linear-gradient(135deg, rgba(255,235,246,0.06), rgba(235,250,255,0.02))",
        borderRadius: 18,
        boxShadow: "0 18px 50px rgba(20,20,30,0.6)",
        display: "flex",
        alignItems: "center",
        gap: 24,
        maxWidth: "min(900px, 94%)",
        position: 'relative',
        zIndex: 2,
      }}>
        {/* image box (larger, cute) */}
        <div style={{ flex: "0 0 auto", width: 260, height: 260, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", borderRadius: 18, background: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.04), rgba(0,0,0,0.12))", border: "1px solid rgba(255,255,255,0.04)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="Opening animation" style={{ width: "110%", height: "110%", objectFit: "cover", display: "block", transform: "translateY(2px)" }} />
        </div>

        {/* explanation & controls (cute) */}
        <div style={{ flex: 1, color: "#fff", fontFamily: "inherit" }}>
          <div style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>Chào bạn 👋</div>
          <div style={{ opacity: 0.95, marginBottom: 14, maxWidth: 520 }}>
            Chút xíu nữa thôi — mình đang tải web thần tốc cho bạn, sắp xong rồi. Bạn cứ nghe nhạc thư giãn, tí nữa bấm "Skip" để về home nhé 😉
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button
              onClick={() => {
                // play the specific track (Không Phai) using global audio if available
                const globalAudio = document.getElementById("music-widget-audio") as HTMLAudioElement | null;
                const track = "/Music/05 (Khong Phai) (Masew Remix) - Nhieu nghe si - NhacHayVN.mp3";
                const parts = track.split('/');
                const safe = parts.map((p, i) => (i === 0 && p === '' ? '' : encodeURIComponent(p))).join('/');
                if (globalAudio) {
                  try {
                    globalAudio.src = safe;
                    globalAudio.load();
                    globalAudio.play().catch(()=>{});
                  } catch {}
                } else {
                  // create overlay audio if none
                  let a = audioRef.current;
                  if (!a) {
                    a = document.createElement('audio');
                    a.dataset.overlay = "true";
                    audioRef.current = a;
                  }
                  try { a.src = safe; a.preload = 'auto'; a.play().catch(()=>{}); } catch {}
                }
              }}
              className="cursor-target"
              style={{
                background: "linear-gradient(90deg,#7df9ff,#b28cff)",
                color: "#081018",
                border: "none",
                padding: "8px 14px",
                borderRadius: 10,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 6px 18px rgba(0,0,0,0.45)",
              }}
            >
              Music — Không Phai
            </button>
            <div style={{ color: "#ddd", fontSize: 14 }}>Nghe nhạc trong lúc tải trang…</div>
          </div>
        </div>

      </div>

      {/* right column: skip button appears after delay */}
  <div style={{ position: 'absolute', right: 48, top: '50%', transform: 'translateY(-50%)', zIndex: 3 }}>
        {canSkip ? (
          <SkipButton onClick={() => {
            // professional skip: fade out over 3s while keeping music playing
            const fadeMsLocal = 3000;
            setActiveFadeMs(fadeMsLocal);
            setHiding(true);
            // allow music to continue for fade duration, then cleanup
            if (skipTimeoutRef.current) {
              try { window.clearTimeout(skipTimeoutRef.current); } catch {}
            }
            if (maxTimeoutRef.current) {
              try { window.clearTimeout(maxTimeoutRef.current); } catch {}
              maxTimeoutRef.current = null;
            }
            skipTimeoutRef.current = window.setTimeout(() => {
              try {
                if (audioRef.current && audioRef.current.dataset?.overlay === "true") {
                  audioRef.current.pause();
                }
              } catch {}
              setVisible(false);
              skipTimeoutRef.current = null;
            }, fadeMsLocal) as unknown as number;
          }}>
            Skip
          </SkipButton>
        ) : null}
      </div>

      {/* Skip control rendered in the info box above. No enable-sound UI — overlay attempts autoplay automatically. */}
    </div>
  );
}
