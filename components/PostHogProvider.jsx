'use client';

import { useEffect } from 'react';
import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';

// Analytics is opt-in via env: without a key, this is a no-op wrapper so
// local dev and forks never send events.
const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com';

export function PostHogProvider({ children }) {
  useEffect(() => {
    if (!KEY || posthog.__loaded) return;
    posthog.init(KEY, {
      api_host: HOST,
      // Pins SDK behaviour to this release's defaults (SPA pageviews via
      // history_change, identified-only person profiles).
      defaults: '2026-05-30',
    });
  }, []);

  if (!KEY) return children;

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
