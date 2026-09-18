// Synced from TireTrack-App — canonical source lives there.
// Run `npm run sync:domain` after changing it in the app. Do not edit here.

// OEM vehicle catalog — make, model, tire specs, tread thresholds.
// tireConfig references a key in tirePositions.POSITION_CONFIGS.
// treadDepthNew_mm is typical new tread; treadDepthMin_mm triggers a REPLACE flag.

export const VEHICLE_TYPES = {

  // ═══════════════════════════════════════════════════════════════════════════
  // MINING HAUL TRUCKS  — SIX_DUAL_REAR (2 steer + 4 dual-mounted drive)
  // ═══════════════════════════════════════════════════════════════════════════

  'CAT-797F': {
    make: 'Caterpillar', model: '797F',
    label: 'Haul Truck', category: 'MINING',
    tireConfig: 'SIX_DUAL_REAR',
    tireSize: { front: '59/80R63', rear: '59/80R63' },
    oem_psi: { front: 75, rear: 100 },
    treadDepthNew_mm: 100, treadDepthMin_mm: 25,
    notes: 'World\'s largest haul truck; rear tires weigh ~5.3 t each.',
  },
  'CAT-793F': {
    make: 'Caterpillar', model: '793F',
    label: 'Haul Truck', category: 'MINING',
    tireConfig: 'SIX_DUAL_REAR',
    tireSize: { front: '40.00R57', rear: '40.00R57' },
    oem_psi: { front: 80, rear: 110 },
    treadDepthNew_mm: 80, treadDepthMin_mm: 20,
  },
  'CAT-785D': {
    make: 'Caterpillar', model: '785D',
    label: 'Haul Truck', category: 'MINING',
    tireConfig: 'SIX_DUAL_REAR',
    tireSize: { front: '27.00R49', rear: '27.00R49' },
    oem_psi: { front: 85, rear: 115 },
    treadDepthNew_mm: 70, treadDepthMin_mm: 18,
  },
  'CAT-777G': {
    make: 'Caterpillar', model: '777G',
    label: 'Haul Truck', category: 'MINING',
    tireConfig: 'SIX_DUAL_REAR',
    tireSize: { front: '24.00R35', rear: '24.00R35' },
    oem_psi: { front: 90, rear: 120 },
    treadDepthNew_mm: 65, treadDepthMin_mm: 16,
  },
  'CAT-775G': {
    make: 'Caterpillar', model: '775G',
    label: 'Haul Truck', category: 'MINING',
    tireConfig: 'SIX_DUAL_REAR',
    tireSize: { front: '21.00R33', rear: '21.00R33' },
    oem_psi: { front: 92, rear: 120 },
    treadDepthNew_mm: 58, treadDepthMin_mm: 15,
  },
  'KOM-930E': {
    make: 'Komatsu', model: '930E-5',
    label: 'Haul Truck', category: 'MINING',
    tireConfig: 'SIX_DUAL_REAR',
    tireSize: { front: '56/80R63', rear: '56/80R63' },
    oem_psi: { front: 72, rear: 98 },
    treadDepthNew_mm: 95, treadDepthMin_mm: 24,
  },
  'KOM-830E': {
    make: 'Komatsu', model: '830E-5',
    label: 'Haul Truck', category: 'MINING',
    tireConfig: 'SIX_DUAL_REAR',
    tireSize: { front: '40.00R57', rear: '40.00R57' },
    oem_psi: { front: 82, rear: 112 },
    treadDepthNew_mm: 78, treadDepthMin_mm: 20,
  },
  'KOM-785-8': {
    make: 'Komatsu', model: '785-8',
    label: 'Haul Truck', category: 'MINING',
    tireConfig: 'SIX_DUAL_REAR',
    tireSize: { front: '27.00R49', rear: '27.00R49' },
    oem_psi: { front: 86, rear: 116 },
    treadDepthNew_mm: 68, treadDepthMin_mm: 17,
  },
  'KOM-730E': {
    make: 'Komatsu', model: '730E-8',
    label: 'Haul Truck', category: 'MINING',
    tireConfig: 'SIX_DUAL_REAR',
    tireSize: { front: '21.00R35', rear: '21.00R35' },
    oem_psi: { front: 88, rear: 118 },
    treadDepthNew_mm: 60, treadDepthMin_mm: 15,
  },
  'LIE-T284': {
    make: 'Liebherr', model: 'T 284',
    label: 'Haul Truck', category: 'MINING',
    tireConfig: 'SIX_DUAL_REAR',
    tireSize: { front: '56/80R63', rear: '56/80R63' },
    oem_psi: { front: 74, rear: 100 },
    treadDepthNew_mm: 95, treadDepthMin_mm: 24,
  },
  'LIE-T264': {
    make: 'Liebherr', model: 'T 264',
    label: 'Haul Truck', category: 'MINING',
    tireConfig: 'SIX_DUAL_REAR',
    tireSize: { front: '46/90R57', rear: '46/90R57' },
    oem_psi: { front: 78, rear: 105 },
    treadDepthNew_mm: 90, treadDepthMin_mm: 22,
  },
  'HIT-EH5000': {
    make: 'Hitachi', model: 'EH5000AC-3',
    label: 'Haul Truck', category: 'MINING',
    tireConfig: 'SIX_DUAL_REAR',
    tireSize: { front: '53/80R63', rear: '53/80R63' },
    oem_psi: { front: 74, rear: 100 },
    treadDepthNew_mm: 95, treadDepthMin_mm: 24,
  },
  'HIT-EH4000': {
    make: 'Hitachi', model: 'EH4000AC-3',
    label: 'Haul Truck', category: 'MINING',
    tireConfig: 'SIX_DUAL_REAR',
    tireSize: { front: '40.00R57', rear: '40.00R57' },
    oem_psi: { front: 80, rear: 108 },
    treadDepthNew_mm: 80, treadDepthMin_mm: 20,
  },
  'TER-MT6300': {
    make: 'Terex', model: 'MT 6300',
    label: 'Haul Truck', category: 'MINING',
    tireConfig: 'SIX_DUAL_REAR',
    tireSize: { front: '59/80R63', rear: '59/80R63' },
    oem_psi: { front: 75, rear: 100 },
    treadDepthNew_mm: 100, treadDepthMin_mm: 25,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // WHEEL LOADERS — FOUR_WHEEL
  // ═══════════════════════════════════════════════════════════════════════════

  'CAT-994K': {
    make: 'Caterpillar', model: '994K',
    label: 'Wheel Loader', category: 'MINING',
    tireConfig: 'FOUR_WHEEL',
    tireSize: { front: '45/65-45', rear: '45/65-45' },
    oem_psi: { front: 55, rear: 55 },
    treadDepthNew_mm: 80, treadDepthMin_mm: 20,
  },
  'CAT-992K': {
    make: 'Caterpillar', model: '992K',
    label: 'Wheel Loader', category: 'MINING',
    tireConfig: 'FOUR_WHEEL',
    tireSize: { front: '37.5R33', rear: '37.5R33' },
    oem_psi: { front: 60, rear: 60 },
    treadDepthNew_mm: 75, treadDepthMin_mm: 19,
  },
  'CAT-990K': {
    make: 'Caterpillar', model: '990K',
    label: 'Wheel Loader', category: 'MINING',
    tireConfig: 'FOUR_WHEEL',
    tireSize: { front: '35/65R33', rear: '35/65R33' },
    oem_psi: { front: 62, rear: 62 },
    treadDepthNew_mm: 72, treadDepthMin_mm: 18,
  },
  'CAT-988K': {
    make: 'Caterpillar', model: '988K',
    label: 'Wheel Loader', category: 'CONSTRUCTION',
    tireConfig: 'FOUR_WHEEL',
    tireSize: { front: '29.5R25', rear: '29.5R25' },
    oem_psi: { front: 65, rear: 65 },
    treadDepthNew_mm: 52, treadDepthMin_mm: 13,
  },
  'CAT-980M': {
    make: 'Caterpillar', model: '980M',
    label: 'Wheel Loader', category: 'CONSTRUCTION',
    tireConfig: 'FOUR_WHEEL',
    tireSize: { front: '26.5R25', rear: '26.5R25' },
    oem_psi: { front: 70, rear: 70 },
    treadDepthNew_mm: 48, treadDepthMin_mm: 12,
  },
  'CAT-966M': {
    make: 'Caterpillar', model: '966M',
    label: 'Wheel Loader', category: 'CONSTRUCTION',
    tireConfig: 'FOUR_WHEEL',
    tireSize: { front: '20.5R25', rear: '20.5R25' },
    oem_psi: { front: 72, rear: 72 },
    treadDepthNew_mm: 42, treadDepthMin_mm: 11,
  },
  'CAT-950M': {
    make: 'Caterpillar', model: '950M',
    label: 'Wheel Loader', category: 'CONSTRUCTION',
    tireConfig: 'FOUR_WHEEL',
    tireSize: { front: '20.5R25', rear: '20.5R25' },
    oem_psi: { front: 72, rear: 72 },
    treadDepthNew_mm: 42, treadDepthMin_mm: 11,
  },
  'KOM-WA800': {
    make: 'Komatsu', model: 'WA800-3',
    label: 'Wheel Loader', category: 'MINING',
    tireConfig: 'FOUR_WHEEL',
    tireSize: { front: '45/65R45', rear: '45/65R45' },
    oem_psi: { front: 52, rear: 52 },
    treadDepthNew_mm: 80, treadDepthMin_mm: 20,
  },
  'KOM-WA600': {
    make: 'Komatsu', model: 'WA600-8',
    label: 'Wheel Loader', category: 'MINING',
    tireConfig: 'FOUR_WHEEL',
    tireSize: { front: '29.5R25', rear: '29.5R25' },
    oem_psi: { front: 65, rear: 65 },
    treadDepthNew_mm: 52, treadDepthMin_mm: 13,
  },
  'KOM-WA480': {
    make: 'Komatsu', model: 'WA480-8',
    label: 'Wheel Loader', category: 'CONSTRUCTION',
    tireConfig: 'FOUR_WHEEL',
    tireSize: { front: '23.5R25', rear: '23.5R25' },
    oem_psi: { front: 68, rear: 68 },
    treadDepthNew_mm: 44, treadDepthMin_mm: 11,
  },
  'VOL-L350H': {
    make: 'Volvo', model: 'L350H',
    label: 'Wheel Loader', category: 'MINING',
    tireConfig: 'FOUR_WHEEL',
    tireSize: { front: '29.5R29', rear: '29.5R29' },
    oem_psi: { front: 58, rear: 58 },
    treadDepthNew_mm: 55, treadDepthMin_mm: 14,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MOTOR GRADERS — SIX_TANDEM (2 front steer + 4 rear tandem)
  // ═══════════════════════════════════════════════════════════════════════════

  'CAT-24M': {
    make: 'Caterpillar', model: '24M',
    label: 'Motor Grader', category: 'MINING',
    tireConfig: 'SIX_TANDEM',
    tireSize: { front: '18.00R33', rear: '18.00R33' },
    oem_psi: { front: 65, rear: 75 },
    treadDepthNew_mm: 40, treadDepthMin_mm: 10,
  },
  'CAT-16M3': {
    make: 'Caterpillar', model: '16M3',
    label: 'Motor Grader', category: 'CONSTRUCTION',
    tireConfig: 'SIX_TANDEM',
    tireSize: { front: '17.5R25', rear: '17.5R25' },
    oem_psi: { front: 68, rear: 78 },
    treadDepthNew_mm: 38, treadDepthMin_mm: 10,
  },
  'CAT-14M3': {
    make: 'Caterpillar', model: '14M3',
    label: 'Motor Grader', category: 'CONSTRUCTION',
    tireConfig: 'SIX_TANDEM',
    tireSize: { front: '17.5R25', rear: '17.5R25' },
    oem_psi: { front: 68, rear: 78 },
    treadDepthNew_mm: 38, treadDepthMin_mm: 10,
  },
  'CAT-12M3': {
    make: 'Caterpillar', model: '12M3',
    label: 'Motor Grader', category: 'CONSTRUCTION',
    tireConfig: 'SIX_TANDEM',
    tireSize: { front: '14.00R24', rear: '14.00R24' },
    oem_psi: { front: 70, rear: 80 },
    treadDepthNew_mm: 35, treadDepthMin_mm: 9,
  },
  'KOM-GD825A': {
    make: 'Komatsu', model: 'GD825A-2',
    label: 'Motor Grader', category: 'MINING',
    tireConfig: 'SIX_TANDEM',
    tireSize: { front: '18.00R33', rear: '18.00R33' },
    oem_psi: { front: 65, rear: 75 },
    treadDepthNew_mm: 40, treadDepthMin_mm: 10,
  },
  'KOM-GD655': {
    make: 'Komatsu', model: 'GD655-5',
    label: 'Motor Grader', category: 'CONSTRUCTION',
    tireConfig: 'SIX_TANDEM',
    tireSize: { front: '14.00R24', rear: '14.00R24' },
    oem_psi: { front: 70, rear: 80 },
    treadDepthNew_mm: 35, treadDepthMin_mm: 9,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ARTICULATED DUMP TRUCKS — SIX_TANDEM (2 front + 4 rear tandem)
  // ═══════════════════════════════════════════════════════════════════════════

  'CAT-745': {
    make: 'Caterpillar', model: '745',
    label: 'Articulated Dump Truck', category: 'CONSTRUCTION',
    tireConfig: 'SIX_TANDEM',
    tireSize: { front: '750/65R25', rear: '750/65R25' },
    oem_psi: { front: 75, rear: 82 },
    treadDepthNew_mm: 45, treadDepthMin_mm: 11,
  },
  'CAT-740GC': {
    make: 'Caterpillar', model: '740 GC',
    label: 'Articulated Dump Truck', category: 'CONSTRUCTION',
    tireConfig: 'SIX_TANDEM',
    tireSize: { front: '750/65R25', rear: '750/65R25' },
    oem_psi: { front: 75, rear: 82 },
    treadDepthNew_mm: 45, treadDepthMin_mm: 11,
  },
  'VOL-A45G': {
    make: 'Volvo', model: 'A45G',
    label: 'Articulated Dump Truck', category: 'CONSTRUCTION',
    tireConfig: 'SIX_TANDEM',
    tireSize: { front: '750/65R25', rear: '750/65R25' },
    oem_psi: { front: 74, rear: 80 },
    treadDepthNew_mm: 44, treadDepthMin_mm: 11,
  },
  'VOL-A40G': {
    make: 'Volvo', model: 'A40G',
    label: 'Articulated Dump Truck', category: 'CONSTRUCTION',
    tireConfig: 'SIX_TANDEM',
    tireSize: { front: '650/65R25', rear: '650/65R25' },
    oem_psi: { front: 76, rear: 84 },
    treadDepthNew_mm: 42, treadDepthMin_mm: 11,
  },
  'VOL-A30G': {
    make: 'Volvo', model: 'A30G',
    label: 'Articulated Dump Truck', category: 'CONSTRUCTION',
    tireConfig: 'SIX_TANDEM',
    tireSize: { front: '600/65R25', rear: '600/65R25' },
    oem_psi: { front: 78, rear: 86 },
    treadDepthNew_mm: 40, treadDepthMin_mm: 10,
  },
  'BEL-B45E': {
    make: 'Bell', model: 'B45E',
    label: 'Articulated Dump Truck', category: 'CONSTRUCTION',
    tireConfig: 'SIX_TANDEM',
    tireSize: { front: '750/65R25', rear: '750/65R25' },
    oem_psi: { front: 74, rear: 82 },
    treadDepthNew_mm: 45, treadDepthMin_mm: 11,
  },
  'BEL-B40E': {
    make: 'Bell', model: 'B40E',
    label: 'Articulated Dump Truck', category: 'CONSTRUCTION',
    tireConfig: 'SIX_TANDEM',
    tireSize: { front: '650/65R25', rear: '650/65R25' },
    oem_psi: { front: 76, rear: 84 },
    treadDepthNew_mm: 42, treadDepthMin_mm: 11,
  },
  'KOM-HM400': {
    make: 'Komatsu', model: 'HM400-5',
    label: 'Articulated Dump Truck', category: 'CONSTRUCTION',
    tireConfig: 'SIX_TANDEM',
    tireSize: { front: '750/65R25', rear: '750/65R25' },
    oem_psi: { front: 75, rear: 82 },
    treadDepthNew_mm: 45, treadDepthMin_mm: 11,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SCRAPERS — FOUR_WHEEL (2 steer front + 2 drive rear on tractor unit)
  // ═══════════════════════════════════════════════════════════════════════════

  'CAT-657G': {
    make: 'Caterpillar', model: '657G',
    label: 'Scraper', category: 'CONSTRUCTION',
    tireConfig: 'FOUR_WHEEL',
    tireSize: { front: '26.5R25', rear: '26.5R25' },
    oem_psi: { front: 68, rear: 75 },
    treadDepthNew_mm: 50, treadDepthMin_mm: 13,
    notes: 'Push-pull twin engine; rear tractor also has 2 tires for 6 total when combined.',
  },
  'CAT-637K': {
    make: 'Caterpillar', model: '637K',
    label: 'Scraper', category: 'CONSTRUCTION',
    tireConfig: 'FOUR_WHEEL',
    tireSize: { front: '26.5R25', rear: '26.5R25' },
    oem_psi: { front: 68, rear: 75 },
    treadDepthNew_mm: 50, treadDepthMin_mm: 13,
  },
  'CAT-621K': {
    make: 'Caterpillar', model: '621K',
    label: 'Scraper', category: 'CONSTRUCTION',
    tireConfig: 'FOUR_WHEEL',
    tireSize: { front: '23.5R25', rear: '23.5R25' },
    oem_psi: { front: 70, rear: 78 },
    treadDepthNew_mm: 46, treadDepthMin_mm: 12,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HIGHWAY SEMI-TRUCKS — EIGHTEEN_SEMI (2 steer + 8 drive + 8 trailer)
  // ═══════════════════════════════════════════════════════════════════════════

  'FRT-CASC': {
    make: 'Freightliner', model: 'Cascadia 126',
    label: 'Semi-Truck', category: 'HIGHWAY',
    tireConfig: 'EIGHTEEN_SEMI',
    tireSize: { steer: '295/75R22.5', drive: '295/75R22.5', trailer: '295/75R22.5' },
    oem_psi: { steer: 110, drive: 100, trailer: 100 },
    treadDepthNew_mm: 23, treadDepthMin_mm: 4,
    notes: 'Steer minimum 4/32"; drive & trailer minimum 2/32" (US DOT).',
  },
  'KW-T680': {
    make: 'Kenworth', model: 'T680',
    label: 'Semi-Truck', category: 'HIGHWAY',
    tireConfig: 'EIGHTEEN_SEMI',
    tireSize: { steer: '295/75R22.5', drive: '295/75R22.5', trailer: '295/75R22.5' },
    oem_psi: { steer: 110, drive: 100, trailer: 100 },
    treadDepthNew_mm: 23, treadDepthMin_mm: 4,
  },
  'PBL-389': {
    make: 'Peterbilt', model: '389',
    label: 'Semi-Truck', category: 'HIGHWAY',
    tireConfig: 'EIGHTEEN_SEMI',
    tireSize: { steer: '315/80R22.5', drive: '295/75R22.5', trailer: '295/75R22.5' },
    oem_psi: { steer: 110, drive: 100, trailer: 100 },
    treadDepthNew_mm: 23, treadDepthMin_mm: 4,
  },
  'MK-ANTHEM': {
    make: 'Mack', model: 'Anthem',
    label: 'Semi-Truck', category: 'HIGHWAY',
    tireConfig: 'EIGHTEEN_SEMI',
    tireSize: { steer: '295/75R22.5', drive: '295/75R22.5', trailer: '295/75R22.5' },
    oem_psi: { steer: 110, drive: 100, trailer: 100 },
    treadDepthNew_mm: 23, treadDepthMin_mm: 4,
  },
  'INT-LT': {
    make: 'International', model: 'LT Series',
    label: 'Semi-Truck', category: 'HIGHWAY',
    tireConfig: 'EIGHTEEN_SEMI',
    tireSize: { steer: '295/75R22.5', drive: '295/75R22.5', trailer: '295/75R22.5' },
    oem_psi: { steer: 110, drive: 100, trailer: 100 },
    treadDepthNew_mm: 23, treadDepthMin_mm: 4,
  },
  'VOL-VNL': {
    make: 'Volvo', model: 'VNL 860',
    label: 'Semi-Truck', category: 'HIGHWAY',
    tireConfig: 'EIGHTEEN_SEMI',
    tireSize: { steer: '295/75R22.5', drive: '295/75R22.5', trailer: '295/75R22.5' },
    oem_psi: { steer: 110, drive: 100, trailer: 100 },
    treadDepthNew_mm: 23, treadDepthMin_mm: 4,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MEDIUM-DUTY TRUCKS — SIX_DUAL_REAR (2 steer + 4 dual rear)
  // ═══════════════════════════════════════════════════════════════════════════

  'F-650': {
    make: 'Ford', model: 'F-650 Super Duty',
    label: 'Medium Duty Truck', category: 'HIGHWAY',
    tireConfig: 'SIX_DUAL_REAR',
    tireSize: { front: 'LT245/75R17', rear: 'LT245/75R17' },
    oem_psi: { front: 80, rear: 80 },
    treadDepthNew_mm: 12, treadDepthMin_mm: 3,
  },
  'F-750': {
    make: 'Ford', model: 'F-750 Super Duty',
    label: 'Medium Duty Truck', category: 'HIGHWAY',
    tireConfig: 'SIX_DUAL_REAR',
    tireSize: { front: '235/85R16', rear: '235/85R16' },
    oem_psi: { front: 85, rear: 85 },
    treadDepthNew_mm: 14, treadDepthMin_mm: 3,
  },
  'RAM-4500': {
    make: 'Ram', model: '4500 Chassis Cab',
    label: 'Medium Duty Truck', category: 'HIGHWAY',
    tireConfig: 'SIX_DUAL_REAR',
    tireSize: { front: 'LT245/70R19.5', rear: 'LT245/70R19.5' },
    oem_psi: { front: 80, rear: 80 },
    treadDepthNew_mm: 12, treadDepthMin_mm: 3,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PICKUP TRUCKS / LIGHT VEHICLES — FOUR_WHEEL
  // ═══════════════════════════════════════════════════════════════════════════

  'F-250': {
    make: 'Ford', model: 'F-250 Super Duty',
    label: 'Pickup Truck', category: 'LIGHT',
    tireConfig: 'FOUR_WHEEL',
    tireSize: { front: 'LT275/70R18', rear: 'LT275/70R18' },
    oem_psi: { front: 50, rear: 65 },
    treadDepthNew_mm: 11, treadDepthMin_mm: 2,
  },
  'F-350-DRW': {
    make: 'Ford', model: 'F-350 Dual Rear Wheel',
    label: 'Pickup Truck (DRW)', category: 'LIGHT',
    tireConfig: 'SIX_DUAL_REAR',
    tireSize: { front: 'LT225/75R17', rear: 'LT225/75R17' },
    oem_psi: { front: 55, rear: 65 },
    treadDepthNew_mm: 11, treadDepthMin_mm: 2,
  },
  'RAM-2500': {
    make: 'Ram', model: '2500 Heavy Duty',
    label: 'Pickup Truck', category: 'LIGHT',
    tireConfig: 'FOUR_WHEEL',
    tireSize: { front: 'LT275/70R18', rear: 'LT275/70R18' },
    oem_psi: { front: 50, rear: 65 },
    treadDepthNew_mm: 11, treadDepthMin_mm: 2,
  },
  'CHEV-2500HD': {
    make: 'Chevrolet', model: 'Silverado 2500HD',
    label: 'Pickup Truck', category: 'LIGHT',
    tireConfig: 'FOUR_WHEEL',
    tireSize: { front: 'LT265/70R18', rear: 'LT265/70R18' },
    oem_psi: { front: 50, rear: 65 },
    treadDepthNew_mm: 11, treadDepthMin_mm: 2,
  },
  'TOYOTA-TUNDRA': {
    make: 'Toyota', model: 'Tundra TRD Pro',
    label: 'Pickup Truck', category: 'LIGHT',
    tireConfig: 'FOUR_WHEEL',
    tireSize: { front: 'P275/65R18', rear: 'P275/65R18' },
    oem_psi: { front: 36, rear: 36 },
    treadDepthNew_mm: 10, treadDepthMin_mm: 2,
  },
  'LAND-CRUISER': {
    make: 'Toyota', model: 'Land Cruiser 300',
    label: 'SUV', category: 'LIGHT',
    tireConfig: 'FOUR_WHEEL',
    tireSize: { front: '285/60R18', rear: '285/60R18' },
    oem_psi: { front: 38, rear: 38 },
    treadDepthNew_mm: 10, treadDepthMin_mm: 2,
  },
  'NISSAN-PATROL': {
    make: 'Nissan', model: 'Patrol Y62',
    label: 'SUV', category: 'LIGHT',
    tireConfig: 'FOUR_WHEEL',
    tireSize: { front: '285/60R18', rear: '285/60R18' },
    oem_psi: { front: 36, rear: 36 },
    treadDepthNew_mm: 10, treadDepthMin_mm: 2,
  },
  'DEF-110': {
    make: 'Land Rover', model: 'Defender 110',
    label: 'SUV', category: 'LIGHT',
    tireConfig: 'FOUR_WHEEL',
    tireSize: { front: '265/65R18', rear: '265/65R18' },
    oem_psi: { front: 36, rear: 38 },
    treadDepthNew_mm: 10, treadDepthMin_mm: 2,
  },
  'HILUX': {
    make: 'Toyota', model: 'HiLux Rugged X',
    label: 'Pickup Truck', category: 'LIGHT',
    tireConfig: 'FOUR_WHEEL',
    tireSize: { front: '265/65R17', rear: '265/65R17' },
    oem_psi: { front: 38, rear: 42 },
    treadDepthNew_mm: 10, treadDepthMin_mm: 2,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // FORKLIFTS — FOUR_WHEEL
  // ═══════════════════════════════════════════════════════════════════════════

  'CAT-DP100': {
    make: 'Caterpillar', model: 'DP100N',
    label: 'Forklift', category: 'INDUSTRIAL',
    tireConfig: 'FOUR_WHEEL',
    tireSize: { front: '18×7-8', rear: '18×7-8' },
    oem_psi: { front: 130, rear: 100 },
    treadDepthNew_mm: 18, treadDepthMin_mm: 4,
    notes: 'Solid pneumatic; check for chunking and flat-spotting.',
  },
  'TOYOTA-8FGU': {
    make: 'Toyota', model: '8FGU30',
    label: 'Forklift', category: 'INDUSTRIAL',
    tireConfig: 'FOUR_WHEEL',
    tireSize: { front: '28×9-15', rear: '21×8-9' },
    oem_psi: { front: 125, rear: 100 },
    treadDepthNew_mm: 16, treadDepthMin_mm: 4,
  },
  'CROWN-FC5200': {
    make: 'Crown', model: 'FC 5200',
    label: 'Reach Truck / Forklift', category: 'INDUSTRIAL',
    tireConfig: 'FOUR_WHEEL',
    tireSize: { front: '18×6-12.125', rear: '15×4.5-8' },
    oem_psi: { front: 0, rear: 0 },
    treadDepthNew_mm: 14, treadDepthMin_mm: 4,
    notes: 'Solid polyurethane tires — PSI N/A. Inspect for wear line.',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // BUSES — SIX_DUAL_REAR (2 steer + 4 dual-mounted tag/drive)
  // ═══════════════════════════════════════════════════════════════════════════

  'VOLVO-B12M': {
    make: 'Volvo', model: 'B12M Coach',
    label: 'Coach Bus', category: 'TRANSIT',
    tireConfig: 'SIX_DUAL_REAR',
    tireSize: { front: '315/80R22.5', rear: '315/80R22.5' },
    oem_psi: { front: 120, rear: 100 },
    treadDepthNew_mm: 22, treadDepthMin_mm: 4,
  },
  'MAN-LION': {
    make: 'MAN', model: "Lion's Coach",
    label: 'Coach Bus', category: 'TRANSIT',
    tireConfig: 'SIX_DUAL_REAR',
    tireSize: { front: '295/80R22.5', rear: '295/80R22.5' },
    oem_psi: { front: 115, rear: 100 },
    treadDepthNew_mm: 22, treadDepthMin_mm: 4,
  },
  'MINE-BUS': {
    make: 'Various', model: 'Personnel Carrier',
    label: 'Mine Personnel Bus', category: 'MINING',
    tireConfig: 'SIX_DUAL_REAR',
    tireSize: { front: '295/80R22.5', rear: '295/80R22.5' },
    oem_psi: { front: 110, rear: 100 },
    treadDepthNew_mm: 22, treadDepthMin_mm: 4,
    notes: 'Verify actual vehicle spec — wide variation by supplier.',
  },
};
