// `tireSize` and `oem_psi` are recorded per axle as { front, rear }; tread depths
// are plain numbers. These helpers keep that asymmetry out of the components.

// FL / FR are the steer axle in every position config; everything else (drive,
// tandem, trailer) takes the rear spec.
const FRONT_POSITIONS = new Set(['FL', 'FR']);

export function specForPosition(value, position) {
  if (value == null) return null;
  if (typeof value !== 'object') return value;
  return FRONT_POSITIONS.has(position) ? (value.front ?? null) : (value.rear ?? null);
}

// Renders an axle-split spec as one string: a single value when both axles match,
// otherwise "F:… R:…".
export function formatAxleSpec(value) {
  if (value == null) return '—';
  if (typeof value !== 'object') return String(value);
  const f = value.front ?? '—';
  const r = value.rear ?? '—';
  return f === r ? String(f) : `F:${f}  R:${r}`;
}
