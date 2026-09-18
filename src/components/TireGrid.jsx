import { ImageIcon } from 'lucide-react';
import { specForPosition } from '../lib/specs';
import { StatusPill } from './ui';

// Renders every tire position for one vehicle in its walk-around order, with the
// tread / PSI reading captured in the app. Positions with no reading are shown
// dimmed rather than hidden so gaps in an inspection are obvious.
export default function TireGrid({ equipment, results }) {
  const positions = equipment?.tirePositions ?? [];
  const labels = equipment?.tirePositionLabels ?? {};

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {positions.map((pos) => (
        <TireCell
          key={pos}
          position={pos}
          label={labels[pos] ?? pos}
          reading={results?.[pos]}
          equipment={equipment}
        />
      ))}
    </div>
  );
}

function TireCell({ position, label, reading, equipment }) {
  const hasReading = reading && (reading.tread != null || reading.psi != null);
  const tread = typeof reading?.tread === 'number' ? reading.tread : null;
  const unit = reading?.unit ?? 'mm';
  const minTread = equipment?.treadDepthMin_mm;
  const newTread = equipment?.treadDepthNew_mm;
  const oemPsi = specForPosition(equipment?.oem_psi, position);

  // Remaining life as a share of the usable band between new and the legal minimum.
  let wearPct = null;
  if (tread != null && newTread && minTread != null && newTread > minTread) {
    wearPct = Math.max(0, Math.min(1, (tread - minTread) / (newTread - minTread)));
  }

  return (
    <div
      className={`rounded-lg border p-3 ${
        hasReading ? 'border-edge bg-stripe' : 'border-edge/60 bg-ink'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="font-mono text-sm text-amber">{position}</div>
          <div className="truncate text-xs text-faint">{label}</div>
        </div>
        {reading?.condition ? <StatusPill status={reading.condition} /> : null}
      </div>

      {hasReading ? (
        <>
          <div className="mt-3 flex items-baseline gap-4">
            <div>
              <span className="font-display text-2xl text-bone">
                {tread != null ? tread.toFixed(1) : '—'}
              </span>
              <span className="ml-1 text-xs text-faint">{unit}</span>
            </div>
            <div className="text-sm text-dim">
              {reading.psi != null ? `${reading.psi} psi` : 'no psi'}
              {oemPsi != null ? <span className="text-faint"> / {oemPsi} oem</span> : null}
            </div>
          </div>

          {wearPct != null ? (
            <div className="mt-3">
              <div className="h-1.5 overflow-hidden rounded-full bg-edge">
                <div
                  className={`h-full rounded-full ${
                    wearPct > 0.5 ? 'bg-ok' : wearPct > 0.2 ? 'bg-amber' : 'bg-danger'
                  }`}
                  style={{ width: `${Math.round(wearPct * 100)}%` }}
                />
              </div>
              <div className="mt-1 font-mono text-[11px] text-faint">
                {Math.round(wearPct * 100)}% life remaining
              </div>
            </div>
          ) : null}

          {reading.hasPhoto ? <PhotoNote /> : null}
        </>
      ) : (
        <p className="mt-3 text-sm text-faint">Not recorded</p>
      )}
    </div>
  );
}

function PhotoNote() {
  return (
    <div className="mt-3 flex items-center gap-1.5 text-xs text-faint">
      <ImageIcon size={13} />
      Photo captured on the inspector's device
    </div>
  );
}
