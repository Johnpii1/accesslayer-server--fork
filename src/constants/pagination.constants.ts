// src/constants/pagination.constants.ts
// Shared pagination defaults for list endpoints.
// Import from here to keep defaults consistent and easy to change centrally.

/**
 * Default number of items returned per page.
 */
export const DEFAULT_PAGE_SIZE = 20;

/**
 * Default page index (1-based).
 */
export const DEFAULT_PAGE = 1;

/**
 * Default offset for offset-based pagination.
 */
export const DEFAULT_OFFSET = 0;

/**
 * Maximum allowed page size to prevent oversized queries.
 */
export const MAX_PAGE_SIZE = 100;

/**
 * Minimum allowed page size.
 */
export const MIN_PAGE_SIZE = 1;
