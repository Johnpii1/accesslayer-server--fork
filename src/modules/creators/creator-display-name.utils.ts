/**
 * Normalize creator display names immediately before rendering in public
 * responses. This intentionally does not persist or mutate the source value;
 * storage and validation layers should continue to receive the original input.
 */
export function normalizeCreatorDisplayName(displayName: string): string {
   return displayName.trim().replace(/\s+/g, ' ');
}
