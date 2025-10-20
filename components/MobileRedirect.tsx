/* eslint-disable */
"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function MobileRedirect() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    function checkAndRedirect() {
      try {
        const w = window.innerWidth;
        if (w < 1200 && pathname !== "/mobile-not-supported") {
          // replace so back doesn't return user to blocked page
          router.replace("/mobile-not-supported");
        }
      } catch (e) {
        // ignore
      }
    }

    checkAndRedirect();
    window.addEventListener("resize", checkAndRedirect);
    return () => window.removeEventListener("resize", checkAndRedirect);
  }, [pathname, router]);

  return null;
}
