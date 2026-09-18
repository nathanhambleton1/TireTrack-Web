// Synced from TireTrack-App — canonical source lives there.
// Run `npm run sync:domain` after changing it in the app. Do not edit here.

// Estimated per-tire replacement cost in USD, derived from tire size class.
// These are conservative industry averages used to drive cost analytics in
// reports. They can be overridden per equipment by setting
// `equipment.averageCostPerTire` on a FLEET_DISPLAY entry, or per inspection
// by attaching a `costOverridesUSD` map to the inspection.
//
// Last reviewed: 2026. Tweak freely as procurement data becomes available.

const SIZE_TIERS = [
  // ── Ultra-class haul (CAT 797F / Komatsu 930E / Liebherr T 284 class) ───
  { test: /(^|[^0-9])(59\/80R63|56\/80R63|53\/80R63)/i, cost: 42000 },

  // ── Large mining haul / largest wheel loaders ────────────────────────────
  { test: /(46\/90R57|45\/65R45|45\/65-45)/i, cost: 28000 },

  // ── Mid mining haul / large WL ──────────────────────────────────────────
  { test: /(40\.00R57|37\.5R33|35\/65R33)/i, cost: 22000 },

  // ── Rigid haul mid-size ─────────────────────────────────────────────────
  { test: /(27\.00R49|29\.5R29)/i, cost: 9500 },
  { test: /(24\.00R35|21\.00R35|21\.00R33)/i, cost: 6800 },

  // ── Heavy ADT / scraper / 4-yard WL ─────────────────────────────────────
  { test: /(750\/65R25|29\.5R25)/i, cost: 5500 },
  { test: /(650\/65R25|26\.5R25)/i, cost: 4400 },
  { test: /(600\/65R25|23\.5R25|20\.5R25)/i, cost: 3200 },

  // ── Motor grader / smaller ADT ─────────────────────────────────────────
  { test: /(18\.00R33|17\.5R25)/i, cost: 2600 },
  { test: /(14\.00R24|14\.00R25)/i, cost: 1800 },

  // ── Class 8 highway / semi / fuel tankers ──────────────────────────────
  { test: /(11R22\.5|11R24\.5|285\/75R24\.5|295\/75R22\.5|275\/80R22\.5)/i, cost: 580 },

  // ── Medium duty service trucks ─────────────────────────────────────────
  { test: /(225\/70R19\.5|245\/70R19\.5|19\.5)/i, cost: 420 },

  // ── Light truck / SUV ──────────────────────────────────────────────────
  { test: /(LT.+R(16|17|18|20)|265\/70R17|275\/65R18|285\/75R16)/i, cost: 320 },

  // ── Forklift cushion/pneumatic ─────────────────────────────────────────
  { test: /(7\.00-15|250-15|6\.50-10|200\/50-10|18x7-8)/i, cost: 280 },
];

const CATEGORY_FALLBACK = {
  MINING: 18000,
  CONSTRUCTION: 4500,
  HIGHWAY: 580,
  HEAVY_DUTY: 580,
  MEDIUM_DUTY: 420,
  LIGHT: 320,
  MATERIAL_HANDLING: 280,
};

// Tire labor + casing + disposal markup applied to base cost when computing
// estimated total replacement cost for a tire. Keeps the math conservative.
export const LABOR_MULTIPLIER = 1.12;

export function estimatePerTireCostUSD(equipment) {
  if (!equipment) return 0;

  // Explicit override on the fleet entry wins.
  if (typeof equipment.averageCostPerTire === 'number') {
    return equipment.averageCostPerTire;
  }

  const sizes = [equipment.tireSize?.front, equipment.tireSize?.rear].filter(Boolean);
  for (const size of sizes) {
    for (const tier of SIZE_TIERS) {
      if (tier.test.test(size)) return tier.cost;
    }
  }

  return CATEGORY_FALLBACK[equipment.category] ?? 600;
}

export function estimateInstalledTireCostUSD(equipment) {
  return Math.round(estimatePerTireCostUSD(equipment) * LABOR_MULTIPLIER);
}

export function formatUSD(value, { compact = false } = {}) {
  if (value == null || Number.isNaN(value)) return '$0';
  if (compact && Math.abs(value) >= 1000) {
    if (Math.abs(value) >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
    return `$${(value / 1000).toFixed(value >= 10_000 ? 0 : 1)}K`;
  }
  return `$${Math.round(value).toLocaleString('en-US')}`;
}
