"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import "./MusicWidget.css";
import ElectricBorder from "./ElectricBorder";

type Track = { id: string; title: string; src: string };

const tracks: Track[] = [
  { id: "1", title: "05 (Không Phai) (Masew Remix)", src: "/music/05 (Khong Phai) (Masew Remix) - Nhieu nghe si - NhacHayVN.mp3" },
  { id: "2", title: "Có Một Người Vẫn Đợi (Remix)", src: "/music/Co Mot Nguoi Van Doi (Remix) - Viet Lee, BConcept - NhacHayVN.mp3" },
  { id: "3", title: "Don't Coi Ver2 Remix (Anhvu Remix)", src: "/music/Don't Coi Ver2 Remix ( Anhvu Remix ) - Minh TienL - NhacHayVN.mp3" },
  { id: "4", title: "Em Là Ai (Dai Meo Remix)", src: "/music/Em La Ai (Dai Meo Remix) - Keyo - NhacHayVN.mp3" },
  { id: "5", title: "Rước Nắng (Air Remix)", src: "/music/Ruoc Nang (Air Remix) - BIN - NhacHayVN.mp3" },
];

export default function MusicWidget(): React.ReactElement | null {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const portalElRef = useRef<HTMLDivElement | null>(null);

  // Ensure only one audio source is used and persists across navigation
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onEnded = () => {
      // loop the current track when it ends
      try {
        audio.currentTime = 0;
        audio.play().catch(() => setPlaying(false));
      } catch (e) {
        // ignore
      }
    };

    audio.addEventListener("ended", onEnded);
    return () => audio.removeEventListener("ended", onEnded);
  }, []);

  // mount portal container on client
    useEffect(() => {
      setMounted(true);
      // Reuse an existing portal if present to avoid creating/removing it across
      // client-side navigation which can cause visual jumps.
      const existing = document.getElementById("music-widget-portal") as HTMLDivElement | null;
      let created = false;
      let el: HTMLDivElement;
      if (existing) {
        el = existing;
      } else {
        created = true;
        el = document.createElement("div");
        el.setAttribute("id", "music-widget-portal");
        // make the portal a neutral full-viewport container with no transforms or
        // positioning that could create a new containing block for fixed children.
        el.style.position = "fixed";
        el.style.left = "0";
        el.style.top = "0";
        el.style.width = "100%";
        el.style.height = "100%";
        el.style.zIndex = String(2147483647);
        // do not intercept pointer events on the portal itself; the widget will
        // enable pointer-events where needed.
        el.style.pointerEvents = "none";
        document.body.appendChild(el);
      }
      portalElRef.current = el;
      return () => {
        // only remove the portal if this hook created it
        if (created && portalElRef.current) {
          try { document.body.removeChild(portalElRef.current); } catch {};
          portalElRef.current = null;
        }
      };
    }, []);
  // clear close timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
    };
  }, []);

  // Update audio src when current changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (current === null) {
      audio.pause();
      audio.src = "";
      setPlaying(false);
      return;
    }

    audio.src = encodeURI(tracks[current].src);
    audio.load();
    if (playing) audio.play().catch(() => setPlaying(false));
  }, [current]);

  // Play/pause handling
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) audio.play().catch(() => setPlaying(false));
    else audio.pause();
  }, [playing]);

  function handleSelect(index: number) {
    const wasPlaying = playing;
    if (current === index) {
      // same track -> toggle play/pause
      setPlaying((p) => !p);
    } else {
      // change track. If player was playing, continue playing new track. If paused, just select.
      setCurrent(index);
      setPlaying(wasPlaying);
    }
  }

  const widget = (
    <div
      className="music-widget"
      onMouseEnter={() => {
        // cancel any pending close timeout and open immediately
        if (closeTimeoutRef.current) {
          window.clearTimeout(closeTimeoutRef.current);
          closeTimeoutRef.current = null;
        }
        setOpen(true);
      }}
      onMouseLeave={() => {
        // delay closing so small mouse slips don't immediately hide the panel
        if (closeTimeoutRef.current) {
          window.clearTimeout(closeTimeoutRef.current);
        }
        closeTimeoutRef.current = window.setTimeout(() => {
          setOpen(false);
          closeTimeoutRef.current = null;
        }, 300);
      }}
    >
      <button
        type="button"
        className={`music-icon ${playing ? "playing" : ""}`}
        onClick={() => {
          // Primary click toggles play/pause. If no track selected, start first track.
          if (current === null) {
            setCurrent(0);
            setPlaying(true);
          } else {
            setPlaying((p) => !p);
          }
        }}
        aria-label={playing ? "Pause music" : "Play music"}
      >
        <div className="music-halo" />
        <Image src="/music/headphone.svg" alt="music" width={48} height={48} />
        <div className="music-badge">Music</div>
      </button>

  {/* playlist panel anchored to the icon (opens above and slightly left) */}
  <div className={`music-panel ${open ? "open" : ""}`}>
        <ElectricBorder color="#7df9ff" speed={1} chaos={0.5} thickness={2} style={{ borderRadius: 16 }}>
          <div role="region" aria-label="Playlist" style={{ padding: 12, minWidth: 260 }}>
            <div className="music-header">Playlist</div>
            <ul className="music-list">
              {tracks.map((t, i) => (
                <li key={t.id} className={`music-item ${current === i ? "current" : ""}`}>
                  <button type="button" className="music-item-btn" onClick={() => handleSelect(i)}>
                    <span className="music-title">{t.title}</span>
                    <span className="music-action">{current === i && playing ? "Playing" : "Play"}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </ElectricBorder>
      </div>

      <audio ref={audioRef} />
    </div>
  );

  if (!mounted || !portalElRef.current) return null; // don't render inline to avoid footer placement
  return createPortal(widget, portalElRef.current);
}
