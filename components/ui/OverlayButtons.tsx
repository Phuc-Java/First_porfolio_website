"use client";

import React from "react";
import { HoverBorderGradient } from "./hover-border-gradient";

export function SkipButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <HoverBorderGradient containerClassName="rounded-md cursor-target" as="button" {...props}>
      <span className={`overlay-skip-content ${props.className || ""}`} style={{ padding: '8px 14px', fontWeight: 600 }}>
        {props.children || "Skip"}
      </span>
    </HoverBorderGradient>
  );
}

// DismissButton removed — kept file to expose SkipButton for discoverability
