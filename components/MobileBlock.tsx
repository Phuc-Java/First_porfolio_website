/* eslint-disable */
"use client";

import React from "react";

// MobileBlock is intentionally disabled. The site uses a dedicated
// `/mobile-not-supported` page for mobile visitors. Keep this component
// in the tree for future use, but return null so it does not render.
export default function MobileBlock(): React.ReactElement | null {
  return null;
}
