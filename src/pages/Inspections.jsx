import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useInspections } from '../context/DataContext';
import { inspectionStatus, costForInspection } from '../lib/analytics';
import { formatUSD } from '../data/tireCosts';
import { formatDate } from '../lib/format';
import {
  Card,
  EmptyState,
  ErrorNote,
  Input,
  PageHeader,
  Spinner,
  StatusPill,
} from '../components/ui';

export default function Inspections() {
  const { inspections, loading, error } = useInspections();
  const [query, setQuery] = useState('');

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...inspections]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .filter((insp) => {
        if (!q) return true;
        return (
          insp.displayId.toLowerCase().includes(q) ||
          (insp.site ?? '').toLowerCase().includes(q) ||
          (insp.inspector ?? '').toLowerCase().includes(q) ||
          Object.keys(insp.vehicles).some((id) => id.toLowerCase().includes(q))
        );
      });
  }, [inspections, query]);

  if (loading) return <Spinner label="Loading inspections" />;
  if (error) return <ErrorNote>{error}</ErrorNote>;

  return (
    <>
      <PageHeader
        title="Inspections"
        subtitle={`${inspections.length} total`}
        action={
          <div className="relative w-full sm:w-64">
            <Search
              size={15}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-faint"
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ID, site, inspector, unit"
              className="pl-9"
            />
          </div>
        }
      />

      {rows.length === 0 ? (
        <EmptyState
          title={query ? 'Nothing matched' : 'No inspections yet'}
          body={
            query
              ? 'Try a different ID, site or unit number.'
              : 'Complete a walk-around in the TireTrack Pro app and it will show up here.'
          }
        />
      ) : (
        <Card className="divide-y divide-edge">
          {rows.map((insp) => {
            const cost = costForInspection(insp);
            const vehicleCount = Object.keys(insp.vehicles).length;
            return (
              <Link
                key={insp.id}
                to={`/inspections/${insp.id}`}
                className="grid grid-cols-2 items-center gap-3 p-4 hover:bg-stripe sm:grid-cols-5"
              >
                <div className="col-span-2 min-w-0 sm:col-span-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-bone">{insp.displayId}</span>
                    <StatusPill status={inspectionStatus(insp)} />
                  </div>
                  <div className="truncate text-xs text-faint">
                    {insp.site || 'No site'} · {insp.inspector || 'Unassigned'}
                  </div>
                </div>
                <div className="text-sm text-dim">
                  {vehicleCount} {vehicleCount === 1 ? 'vehicle' : 'vehicles'}
                </div>
                <div className="text-sm">
                  {cost.replaceCount > 0 ? (
                    <span className="font-mono text-danger">
                      {formatUSD(cost.immediateCostUSD, { compact: true })}
                    </span>
                  ) : (
                    <span className="text-faint">—</span>
                  )}
                </div>
                <div className="text-right text-xs text-faint">
                  {formatDate(insp.createdAt)}
                </div>
              </Link>
            );
          })}
        </Card>
      )}
    </>
  );
}
