import { CreatorProfile } from '../../types/profile.types';
import { normalizeCreatorDisplayName } from './creator-display-name.utils';

/**
 * Locked output shape for creator list items.
 * Keep this minimal and explicit to avoid leaking internal fields.
 */
export type CreatorListItem = {
   id: string;
   name: string | null;
   avatar: string | null;
   followers: number;
};

/**
 * Pure, dumb mapper from a full `CreatorProfile` to a `CreatorListItem`.
 * No filtering, no business logic — deterministic and predictable.
 */
export const mapCreatorListItem = (
   creator: CreatorProfile
): CreatorListItem => {
   return {
      id: creator.id,
      name: normalizeCreatorDisplayName(creator.displayName),
      avatar: creator.avatarUrl ?? null,
      followers: 0,
   };
};
