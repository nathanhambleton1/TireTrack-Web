// Copies the pure (framework-agnostic) domain modules from TireTrack-App into the
// web app. TireTrack-App is the canonical source for fleet data, tire position
// configs, cost tables and the analytics roll-ups; the web keeps a synced copy so
// the two repos stay independently installable.
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const webRoot = resolve(here, '..');
const appRoot = resolve(webRoot, '..', 'TireTrack-App');

const BANNER =
  '// Synced from TireTrack-App — canonical source lives there.\n' +
  '// Run `npm run sync:domain` after changing it in the app. Do not edit here.\n\n';

const FILES = [
  ['src/data/vehicleTypes.js', 'src/data/vehicleTypes.js'],
  ['src/data/tirePositions.js', 'src/data/tirePositions.js'],
  ['src/data/tireCosts.js', 'src/data/tireCosts.js'],
  ['src/data/fleet.js', 'src/data/fleet.js'],
  ['src/lib/analytics.js', 'src/lib/analytics.js'],
];

if (!existsSync(appRoot)) {
  console.error(`TireTrack-App not found at ${appRoot}. Clone it next to TireTrack-Web.`);
  process.exit(1);
}

for (const [from, to] of FILES) {
  const src = resolve(appRoot, from);
  const dest = resolve(webRoot, to);
  if (!existsSync(src)) {
    console.error(`missing source: ${src}`);
    process.exit(1);
  }
  copyFileSync(src, dest);
  writeFileSync(dest, BANNER + readFileSync(dest, 'utf8'));
  console.log(`synced ${to}`);
}
