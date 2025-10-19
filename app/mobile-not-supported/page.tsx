"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Hyperspeed from "@/components/Hyperspeed";
import "@/components/MobileBlock.css";

export default function MobileNotSupported(): React.ReactElement {
  const router = useRouter();

  useEffect(() => {
    // If viewport is desktop size, redirect to home automatically
    if (typeof window !== "undefined" && window.innerWidth >= 1200) {
      router.replace("/");
    }

    function onResize() {
      if (window.innerWidth >= 1200) router.replace("/");
    }

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [router]);

  const effectOptions = {
    onSpeedUp: () => {},
    onSlowDown: () => {},
    distortion: "turbulentDistortion",
    length: 420,
    roadWidth: 12,
    islandWidth: 2,
    lanesPerRoad: 4,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 1.8,
    carLightsFade: 0.35,
    totalSideLightSticks: 16,
    lightPairsPerRoadWay: 36,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [420 * 0.03, 420 * 0.2],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.8, 0.8],
    carFloorSeparation: [0, 5],
    colors: {
      roadColor: 0x04060a,
      islandColor: 0x060709,
      background: 0x000000,
      shoulderLines: 0x29f0d7,
      brokenLines: 0x29f0d7,
      leftCars: [0x9B5CF6, 0x6750A2, 0xC247AC],
      rightCars: [0x03B3C3, 0x0E5EA5, 0x324555],
      sticks: 0x03B3C3,
    },
  };

  return (
    <div className="mobile-block hacker" style={{ position: "fixed", inset: 0 }}>
      <div className="hyperspeed-bg" aria-hidden>
        <Hyperspeed effectOptions={effectOptions as any} />
      </div>

      <div className="mobile-inner" role="dialog" aria-modal="true">
        <div className="top-row">
          <div className="error-icon" aria-hidden>
            {/* Neon glyph */}
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="6" fill="#001015" />
              <path d="M12 7v6" stroke="#29f0d7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="17.5" r="1" fill="#29f0d7" />
            </svg>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="title" style={{ letterSpacing: 0.6 }}>TRUY CẬP BỊ TỪ CHỐI</div>
            <div style={{ fontSize: 12, color: "rgba(183,255,223,0.6)", marginTop: 6 }}>Phiên bản di động không được hỗ trợ</div>
          </div>
        </div>

        <div className="message" style={{ fontSize: 18, marginTop: 8 }}>
          Trang web này chỉ hoạt động đầy đủ trên thiết bị để bàn.
        </div>

        <div className="details" style={{ marginTop: 10 }}>
          Vui lòng mở trang bằng thiết bị desktop để trải nghiệm đầy đủ giao diện và tính năng.
          Làm mới trang này sẽ giữ bạn ở trang thông báo.
        </div>

        <div className="footer" style={{ marginTop: 20 }}>
          <div style={{ fontSize: 13, color: "rgba(183,255,223,0.6)" }}>Nếu bạn cần truy cập (quản trị), liên hệ chủ trang để cấp quyền tạm thời.</div>
        </div>
      </div>
    </div>
  );
}

// MusicWidget is mounted globally in `app/layout.tsx`; do not mount it here to avoid duplicates.
