// Synced from TireTrack-App — canonical source lives there.
// Run `npm run sync:domain` after changing it in the app. Do not edit here.

import { VEHICLE_TYPES } from './vehicleTypes';
import { POSITION_CONFIGS } from './tirePositions';

// Raw fleet roster — add/remove units here.
// id:            Equipment ID shown in the app (must be unique)
// vehicleTypeId: Key into VEHICLE_TYPES
// unit:          Human-readable unit label
// year:          Model year (optional)
const FLEET_RAW = [

  // ─── DUMP TRUCKS (DT) — CAT 797F, 793F · 6 tires ────────────────────────
  { id: 'DT-01', vehicleTypeId: 'CAT-797F', unit: 'Unit #1', year: 2019 },
  { id: 'DT-02', vehicleTypeId: 'CAT-797F', unit: 'Unit #2', year: 2019 },
  { id: 'DT-03', vehicleTypeId: 'CAT-797F', unit: 'Unit #3', year: 2020 },
  { id: 'DT-04', vehicleTypeId: 'CAT-797F', unit: 'Unit #4', year: 2020 }, // original fleet item
  { id: 'DT-05', vehicleTypeId: 'CAT-793F', unit: 'Unit #5', year: 2018 },
  { id: 'DT-06', vehicleTypeId: 'CAT-793F', unit: 'Unit #6', year: 2018 },
  { id: 'DT-07', vehicleTypeId: 'KOM-930E', unit: 'Unit #7', year: 2021 },
  { id: 'DT-08', vehicleTypeId: 'KOM-930E', unit: 'Unit #8', year: 2021 },
  { id: 'DT-09', vehicleTypeId: 'CAT-785D', unit: 'Unit #9', year: 2017 },
  { id: 'DT-10', vehicleTypeId: 'CAT-785D', unit: 'Unit #10', year: 2017 },
  { id: 'DT-11', vehicleTypeId: 'CAT-777G', unit: 'Unit #11', year: 2022 },
  { id: 'DT-12', vehicleTypeId: 'CAT-777G', unit: 'Unit #12', year: 2022 },
  { id: 'DT-13', vehicleTypeId: 'KOM-830E', unit: 'Unit #13', year: 2020 },
  { id: 'DT-14', vehicleTypeId: 'LIE-T284', unit: 'Unit #14', year: 2021 },
  { id: 'DT-15', vehicleTypeId: 'HIT-EH5000', unit: 'Unit #15', year: 2019 },
  { id: 'DT-16', vehicleTypeId: 'CAT-775G', unit: 'Unit #16', year: 2023 },

  // ─── FRONT LOADERS (FL) — CAT 994K, 992K · 4 tires ──────────────────────
  { id: 'FL-01', vehicleTypeId: 'CAT-994K', unit: 'Unit #1', year: 2020 },
  { id: 'FL-02', vehicleTypeId: 'CAT-994K', unit: 'Unit #2', year: 2020 },
  { id: 'FL-03', vehicleTypeId: 'CAT-992K', unit: 'Unit #3', year: 2018 },
  { id: 'FL-04', vehicleTypeId: 'CAT-992K', unit: 'Unit #4', year: 2019 },
  { id: 'FL-05', vehicleTypeId: 'KOM-WA800', unit: 'Unit #5', year: 2021 },
  { id: 'FL-06', vehicleTypeId: 'CAT-990K', unit: 'Unit #6', year: 2022 },
  { id: 'FL-07', vehicleTypeId: 'VOL-L350H', unit: 'Unit #7', year: 2020 },
  { id: 'FL-08', vehicleTypeId: 'KOM-WA600', unit: 'Unit #8', year: 2019 },
  { id: 'FL-12', vehicleTypeId: 'CAT-994K', unit: 'Unit #12', year: 2018 }, // original fleet item

  // ─── HAUL GRADERS (HG) — CAT 24M, 16M3 · 6 tires ────────────────────────
  { id: 'HG-01', vehicleTypeId: 'CAT-24M', unit: 'Unit #1', year: 2018 },
  { id: 'HG-02', vehicleTypeId: 'CAT-24M', unit: 'Unit #2', year: 2018 }, // original fleet item
  { id: 'HG-03', vehicleTypeId: 'CAT-24M', unit: 'Unit #3', year: 2019 },
  { id: 'HG-04', vehicleTypeId: 'CAT-16M3', unit: 'Unit #4', year: 2020 },
  { id: 'HG-05', vehicleTypeId: 'KOM-GD825A', unit: 'Unit #5', year: 2017 },
  { id: 'HG-06', vehicleTypeId: 'CAT-14M3', unit: 'Unit #6', year: 2021 },

  // ─── WHEEL LOADERS (WL) — CAT 988K, 980M, 966M · 4 tires ────────────────
  { id: 'WL-01', vehicleTypeId: 'CAT-988K', unit: 'Unit #1', year: 2021 },
  { id: 'WL-02', vehicleTypeId: 'CAT-988K', unit: 'Unit #2', year: 2021 },
  { id: 'WL-03', vehicleTypeId: 'CAT-980M', unit: 'Unit #3', year: 2020 },
  { id: 'WL-04', vehicleTypeId: 'CAT-980M', unit: 'Unit #4', year: 2022 },
  { id: 'WL-05', vehicleTypeId: 'CAT-966M', unit: 'Unit #5', year: 2023 },
  { id: 'WL-06', vehicleTypeId: 'KOM-WA480', unit: 'Unit #6', year: 2022 },
  { id: 'WL-07', vehicleTypeId: 'CAT-988K', unit: 'Unit #7', year: 2021 }, // original fleet item
  { id: 'WL-08', vehicleTypeId: 'CAT-950M', unit: 'Unit #8', year: 2023 },

  // ─── ARTICULATED DUMP TRUCKS (AT) — CAT 745, Volvo A45G · 6 tires ────────
  { id: 'AT-01', vehicleTypeId: 'CAT-745',  unit: 'Unit #1', year: 2021 },
  { id: 'AT-02', vehicleTypeId: 'CAT-745',  unit: 'Unit #2', year: 2021 },
  { id: 'AT-03', vehicleTypeId: 'CAT-745',  unit: 'Unit #3', year: 2022 },
  { id: 'AT-04', vehicleTypeId: 'VOL-A45G', unit: 'Unit #4', year: 2020 },
  { id: 'AT-05', vehicleTypeId: 'VOL-A45G', unit: 'Unit #5', year: 2020 },
  { id: 'AT-06', vehicleTypeId: 'BEL-B45E', unit: 'Unit #6', year: 2019 },
  { id: 'AT-07', vehicleTypeId: 'BEL-B40E', unit: 'Unit #7', year: 2020 },
  { id: 'AT-08', vehicleTypeId: 'KOM-HM400', unit: 'Unit #8', year: 2021 },

  // ─── WATER TRUCKS (WT) — articulated chassis · 6 tires ───────────────────
  { id: 'WT-01', vehicleTypeId: 'KOM-HM400', unit: 'Unit #1', year: 2019 },
  { id: 'WT-02', vehicleTypeId: 'KOM-HM400', unit: 'Unit #2', year: 2020 },
  { id: 'WT-03', vehicleTypeId: 'CAT-745',   unit: 'Unit #3', year: 2018 },

  // ─── SCRAPERS (SC) — CAT 657G, 637K · 4 tires ────────────────────────────
  { id: 'SC-01', vehicleTypeId: 'CAT-657G', unit: 'Unit #1', year: 2018 },
  { id: 'SC-02', vehicleTypeId: 'CAT-637K', unit: 'Unit #2', year: 2019 },
  { id: 'SC-03', vehicleTypeId: 'CAT-621K', unit: 'Unit #3', year: 2020 },

  // ─── SEMI-TRUCKS / HIGHWAY (ST) — 18 tires ───────────────────────────────
  { id: 'ST-01', vehicleTypeId: 'FRT-CASC', unit: 'Unit #1', year: 2021 },
  { id: 'ST-02', vehicleTypeId: 'KW-T680',  unit: 'Unit #2', year: 2022 },
  { id: 'ST-03', vehicleTypeId: 'PBL-389',  unit: 'Unit #3', year: 2020 },
  { id: 'ST-04', vehicleTypeId: 'VOL-VNL',  unit: 'Unit #4', year: 2023 },

  // ─── FUEL TANKERS (FT) — semi chassis · 18 tires ─────────────────────────
  { id: 'FT-01', vehicleTypeId: 'MK-ANTHEM', unit: 'Unit #1', year: 2021 },
  { id: 'FT-02', vehicleTypeId: 'INT-LT',    unit: 'Unit #2', year: 2020 },

  // ─── MEDIUM DUTY SERVICE TRUCKS (MD) — 6 tires ───────────────────────────
  { id: 'MD-01', vehicleTypeId: 'F-650', unit: 'Unit #1', year: 2021 },
  { id: 'MD-02', vehicleTypeId: 'F-750', unit: 'Unit #2', year: 2022 },
  { id: 'MD-03', vehicleTypeId: 'F-750', unit: 'Unit #3', year: 2022 },
  { id: 'MD-04', vehicleTypeId: 'RAM-4500', unit: 'Unit #4', year: 2020 },

  // ─── LIGHT VEHICLES (LV) — 4 tires ───────────────────────────────────────
  { id: 'LV-01', vehicleTypeId: 'TOYOTA-TUNDRA', unit: 'Unit #1', year: 2022 },
  { id: 'LV-02', vehicleTypeId: 'TOYOTA-TUNDRA', unit: 'Unit #2', year: 2022 },
  { id: 'LV-03', vehicleTypeId: 'F-250',          unit: 'Unit #3', year: 2021 },
  { id: 'LV-04', vehicleTypeId: 'F-250',          unit: 'Unit #4', year: 2021 },
  { id: 'LV-05', vehicleTypeId: 'RAM-2500',       unit: 'Unit #5', year: 2020 },
  { id: 'LV-06', vehicleTypeId: 'LAND-CRUISER',   unit: 'Unit #6', year: 2023 },
  { id: 'LV-07', vehicleTypeId: 'LAND-CRUISER',   unit: 'Unit #7', year: 2023 },
  { id: 'LV-08', vehicleTypeId: 'CHEV-2500HD',    unit: 'Unit #8', year: 2022 },
  { id: 'LV-09', vehicleTypeId: 'NISSAN-PATROL',  unit: 'Unit #9', year: 2021 },
  { id: 'LV-10', vehicleTypeId: 'NISSAN-PATROL',  unit: 'Unit #10', year: 2021 },
  { id: 'LV-11', vehicleTypeId: 'DEF-110',        unit: 'Unit #11', year: 2022 },
  { id: 'LV-12', vehicleTypeId: 'HILUX',          unit: 'Unit #12', year: 2023 },
  { id: 'LV-13', vehicleTypeId: 'HILUX',          unit: 'Unit #13', year: 2023 },
  { id: 'LV-14', vehicleTypeId: 'F-350-DRW',      unit: 'Unit #14', year: 2022 },

  // ─── FORKLIFTS (FK) — 4 tires ─────────────────────────────────────────────
  { id: 'FK-01', vehicleTypeId: 'TOYOTA-8FGU', unit: 'Unit #1', year: 2020 },
  { id: 'FK-02', vehicleTypeId: 'TOYOTA-8FGU', unit: 'Unit #2', year: 2021 },
  { id: 'FK-03', vehicleTypeId: 'CAT-DP100',   unit: 'Unit #3', year: 2019 },
  { id: 'FK-04', vehicleTypeId: 'CROWN-FC5200', unit: 'Unit #4', year: 2022 },

  // ─── PERSONNEL BUSES (PB) — 6 tires ──────────────────────────────────────
  { id: 'PB-01', vehicleTypeId: 'MINE-BUS', unit: 'Unit #1', year: 2021 },
  { id: 'PB-02', vehicleTypeId: 'MINE-BUS', unit: 'Unit #2', year: 2021 },
  { id: 'PB-03', vehicleTypeId: 'VOLVO-B12M', unit: 'Unit #3', year: 2020 },
];

// Merges a raw fleet entry with its vehicle type and position config into a
// single display-ready object consumed by HomeScreen and the inspection flow.
export function buildFleetItem(raw) {
  const vt = VEHICLE_TYPES[raw.vehicleTypeId];
  if (!vt) return null;
  const config = POSITION_CONFIGS[vt.tireConfig];
  if (!config) return null;

  return {
    id: raw.id,
    label: vt.label,
    unit: raw.unit,
    year: raw.year,
    make: vt.make,
    model: vt.model,
    category: vt.category,
    meta: `${vt.make} ${vt.model} · ${config.tireCount} tires`,
    tireCount: config.tireCount,
    tireConfig: vt.tireConfig,
    tirePositions: config.positions,
    tirePositionLabels: config.labels,
    tireSize: vt.tireSize,
    oem_psi: vt.oem_psi,
    treadDepthNew_mm: vt.treadDepthNew_mm,
    treadDepthMin_mm: vt.treadDepthMin_mm,
  };
}

export const FLEET_DISPLAY = FLEET_RAW.map(buildFleetItem).filter(Boolean);
