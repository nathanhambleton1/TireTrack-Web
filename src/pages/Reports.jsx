import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import { useInspections } from '../context/DataContext';
import { fleetSummary, fleetVehicleRollup, monthlyTrend, siteRollup } from '../lib/analytics';
import { formatUSD } from '../data/tireCosts';
import { relativeTime } from '../lib/format';
import {
  Button,
  Card,
  EmptyState,
  ErrorNote,
  PageHeader,
  SectionTitle,
  Spinner,
  StatCard,
  StatusPill,
} from '../components/ui';
import TrendChart from '../components/TrendChart';
import SeverityTrend from '../components/SeverityTrend';
import { buildInspectionCsv } from '../lib/csv';

export default function Reports() {
  const { inspections, loading, error } = useInspections();
  const [site, setSite] = useState('');

  const filtered = useMemo(
    () => (site ? inspections.filter((i) => (i.site || 'UNASSIGNED') === site) : inspections),
    [inspections, site]
  );

  if (loading) return <Spinner label="Crunching numbers" />;
  if (error) return <ErrorNote>{error}</ErrorNote>;

  const summary = fleetSummary(filtered);
  const trend = monthlyTrend(filtered, { months: 12 });
  const sites = siteRollup(inspections);
  const worst = fleetVehicleRollup(filtered).slice(0, 10);

  if (inspections.length === 0) {
    return (
      <>
        <PageHeader title="Reports" />
        <EmptyState
          title="Nothing to report yet"
          body="Reports build themselves from completed walk-arounds in the app."
        />
      </>
    );
  }

  const downloadCsv = () => {
    const blob = new Blob([buildInspectionCsv(filtered)], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tiretrack-pro-${site ? `${site}-` : ''}${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <PageHeader
        title="Reports"
        subtitle={`${summary.reportCount} inspections · ${summary.tireCount} tires checked`}
        action={
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={site}
              onChange={(e) => setSite(e.target.value)}
              className="rounded-lg border border-edge bg-input px-3 py-2.5 text-sm text-bone
                focus:border-amber focus:outline-none"
            >
              <option value="">All sites</option>
              {sites.map((s) => (
                <option key={s.site} value={s.site}>
                  {s.site}
                </option>
              ))}
            </select>
            <Button variant="ghost" onClick={downloadCsv}>
              <Download size={15} /> CSV
            </Button>
          </div>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Immediate cost"
          value={formatUSD(summary.immediateCostUSD, { compact: true })}
          sub={`${summary.replaceCount} tires at replace`}
          tone="danger"
        />
        <StatCard
          label="Projected cost"
          value={formatUSD(summary.projectedWatchCostUSD, { compact: true })}
          sub={`${summary.watchCount} tires on watch`}
          tone="amber"
        />
        <StatCard
          label="Flagged vehicles"
          value={summary.flaggedVehicleCount}
          sub={`of ${summary.vehicleCount} inspected`}
        />
        <StatCard
          label="Sites covered"
          value={summary.sites.length || '—'}
          sub={`${summary.inspectors.length} inspectors`}
        />
      </div>

      <section className="mt-8">
        <SectionTitle>Replacement cost by month</SectionTitle>
        <Card className="p-4">
          <TrendChart data={trend} />
        </Card>
      </section>

      <section className="mt-8">
        <SectionTitle>Flagged tires by month</SectionTitle>
        <Card className="p-4">
          <SeverityTrend data={trend} />
        </Card>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        <div>
          <SectionTitle>By site</SectionTitle>
          <Card className="divide-y divide-edge">
            {sites.map((s) => (
              <div key={s.site} className="flex items-center justify-between gap-3 p-3.5">
                <div className="min-w-0">
                  <div className="truncate text-sm text-bone">{s.site}</div>
                  <div className="text-xs text-faint">
                    {s.reportCount} reports · {s.vehicleCount} vehicles ·{' '}
                    {relativeTime(s.lastInspectionAt)}
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="font-mono text-sm text-bone">
                    {formatUSD(s.immediateCostUSD, { compact: true })}
                  </div>
                  <div className="text-xs text-faint">
                    {s.replaceCount} replace / {s.watchCount} watch
                  </div>
                </div>
              </div>
            ))}
          </Card>
        </div>

        <div>
          <SectionTitle>Most degraded units</SectionTitle>
          <Card className="divide-y divide-edge">
            {worst.map((row) => (
              <Link
                key={row.equipmentId}
                to={`/fleet/${row.equipmentId}`}
                className="flex items-center justify-between gap-3 p-3.5 hover:bg-stripe"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-bone">{row.equipmentId}</span>
                    <StatusPill status={row.lastStatus} />
                  </div>
                  <div className="truncate text-xs text-faint">{row.equipment?.label}</div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="font-mono text-sm text-bone">
                    {formatUSD(row.totalImmediateCostUSD, { compact: true })}
                  </div>
                  <div className="text-xs text-faint">
                    {row.minTreadEver != null ? `${row.minTreadEver} mm min` : '—'}
                  </div>
                </div>
              </Link>
            ))}
          </Card>
        </div>
      </section>
    </>
  );
}
