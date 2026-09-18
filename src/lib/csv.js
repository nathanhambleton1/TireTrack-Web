// Flattens inspections down to one row per tire so the export drops straight into
// a spreadsheet or a procurement system.
import { estimateInstalledTireCostUSD } from '../data/tireCosts';
import { specForPosition } from './specs';

const HEADERS = [
  'inspection_id',
  'inspected_at',
  'site',
  'inspector',
  'equipment_id',
  'equipment_label',
  'equipment_unit',
  'category',
  'position',
  'position_label',
  'tire_size',
  'tread',
  'tread_unit',
  'psi',
  'oem_psi',
  'condition',
  'installed_cost_usd',
];

function escapeCell(value) {
  const s = value == null ? '' : String(value);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function buildInspectionCsv(inspections) {
  const rows = [HEADERS.join(',')];

  const sorted = [...inspections].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  for (const insp of sorted) {
    for (const [equipmentId, vehicle] of Object.entries(insp.vehicles ?? {})) {
      const equipment = vehicle.equipment ?? {};
      const perTire = estimateInstalledTireCostUSD(equipment);
      for (const pos of equipment.tirePositions ?? []) {
        const r = vehicle.results?.[pos] ?? {};
        rows.push(
          [
            insp.displayId,
            insp.createdAt,
            insp.site ?? '',
            insp.inspector ?? '',
            equipmentId,
            equipment.label ?? '',
            equipment.unit ?? '',
            equipment.category ?? '',
            pos,
            equipment.tirePositionLabels?.[pos] ?? '',
            specForPosition(equipment.tireSize, pos) ?? '',
            r.tread ?? '',
            r.unit ?? '',
            r.psi ?? '',
            specForPosition(equipment.oem_psi, pos) ?? '',
            r.condition ?? '',
            r.condition === 'REPLACE' ? perTire : '',
          ]
            .map(escapeCell)
            .join(',')
        );
      }
    }
  }

  return rows.join('\n');
}
