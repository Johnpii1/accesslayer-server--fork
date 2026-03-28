import { CreatorProfile } from '../../types/profile.types';
import type { OffsetPaginationMeta } from '../../utils/pagination.utils';
import type { PublicCreatorListEnvelope } from './public-creator-list-envelope.utils';
import {
   CreatorListItem,
   mapCreatorListItem,
} from './creator-list-item.mapper';

/**
 * Creator summary shape for list responses.
 *
 * Keeps full profile fields out of the list serializer to reduce payload size.
 * Only includes essential information needed for creator listings.
 */
export interface CreatorSummary {
   id: string;
   handle: string;
   displayName: string;
   avatarUrl?: string;
   isVerified: boolean;
}

/**
 * Serializes a full CreatorProfile into a CreatorSummary for list responses.
 *
 * Centralizes list serialization logic and keeps it reusable across endpoints.
 *
 * @param profile - Full creator profile from database
 * @returns Creator summary suitable for list responses
 *
 * @example
 * const summary = serializeCreatorSummary(creatorProfile);
 * // Returns: { id, handle, displayName, avatarUrl, isVerified }
 */
export function serializeCreatorSummary(
   profile: CreatorProfile
): CreatorSummary {
   return {
      id: profile.id,
      handle: profile.handle,
      displayName: profile.displayName,
      avatarUrl: profile.avatarUrl,
      isVerified: profile.isVerified,
   };
}

/**
 * Serializes multiple creator profiles for list responses.
 *
 * @param profiles - Array of full creator profiles
 * @returns Array of creator summaries
 */
export function serializeCreatorList(
   profiles: CreatorProfile[]
): CreatorListItem[] {
   return profiles.map(mapCreatorListItem);
}

/**
 * Paginated creator list response body (offset pagination metadata).
 */
export type CreatorListResponse = PublicCreatorListEnvelope<
   CreatorListItem,
   OffsetPaginationMeta
>;
