"use client";

import { useCallback, useEffect, useState } from "react";

interface UseExitIntentOptions {
  enabled?: boolean;
  sensitivity?: number;
  delayMs?: number;
}

export function useExitIntent({
  enabled = true,
  sensitivity = 20,
  delayMs = 0,
}: UseExitIntentOptions = {}) {
  const [hasTriggered, setHasTriggered] = useState(false);

  const trigger = useCallback(() => {
    if (!enabled || hasTriggered) return;
    setHasTriggered(true);
  }, [enabled, hasTriggered]);

  useEffect(() => {
    if (!enabled || hasTriggered) return;

    let ready = delayMs === 0;
    const readyTimer = delayMs > 0 ? window.setTimeout(() => {
      ready = true;
    }, delayMs) : undefined;

    const handleMouseLeave = (event: MouseEvent) => {
      if (!ready) return;
      if (event.clientY <= sensitivity) {
        trigger();
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (readyTimer) window.clearTimeout(readyTimer);
    };
  }, [enabled, hasTriggered, sensitivity, delayMs, trigger]);

  const reset = useCallback(() => setHasTriggered(false), []);

  return { hasTriggered, trigger, reset };
}
