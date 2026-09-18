// Browser-local persistence for the demo dashboard.
//
// There is no backend. The site ships with generated placeholder inspections
// (see demoData.js); anything a visitor changes is kept in their own
// localStorage and never leaves the browser. Clearing site data resets it to the
// bundled demo set.
import { FLEET_DISPLAY } from '../data/fleet';
import { DEMO_INSPECTIONS } from './demoData';

const STORAGE_KEY = 'tiretrackpro.web.inspections.v1';

const fleetById = Object.fromEntries(FLEET_DISPLAY.map((f) => [f.id, f]));

// Equipment records are large and already bundled, so only the id is persisted
// and the full object is rehydrated on read.
function toStorable(inspections) {
  return inspections.map((insp) => ({
    ...insp,
    vehicles: Object.fromEntries(
      Object.entries(insp.vehicles ?? {}).map(([id, v]) => [
        id,
        {
          vehicleInspectionId: v.vehicleInspectionId,
          results: v.results,
          completedAt: v.completedAt,
          status: v.status,
        },
      ])
    ),
  }));
}

function fromStorable(rows) {
  return rows.map((insp) => ({
    ...insp,
    vehicles: Object.fromEntries(
      Object.entries(insp.vehicles ?? {})
        .filter(([id]) => fleetById[id])
        .map(([id, v]) => [id, { ...v, equipment: fleetById[id] }])
    ),
  }));
}

function read() {
  // Private browsing and blocked site data both make localStorage throw, so the
  // demo set is the fallback rather than an error state.
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEMO_INSPECTIONS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? fromStorable(parsed) : DEMO_INSPECTIONS;
  } catch {
    return DEMO_INSPECTIONS;
  }
}

function write(inspections) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStorable(inspections)));
  } catch {
    // Out of quota or storage disabled — the change still applies in memory for
    // this page view, it just will not survive a reload.
  }
}

export async function listInspections() {
  return read();
}

export async function updateInspection(id, { site, inspector }) {
  const all = read().map((insp) =>
    insp.id === id ? { ...insp, site: site ?? '', inspector: inspector ?? '' } : insp
  );
  write(all);
}

export async function deleteInspection(id) {
  write(read().filter((insp) => insp.id !== id));
}

// Photos are device-local in the app and never uploaded, so the dashboard has no
// image to fetch. Kept so TireGrid can call it uniformly.
export async function getInspectionPhotoUrl(path) {
  return path ?? null;
}

// Drops every local change and returns to the bundled demo set.
export function resetToDemo() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing persisted in the first place.
  }
}

export function hasLocalChanges() {
  try {
    return localStorage.getItem(STORAGE_KEY) != null;
  } catch {
    return false;
  }
}
