/**
 * Simple in-memory rate limiter
 * Tracks requests per IP with a sliding window
 */

interface RateLimitEntry {
  timestamps: number[];
}

const store = new Map<string, RateLimitEntry>();

// Clean up old entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    entry.timestamps = entry.timestamps.filter(
      (t) => now - t < 24 * 60 * 60 * 1000
    );
    if (entry.timestamps.length === 0) store.delete(key);
  }
}, 10 * 60 * 1000);

export function checkRateLimit(
  ip: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = store.get(ip) ?? { timestamps: [] };

  // Remove timestamps outside the window
  entry.timestamps = entry.timestamps.filter((t) => now - t < windowMs);

  if (entry.timestamps.length >= limit) {
    const oldestInWindow = entry.timestamps[0];
    return {
      allowed: false,
      remaining: 0,
      resetAt: oldestInWindow + windowMs,
    };
  }

  entry.timestamps.push(now);
  store.set(ip, entry);

  return {
    allowed: true,
    remaining: limit - entry.timestamps.length,
    resetAt: now + windowMs,
  };
}
