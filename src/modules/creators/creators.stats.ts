// src/modules/creators/creators.stats.ts
// Helper for formatting public creator stats in API responses.

import { CreatorMetrics } from '../../types/profile.types';

/**
 * Public-facing creator stats shape.
 *
 * Keeps the response focused on what clients need for public endpoints.
 * Avoids leaking internal or sensitive metric fields.
 */
export interface PublicCreatorStats {
    holderCount: number;
    totalSupply: number;
    totalVolume: number;
    lastActivityAt?: Date;
}

/**
 * Format a CreatorMetrics object into a public stats response.
 *
 * Centralizes the public stats shape so all creator endpoints
 * return a consistent structure.
 *
 * @param metrics - Internal creator metrics
 * @returns Public stats object safe for API responses
 *
 * @example
 * serializePublicCreatorStats({ holderCount: 10, totalSupply: 100, totalVolume: 500 })
 * // => { holderCount: 10, totalSupply: 100, totalVolume: 500 }
 */
export function serializePublicCreatorStats(
    metrics: CreatorMetrics
): PublicCreatorStats {
    return {
        holderCount: metrics.holderCount,
        totalSupply: metrics.totalSupply,
        totalVolume: metrics.totalVolume,
        ...(metrics.lastActivityAt !== undefined
            ? { lastActivityAt: metrics.lastActivityAt }
            : {}),
    };
}
