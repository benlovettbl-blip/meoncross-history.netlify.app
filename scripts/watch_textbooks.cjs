/**
 * scripts/watch_textbooks.cjs
 *
 * Real-Time Continuous SSoT Textbook Synchronization Watcher
 * Watches `units/<unit_id>/data.js` and automatically rebuilds
 * the companion textbook HTML and print-ready PDF upon every save.
 *
 * Usage:
 *   node scripts/watch_textbooks.cjs
 *   npm run textbook:watch
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const UNITS_DIR = path.join(ROOT_DIR, 'units');

console.log('='.repeat(70));
console.log('👀 THE HISTORY REVISION HUB — REAL-TIME TEXTBOOK COMPILATION WATCHER');
console.log('='.repeat(70));
console.log(`Watching curriculum files in: ${UNITS_DIR}\n`);

const debounceTimers = new Map();
const DEBOUNCE_MS = 1200;

function handleFileChange(eventType, filename) {
  if (!filename) return;

  // We only care about data.js files within units/
  const norm = filename.replace(/\\/g, '/');
  if (!norm.endsWith('data.js')) return;

  const parts = norm.split('/');
  // Expected structure: <unit_id>/data.js
  const unitId = parts[0] === 'units' ? parts[1] : parts[0];
  if (!unitId || unitId === 'data.js') return;

  // Clear existing debounce timer
  if (debounceTimers.has(unitId)) {
    clearTimeout(debounceTimers.get(unitId));
  }

  const timer = setTimeout(() => {
    debounceTimers.delete(unitId);
    console.log(`\n[CHANGE DETECTED] ${filename}`);
    console.log(`🚀 Automatically compiling textbook for: [${unitId}]...`);

    try {
      execSync(`node "${path.join(__dirname, 'generate_pure_narrative_textbook.cjs')}" ${unitId}`, {
        stdio: 'inherit',
        cwd: ROOT_DIR,
      });
      console.log(`✅ [${unitId}] Companion Textbook automatically compiled and verified!\n`);
    } catch (err) {
      console.error(`❌ [${unitId}] Compilation error:`, err.message);
    }
  }, DEBOUNCE_MS);

  debounceTimers.set(unitId, timer);
}

try {
  fs.watch(UNITS_DIR, { recursive: true }, handleFileChange);
  console.log(
    '✅ Watcher active. Save any unit data.js to trigger automatic textbook compilation.',
  );
  console.log('Press Ctrl+C to exit.\n');
} catch (err) {
  console.error('Failed to start file watcher:', err.message);
}
