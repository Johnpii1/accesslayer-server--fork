import { strict as assert } from 'assert';
import { normalizeCreatorDisplayName } from './creator-display-name.utils';

function run() {
   assert.equal(
      normalizeCreatorDisplayName('  Alice Creator  '),
      'Alice Creator'
   );
   assert.equal(
      normalizeCreatorDisplayName('Alice   B.\tCreator\nStudio'),
      'Alice B. Creator Studio'
   );
   assert.equal(normalizeCreatorDisplayName('Alice'), 'Alice');

   const storedValue = '  Alice   Creator  ';
   const renderedValue = normalizeCreatorDisplayName(storedValue);

   assert.equal(renderedValue, 'Alice Creator');
   assert.equal(storedValue, '  Alice   Creator  ');

   console.log('creator-display-name.utils tests passed');
}

run();
