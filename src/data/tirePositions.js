// Synced from TireTrack-App — canonical source lives there.
// Run `npm run sync:domain` after changing it in the app. Do not edit here.

// Inspection order and full label for every tire-count configuration.
// The `positions` array defines the walk-around inspection route.

export const POSITION_CONFIGS = {
  // ─── Standard 4-wheel ────────────────────────────────────────────────────────
  FOUR_WHEEL: {
    tireCount: 4,
    positions: ['FL', 'FR', 'RR', 'RL'],
    labels: {
      FL: 'FRONT LEFT',
      FR: 'FRONT RIGHT',
      RR: 'REAR RIGHT',
      RL: 'REAR LEFT',
    },
  },

  // ─── 6-wheel: 2 steer + 4 drive (dual-mounted rear) ─────────────────────────
  // Used by: mining haul trucks, medium/heavy highway trucks, some dump trucks
  SIX_DUAL_REAR: {
    tireCount: 6,
    positions: ['FL', 'FR', 'RRO', 'RRI', 'RLI', 'RLO'],
    labels: {
      FL: 'FRONT LEFT',
      FR: 'FRONT RIGHT',
      RRO: 'REAR RIGHT OUTER',
      RRI: 'REAR RIGHT INNER',
      RLI: 'REAR LEFT INNER',
      RLO: 'REAR LEFT OUTER',
    },
  },

  // ─── 6-wheel: 2 steer + 2×2 tandem rear (single-mounted) ────────────────────
  // Used by: motor graders, articulated dump trucks
  SIX_TANDEM: {
    tireCount: 6,
    positions: ['FL', 'FR', 'R1L', 'R1R', 'R2L', 'R2R'],
    labels: {
      FL: 'FRONT LEFT',
      FR: 'FRONT RIGHT',
      R1L: 'REAR AXLE 1 LEFT',
      R1R: 'REAR AXLE 1 RIGHT',
      R2L: 'REAR AXLE 2 LEFT',
      R2R: 'REAR AXLE 2 RIGHT',
    },
  },

  // ─── 10-wheel: 2 steer + dual tandem rear ────────────────────────────────────
  // Used by: super-dump trucks, some heavy-haul prime movers
  TEN_DUAL_TANDEM: {
    tireCount: 10,
    positions: ['FL', 'FR', 'R1LO', 'R1LI', 'R1RI', 'R1RO', 'R2LO', 'R2LI', 'R2RI', 'R2RO'],
    labels: {
      FL: 'FRONT LEFT',
      FR: 'FRONT RIGHT',
      R1LO: 'AXLE 1 LEFT OUTER',
      R1LI: 'AXLE 1 LEFT INNER',
      R1RI: 'AXLE 1 RIGHT INNER',
      R1RO: 'AXLE 1 RIGHT OUTER',
      R2LO: 'AXLE 2 LEFT OUTER',
      R2LI: 'AXLE 2 LEFT INNER',
      R2RI: 'AXLE 2 RIGHT INNER',
      R2RO: 'AXLE 2 RIGHT OUTER',
    },
  },

  // ─── 18-wheel semi: 2 steer + 8 drive + 8 trailer ───────────────────────────
  // Freightliner Cascadia, Kenworth T680, Peterbilt 389, etc.
  EIGHTEEN_SEMI: {
    tireCount: 18,
    positions: [
      'FL', 'FR',
      'D1LO', 'D1LI', 'D1RI', 'D1RO',
      'D2LO', 'D2LI', 'D2RI', 'D2RO',
      'T1LO', 'T1LI', 'T1RI', 'T1RO',
      'T2LO', 'T2LI', 'T2RI', 'T2RO',
    ],
    labels: {
      FL: 'STEER LEFT',
      FR: 'STEER RIGHT',
      D1LO: 'DRIVE 1 LEFT OUTER',
      D1LI: 'DRIVE 1 LEFT INNER',
      D1RI: 'DRIVE 1 RIGHT INNER',
      D1RO: 'DRIVE 1 RIGHT OUTER',
      D2LO: 'DRIVE 2 LEFT OUTER',
      D2LI: 'DRIVE 2 LEFT INNER',
      D2RI: 'DRIVE 2 RIGHT INNER',
      D2RO: 'DRIVE 2 RIGHT OUTER',
      T1LO: 'TRAILER 1 LEFT OUTER',
      T1LI: 'TRAILER 1 LEFT INNER',
      T1RI: 'TRAILER 1 RIGHT INNER',
      T1RO: 'TRAILER 1 RIGHT OUTER',
      T2LO: 'TRAILER 2 LEFT OUTER',
      T2LI: 'TRAILER 2 LEFT INNER',
      T2RI: 'TRAILER 2 RIGHT INNER',
      T2RO: 'TRAILER 2 RIGHT OUTER',
    },
  },
};
