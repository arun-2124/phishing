/**
 * PhishGuard API Configuration
 * Supports environment-based backend routing for Vercel production
 * and transparent local development proxy fallback.
 */

const rawApiUrl = (import.meta.env.VITE_API_URL || '').trim();

// Ensure no trailing slash so path concatenation is clean
export const API_BASE_URL = rawApiUrl.replace(/\/+$/, '');

export const API_ENDPOINTS = {
  HEALTH: `${API_BASE_URL}/api/health`,
  ANALYZE: `${API_BASE_URL}/api/analyze`,
  SAMPLES: `${API_BASE_URL}/api/samples`,
};
