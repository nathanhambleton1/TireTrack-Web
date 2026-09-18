import { Link } from 'react-router-dom';
import { AlertTriangle, ClipboardList, DollarSign, Truck } from 'lucide-react';
import { useInspections } from '../context/DataContext';
import { fleetSummary, fleetVehicleRollup, monthlyTrend } from '../lib/analytics';
import { formatUSD } from '../data/tireCosts';
import { FLEET_DISPLAY } from '../data/fleet';
import {
  Card,
  EmptyState,
  ErrorNote,
  PageHeader,
  SectionTitle,
  Spinner,
  StatCard,
  StatusPill,
} from '../components/ui';
import { formatDate, relativeTime } from '../lib/format';
import TrendChart from '../components/TrendChart';

export default function Dashboard() {
  const { inspections, loading, error } = useInspections();

  if (loading) return <Spinner label="Loading your fleet" />;
  if (error) return <ErrorNote>{error}</ErrorNote>;

  const summary = fleetSummary(inspections);
  const trend = monthlyTrend(inspections, { months: 12 });
  const rollup = fleetVehicleRollup(inspections);
  const flagged = rollup.filter((r) => r.lastStatus === 'REPLACE' || r.lastStatus === 'WATCH');

  if (summary.reportCount === 0) {
    return (
      <>
        <PageHeader
          title="Dashboard"
          subtitle="Nothing recorded yet on this account."
        />
        <EmptyState
          title="No inspections yet"
          body="Run a walk-around in the TireTrack Pro app and it will appear here within seconds. Both clients sign in to the same account, so there is nothing to connect."
        />
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle={`${summary.reportCount} inspections · last ${relativeTime(summary.lastInspectionAt)}`}
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Immediate cost"
          value={formatUSD(summary.immediateCostUSD, { compact: true })}
          sub={`${summary.replaceCount} tires at replace`}
          tone="danger"
          icon={DollarSign}
        />
        <StatCard
          label="Projected"
          value={formatUSD(summary.projectedWatchCostUSD, { compact: true })}
          sub={`${summary.watchCount} tires on watch`}
          tone="amber"
          icon={AlertTriangle}
        />
        <StatCard
          label="Vehicles inspected"
          value={rollup.length}
          sub={`of ${FLEET_DISPLAY.length} in the roster`}
          icon={Truck}
        />
        <StatCard
          label="Tires checked"
          value={summary.tireCount.toLocaleString('en-US')}
          sub={`across ${summary.reportCount} reports`}
          icon={ClipboardList}
        />
      </div>

      <section className="mt-6">
        <SectionTitle>Replacement cost, last 12 months</SectionTitle>
        <Card className="p-4">
          <TrendChart data={trend} />
        </Card>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-2">
        <div>
          <SectionTitle>Needs attention</SectionTitle>
          <Card className="divide-y divide-edge">
            {flagged.length === 0 ? (
              <p className="p-5 text-sm text-dim">
                Every inspected vehicle came back OK on its most recent walk-around.
              </p>
            ) : (
              flagged.slice(0, 8).map((row) => (
                <Link
                  key={row.equipmentId}
                  to={`/fleet/${row.equipmentId}`}
                  className="flex items-center justify-between gap-3 p-3.5 hover:bg-stripe"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-amber">{row.equipmentId}</span>
                      <StatusPill status={row.lastStatus} />
                    </div>
                    <div className="truncate text-xs text-faint">
                      {row.equipment?.label} · {row.equipment?.unit}
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="font-mono text-sm text-bone">
                      {formatUSD(row.totalImmediateCostUSD, { compact: true })}
                    </div>
                    <div className="text-xs text-faint">{relativeTime(row.lastInspectionAt)}</div>
                  </div>
                </Link>
              ))
            )}
          </Card>
        </div>

        <div>
          <SectionTitle>Recent inspections</SectionTitle>
          <Card className="divide-y divide-edge">
            {[...inspections]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 8)
              .map((insp) => (
                <Link
                  key={insp.id}
                  to={`/inspections/${insp.id}`}
                  className="flex items-center justify-between gap-3 p-3.5 hover:bg-stripe"
                >
                  <div className="min-w-0">
                    <div className="font-mono text-sm text-bone">{insp.displayId}</div>
                    <div className="truncate text-xs text-faint">
                      {insp.site || 'No site'} · {insp.inspector || 'Unassigned'}
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="text-sm text-dim">
                      {Object.keys(insp.vehicles).length} vehicles
                    </div>
                    <div className="text-xs text-faint">{formatDate(insp.createdAt)}</div>
                  </div>
                </Link>
              ))}
          </Card>
        </div>
      </section>
    </>
  );
}
