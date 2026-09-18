// Synced from TireTrack-App — canonical source lives there.
// Run `npm run sync:domain` after changing it in the app. Do not edit here.

// Derived analytics for the Reports tab.
// All functions are pure — they operate on the local-state inspection shape
// produced by `dataService.mapToLocalState` (see src/lib/dataService.js).
//
// An inspection looks like:
//   {
//     id, displayId, createdAt, site, inspector,
//     vehicles: { [equipmentId]: { equipment, results, status, completedAt } }
//   }

import { estimatePerTireCostUSD, estimateInstalledTireCostUSD } from '../data/tireCosts';

const COND_RANK = { OK: 0, WATCH: 1, REPLACE: 2 };

function isCompleted(inspection) {
  return Object.keys(inspection.vehicles ?? {}).length > 0;
}

function getTireRows(inspection) {
  const rows = [];
  for (const [equipmentId, v] of Object.entries(inspection.vehicles ?? {})) {
    const positions = v.equipment?.tirePositions ?? [];
    for (const pos of positions) {
      const r = v.results?.[pos] ?? {};
      rows.push({
        inspectionId: inspection.id,
        displayId: inspection.displayId,
        createdAt: inspection.createdAt,
        site: inspection.site ?? '',
        inspector: inspection.inspector ?? '',
        equipmentId,
        equipment: v.equipment,
        position: pos,
        tread: typeof r.tread === 'number' ? r.tread : Number(r.tread) || null,
        psi: typeof r.psi === 'number' ? r.psi : Number(r.psi) || null,
        condition: r.condition ?? null,
        unit: r.unit ?? 'mm',
      });
    }
  }
  return rows;
}

export function inspectionStatus(inspection) {
  const vs = Object.values(inspection.vehicles ?? {});
  if (vs.some((v) => v.status === 'REPLACE')) return 'REPLACE';
  if (vs.some((v) => v.status === 'WATCH')) return 'WATCH';
  if (vs.length > 0) return 'OK';
  return null;
}

// ─── Cost analytics ─────────────────────────────────────────────────────────

export function costForVehicle(vehicle) {
  const positions = vehicle.equipment?.tirePositions ?? [];
  const perTire = estimateInstalledTireCostUSD(vehicle.equipment);
  let replace = 0;
  let watch = 0;
  for (const pos of positions) {
    const c = vehicle.results?.[pos]?.condition;
    if (c === 'REPLACE') replace += 1;
    else if (c === 'WATCH') watch += 1;
  }
  return {
    perTire,
    replaceCount: replace,
    watchCount: watch,
    immediateCostUSD: replace * perTire,
    projectedWatchCostUSD: watch * perTire,
    fullSetCostUSD: positions.length * perTire,
  };
}

export function costForInspection(inspection) {
  const totals = {
    perTireAvg: 0,
    replaceCount: 0,
    watchCount: 0,
    immediateCostUSD: 0,
    projectedWatchCostUSD: 0,
    totalExposureUSD: 0,
    fullFleetReplacementUSD: 0,
  };
  const vehicles = Object.values(inspection.vehicles ?? {});
  if (vehicles.length === 0) return totals;
  let perTireSum = 0;
  for (const v of vehicles) {
    const c = costForVehicle(v);
    totals.replaceCount += c.replaceCount;
    totals.watchCount += c.watchCount;
    totals.immediateCostUSD += c.immediateCostUSD;
    totals.projectedWatchCostUSD += c.projectedWatchCostUSD;
    totals.fullFleetReplacementUSD += c.fullSetCostUSD;
    perTireSum += c.perTire;
  }
  totals.perTireAvg = Math.round(perTireSum / vehicles.length);
  totals.totalExposureUSD = totals.immediateCostUSD + totals.projectedWatchCostUSD;
  return totals;
}

// ─── Fleet roll-up ──────────────────────────────────────────────────────────

export function fleetSummary(inspections) {
  const completed = inspections.filter(isCompleted);
  const summary = {
    reportCount: completed.length,
    vehicleCount: 0,
    tireCount: 0,
    replaceCount: 0,
    watchCount: 0,
    immediateCostUSD: 0,
    projectedWatchCostUSD: 0,
    sites: new Set(),
    inspectors: new Set(),
    lastInspectionAt: null,
    flaggedVehicleCount: 0,
  };
  for (const insp of completed) {
    if (insp.site) summary.sites.add(insp.site);
    if (insp.inspector) summary.inspectors.add(insp.inspector);
    const ts = new Date(insp.createdAt).getTime();
    if (!summary.lastInspectionAt || ts > summary.lastInspectionAt) {
      summary.lastInspectionAt = ts;
    }
    for (const v of Object.values(insp.vehicles ?? {})) {
      summary.vehicleCount += 1;
      summary.tireCount += v.equipment?.tirePositions?.length ?? 0;
      const c = costForVehicle(v);
      summary.replaceCount += c.replaceCount;
      summary.watchCount += c.watchCount;
      summary.immediateCostUSD += c.immediateCostUSD;
      summary.projectedWatchCostUSD += c.projectedWatchCostUSD;
      if (v.status === 'REPLACE' || v.status === 'WATCH') {
        summary.flaggedVehicleCount += 1;
      }
    }
  }
  return {
    ...summary,
    sites: Array.from(summary.sites),
    inspectors: Array.from(summary.inspectors),
  };
}

// ─── Monthly trend buckets ──────────────────────────────────────────────────

function monthKey(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export function monthlyTrend(inspections, { months = 12, site = null } = {}) {
  const now = new Date();
  const buckets = [];
  for (let i = months - 1; i >= 0; i -= 1) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    buckets.push({
      key: monthKey(d),
      label: d.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
      year: d.getFullYear(),
      reportCount: 0,
      replaceCount: 0,
      watchCount: 0,
      immediateCostUSD: 0,
      vehicleCount: 0,
    });
  }
  const byKey = Object.fromEntries(buckets.map((b) => [b.key, b]));
  for (const insp of inspections) {
    if (!isCompleted(insp)) continue;
    if (site && insp.site !== site) continue;
    const k = monthKey(insp.createdAt);
    const b = byKey[k];
    if (!b) continue;
    b.reportCount += 1;
    for (const v of Object.values(insp.vehicles ?? {})) {
      b.vehicleCount += 1;
      const c = costForVehicle(v);
      b.replaceCount += c.replaceCount;
      b.watchCount += c.watchCount;
      b.immediateCostUSD += c.immediateCostUSD;
    }
  }
  return buckets;
}

// ─── Site roll-up ───────────────────────────────────────────────────────────

export function siteRollup(inspections) {
  const map = new Map();
  for (const insp of inspections) {
    if (!isCompleted(insp)) continue;
    const site = insp.site || 'UNASSIGNED';
    if (!map.has(site)) {
      map.set(site, {
        site,
        reportCount: 0,
        vehicleCount: 0,
        replaceCount: 0,
        watchCount: 0,
        immediateCostUSD: 0,
        lastInspectionAt: 0,
      });
    }
    const row = map.get(site);
    row.reportCount += 1;
    const ts = new Date(insp.createdAt).getTime();
    if (ts > row.lastInspectionAt) row.lastInspectionAt = ts;
    for (const v of Object.values(insp.vehicles ?? {})) {
      row.vehicleCount += 1;
      const c = costForVehicle(v);
      row.replaceCount += c.replaceCount;
      row.watchCount += c.watchCount;
      row.immediateCostUSD += c.immediateCostUSD;
    }
  }
  return Array.from(map.values()).sort((a, b) => b.lastInspectionAt - a.lastInspectionAt);
}

// ─── Per-vehicle history ────────────────────────────────────────────────────

export function vehicleHistory(inspections, equipmentId) {
  const history = [];
  for (const insp of inspections) {
    const v = insp.vehicles?.[equipmentId];
    if (!v) continue;
    const positions = v.equipment?.tirePositions ?? [];
    const treads = positions
      .map((p) => v.results?.[p]?.tread)
      .filter((t) => typeof t === 'number');
    const psis = positions
      .map((p) => v.results?.[p]?.psi)
      .filter((p) => typeof p === 'number');
    const replaceCount = positions.filter((p) => v.results?.[p]?.condition === 'REPLACE').length;
    const watchCount = positions.filter((p) => v.results?.[p]?.condition === 'WATCH').length;
    history.push({
      inspectionId: insp.id,
      displayId: insp.displayId,
      createdAt: insp.createdAt,
      site: insp.site,
      inspector: insp.inspector,
      status: v.status,
      avgTread: treads.length ? treads.reduce((s, t) => s + t, 0) / treads.length : null,
      minTread: treads.length ? Math.min(...treads) : null,
      avgPsi: psis.length ? psis.reduce((s, t) => s + t, 0) / psis.length : null,
      replaceCount,
      watchCount,
      equipment: v.equipment,
      results: v.results,
      perTireCostUSD: estimateInstalledTireCostUSD(v.equipment),
      immediateCostUSD: replaceCount * estimateInstalledTireCostUSD(v.equipment),
    });
  }
  return history.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
}

// Rolls up activity across the entire fleet, sorted by most-degraded first.
export function fleetVehicleRollup(inspections) {
  const byId = new Map();
  for (const insp of inspections) {
    if (!isCompleted(insp)) continue;
    for (const [equipmentId, v] of Object.entries(insp.vehicles ?? {})) {
      if (!byId.has(equipmentId)) {
        byId.set(equipmentId, {
          equipmentId,
          equipment: v.equipment,
          inspectionCount: 0,
          replaceCount: 0,
          watchCount: 0,
          lastInspectionAt: 0,
          lastStatus: null,
          lastSite: '',
          totalImmediateCostUSD: 0,
          minTreadEver: null,
        });
      }
      const row = byId.get(equipmentId);
      row.inspectionCount += 1;
      const ts = new Date(insp.createdAt).getTime();
      if (ts > row.lastInspectionAt) {
        row.lastInspectionAt = ts;
        row.lastStatus = v.status;
        row.lastSite = insp.site || '';
      }
      const c = costForVehicle(v);
      row.replaceCount += c.replaceCount;
      row.watchCount += c.watchCount;
      row.totalImmediateCostUSD += c.immediateCostUSD;
      const positions = v.equipment?.tirePositions ?? [];
      for (const p of positions) {
        const t = v.results?.[p]?.tread;
        if (typeof t === 'number') {
          if (row.minTreadEver == null || t < row.minTreadEver) row.minTreadEver = t;
        }
      }
    }
  }
  return Array.from(byId.values()).sort((a, b) => {
    const rb = COND_RANK[b.lastStatus] ?? -1;
    const ra = COND_RANK[a.lastStatus] ?? -1;
    if (rb !== ra) return rb - ra;
    return b.lastInspectionAt - a.lastInspectionAt;
  });
}

// Tread compliance ratio (0-1) for a single inspection or roll-up.
export function treadCompliance(inspection) {
  let total = 0;
  let ok = 0;
  for (const v of Object.values(inspection.vehicles ?? {})) {
    const positions = v.equipment?.tirePositions ?? [];
    for (const p of positions) {
      total += 1;
      const c = v.results?.[p]?.condition;
      if (c === 'OK') ok += 1;
    }
  }
  return total === 0 ? 1 : ok / total;
}

export const __internals = { getTireRows, monthKey };
