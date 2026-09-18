import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useInspections } from '../context/DataContext';
import { fleetVehicleRollup } from '../lib/analytics';
import { FLEET_DISPLAY } from '../data/fleet';
import { formatUSD } from '../data/tireCosts';
import { relativeTime } from '../lib/format';
import {
  Card,
  EmptyState,
  ErrorNote,
  Input,
  PageHeader,
  Spinner,
  StatusPill,
} from '../components/ui';

// Every unit in the roster is listed, inspected or not — an unvisited machine is
// itself a finding, so hiding it would be misleading.
export default function Fleet() {
  const { inspections, loading, error } = useInspections();
  const [query, setQuery] = useState('');
  const [onlyFlagged, setOnlyFlagged] = useState(false);

  const rows = useMemo(() => {
    const rollupById = Object.fromEntries(
      fleetVehicleRollup(inspections).map((r) => [r.equipmentId, r])
    );
    const q = query.trim().toLowerCase();
    return FLEET_DISPLAY.map((equipment) => ({
      equipment,
      rollup: rollupById[equipment.id] ?? null,
    }))
      .filter(({ equipment, rollup }) => {
        if (onlyFlagged && rollup?.lastStatus !== 'REPLACE' && rollup?.lastStatus !== 'WATCH') {
          return false;
        }
        if (!q) return true;
        return (
          equipment.id.toLowerCase().includes(q) ||
          equipment.label.toLowerCase().includes(q) ||
          equipment.unit.toLowerCase().includes(q) ||
          (equipment.category ?? '').toLowerCase().includes(q)
        );
      })
      .sort((a, b) => (b.rollup?.lastInspectionAt ?? 0) - (a.rollup?.lastInspectionAt ?? 0));
  }, [inspections, query, onlyFlagged]);

  if (loading) return <Spinner label="Loading fleet" />;
  if (error) return <ErrorNote>{error}</ErrorNote>;

  return (
    <>
      <PageHeader
        title="Fleet"
        subtitle={`${FLEET_DISPLAY.length} units in the roster`}
        action={
          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-dim">
              <input
                type="checkbox"
                checked={onlyFlagged}
                onChange={(e) => setOnlyFlagged(e.target.checked)}
                className="size-4 accent-[#f5a623]"
              />
              Flagged only
            </label>
            <div className="relative w-full sm:w-56">
              <Search
                size={15}
                className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-faint"
              />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Unit, make, category"
                className="pl-9"
              />
            </div>
          </div>
        }
      />

      {rows.length === 0 ? (
        <EmptyState title="Nothing matched" body="Try a different unit number or category." />
      ) : (
        <Card className="divide-y divide-edge">
          {rows.map(({ equipment, rollup }) => (
            <Link
              key={equipment.id}
              to={`/fleet/${equipment.id}`}
              className="grid grid-cols-2 items-center gap-3 p-4 hover:bg-stripe sm:grid-cols-4"
            >
              <div className="col-span-2 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm text-bone">{equipment.id}</span>
                  {rollup ? (
                    <StatusPill status={rollup.lastStatus} />
                  ) : (
                    <span className="font-mono text-[11px] tracking-widest text-faint uppercase">
                      never inspected
                    </span>
                  )}
                </div>
                <div className="truncate text-xs text-faint">{equipment.meta}</div>
              </div>
              <div className="text-sm text-dim">
                {rollup ? (
                  <>
                    {rollup.inspectionCount}{' '}
                    {rollup.inspectionCount === 1 ? 'inspection' : 'inspections'}
                  </>
                ) : (
                  <span className="text-faint">—</span>
                )}
              </div>
              <div className="text-right">
                {rollup?.totalImmediateCostUSD ? (
                  <div className="font-mono text-sm text-danger">
                    {formatUSD(rollup.totalImmediateCostUSD, { compact: true })}
                  </div>
                ) : null}
                <div className="text-xs text-faint">
                  {rollup ? relativeTime(rollup.lastInspectionAt) : 'no history'}
                </div>
              </div>
            </Link>
          ))}
        </Card>
      )}
    </>
  );
}
