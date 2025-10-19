"use client";

import { useRouter } from 'next/navigation';
import { useTransition, useCallback } from 'react';

/**
 * Custom hook for smooth page transitions with loading state
 * Uses React 19's useTransition for optimal performance
 * @returns {Object} - isPending state and navigate function
 */
export function usePageTransition() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const navigate = useCallback(
    (href: string) => {
      startTransition(() => {
        router.push(href);
      });
    },
    [router]
  );

  return { isPending, navigate };
}
