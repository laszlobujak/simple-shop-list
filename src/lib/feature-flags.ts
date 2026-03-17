import { env } from '@/env.mjs';

/**
 * Feature flags for conditionally enabling/disabling features in the application.
 * These are controlled via environment variables and can be toggled per environment.
 */

/**
 * Check if the marketplace feature is enabled.
 * Controlled by NEXT_PUBLIC_ENABLE_MARKETPLACE environment variable.
 * 
 * @returns {boolean} true if marketplace is enabled, false otherwise
 */
export function isMarketplaceEnabled(): boolean {
  return env.NEXT_PUBLIC_ENABLE_MARKETPLACE;
}

/**
 * Check if the AI appraisal feature is enabled.
 * Controlled by NEXT_PUBLIC_ENABLE_AI_APPRAISAL environment variable.
 *
 * @returns {boolean} true if AI appraisal is enabled, false otherwise
 */
export function isAIAppraisalEnabled(): boolean {
  return env.NEXT_PUBLIC_ENABLE_AI_APPRAISAL;
}
