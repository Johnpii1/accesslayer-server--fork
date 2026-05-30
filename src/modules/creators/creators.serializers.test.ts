import { strict as assert } from 'assert';
import { CreatorProfile } from '../../types/profile.types';
import { serializeCreatorSummary } from './creators.serializers';

function run() {
   const sourceDisplayName = '  Alice   Creator  ';
   const profile = {
      id: 'creator-1',
      userId: 'user-1',
      handle: 'alice',
      displayName: sourceDisplayName,
      avatarUrl: undefined,
      isVerified: true,
      createdAt: new Date('2026-01-01T00:00:00.000Z'),
      updatedAt: new Date('2026-01-01T00:00:00.000Z'),
   } satisfies CreatorProfile;

   const summary = serializeCreatorSummary(profile);

   assert.equal(summary.displayName, 'Alice Creator');
   assert.equal(profile.displayName, sourceDisplayName);

   console.log('creators.serializers tests passed');
}

run();
