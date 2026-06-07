"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const SESSION_KEY = "nv_analytics_session";

function getSessionId() {
  if (typeof window === "undefined") return undefined;
  let sessionId = sessionStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

async function sendEvent(
  event: string,
  page?: string,
  metadata?: Record<string, unknown>
) {
  try {
    await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event,
        page,
        sessionId: getSessionId(),
        metadata,
      }),
    });
  } catch {
    // Analytics should not block UX
  }
}

export function useAnalytics() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || pathname === lastPath.current) return;
    lastPath.current = pathname;
    sendEvent("page_view", pathname);
  }, [pathname]);

  const trackEvent = useCallback(
    (event: string, metadata?: Record<string, unknown>) => {
      sendEvent(event, pathname ?? undefined, metadata);
    },
    [pathname]
  );

  return { trackEvent };
}
