// Placeholder inspection data for the public demo.
//
// There is no backend. The dashboard has to show something recognisable, so this
// generates a plausible ten months of walkarounds across the real fleet roster.
// The generator is seeded, so every visitor sees the same numbers and a reload
// does not reshuffle the charts.
import { FLEET_DISPLAY } from '../data/fleet';
import { specForPosition } from './specs';

const SITES = ['PIT 4 — NORTH', 'PIT 7 — SOUTH', 'CRUSHER PAD', 'WORKSHOP', 'HAUL ROAD 2'];
const INSPECTORS = ['J. Okafor', 'M. Delgado', 'R. Lindqvist', 'A. Whitfield', 'T. Nakamura'];

// Mulberry32 — small, fast, and deterministic from a single integer seed.
function makeRng(seed) {
  let a = seed >>> 0;
  return function rng() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const pick = (rng, arr) => arr[Math.floor(rng() * arr.length)];
const between = (rng, lo, hi) => lo + rng() * (hi - lo);

function computeDisplayId(iso) {
  const d = new Date(iso);
  const p = (n) => String(n).padStart(2, '0');
  return `TT-${String(d.getFullYear()).slice(-2)}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(
    d.getHours()
  )}${p(d.getMinutes())}${p(d.getSeconds())}`;
}

// Wear is modelled per vehicle rather than per tire: a machine that is due for
// tires tends to be worn all round, which is what makes the "most degraded units"
// list meaningful instead of random noise.
//
// Condition is graded on the share of the *usable* band still left (new depth
// down to the legal minimum), not on raw millimetres — a 6 mm reading is fine on
// a light truck and scrap on a haul truck.
const REPLACE_BELOW = 0.1;
const WATCH_BELOW = 0.3;

function buildResults(rng, equipment, wearFactor) {
  const newMm = equipment.treadDepthNew_mm ?? 30;
  const minMm = equipment.treadDepthMin_mm ?? newMm * 0.25;
  const band = Math.max(1, newMm - minMm);
  const results = {};

  for (const pos of equipment.tirePositions ?? []) {
    // wearFactor 0 = nearly new, 1 = down to the legal minimum.
    const jitter = between(rng, -0.07, 0.07);
    const remaining = Math.max(-0.05, Math.min(1, 1 - wearFactor + jitter));

    const tread = Math.max(1, Math.round((minMm + band * remaining) * 10) / 10);

    let condition = 'OK';
    if (remaining <= REPLACE_BELOW) condition = 'REPLACE';
    else if (remaining <= WATCH_BELOW) condition = 'WATCH';

    const oem = specForPosition(equipment.oem_psi, pos) ?? 100;
    const psi = Math.round(oem * between(rng, 0.88, 1.04));

    results[pos] = { tread, unit: 'mm', psi, condition, hasPhoto: false };
  }
  return results;
}

function worstStatus(results) {
  const values = Object.values(results).map((r) => r.condition);
  if (values.includes('REPLACE')) return 'REPLACE';
  if (values.includes('WATCH')) return 'WATCH';
  return 'OK';
}

function generate() {
  const rng = makeRng(20260918);
  const inspections = [];
  const now = Date.now();
  const DAY = 86_400_000;

  // Give each unit its own wear trajectory so history trends instead of jumping.
  const wearByUnit = new Map(
    FLEET_DISPLAY.map((f) => [f.id, between(rng, 0.05, 1.0)])
  );

  for (let i = 0; i < 40; i += 1) {
    const daysAgo = Math.round(between(rng, 2, 340));
    const createdAt = new Date(now - daysAgo * DAY - Math.round(between(rng, 0, 8)) * 3_600_000);
    const iso = createdAt.toISOString();

    const vehicleCount = 2 + Math.floor(rng() * 5);
    const vehicles = {};
    const used = new Set();

    for (let v = 0; v < vehicleCount; v += 1) {
      const equipment = pick(rng, FLEET_DISPLAY);
      if (used.has(equipment.id)) continue;
      used.add(equipment.id);

      // Older inspections show less wear than recent ones on the same machine.
      const base = wearByUnit.get(equipment.id) ?? 0.3;
      const wearFactor = Math.max(0.02, Math.min(1, base - (daysAgo / 340) * 0.22));
      const results = buildResults(rng, equipment, wearFactor);

      vehicles[equipment.id] = {
        vehicleInspectionId: `demo-vi-${i}-${v}`,
        equipment,
        results,
        completedAt: iso,
        status: worstStatus(results),
      };
    }

    if (Object.keys(vehicles).length === 0) continue;

    inspections.push({
      id: `demo-${i}`,
      displayId: computeDisplayId(iso),
      createdAt: iso,
      site: pick(rng, SITES),
      inspector: pick(rng, INSPECTORS),
      vehicles,
    });
  }

  return inspections.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export const DEMO_INSPECTIONS = generate();
