import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useInspections } from '../context/DataContext';
import { vehicleHistory } from '../lib/analytics';
import { FLEET_DISPLAY } from '../data/fleet';
import { formatUSD } from '../data/tireCosts';
import { formatDate } from '../lib/format';
import { formatAxleSpec } from '../lib/specs';
import TireGrid from '../components/TireGrid';
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

export default function VehicleDetail() {
  const { equipmentId } = useParams();
  const { inspections, loading, error } = useInspections();

  if (loading) return <Spinner label="Loading vehicle" />;
  if (error) return <ErrorNote>{error}</ErrorNote>;

  const equipment = FLEET_DISPLAY.find((f) => f.id === equipmentId);
  if (!equipment) {
    return (
      <EmptyState
        title="Unit not in the roster"
        body={`${equipmentId} is not defined in the fleet data.`}
        action={
          <Button as="link" to="/fleet" variant="ghost">
            Back to fleet
          </Button>
        }
      />
    );
  }

  const history = vehicleHistory(inspections, equipmentId);
  const latest = history[history.length - 1] ?? null;

  return (
    <>
      <Link
        to="/fleet"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-dim hover:text-amber"
      >
        <ArrowLeft size={15} /> Fleet
      </Link>

      <PageHeader
        title={
          <span className="flex items-center gap-3">
            <span className="font-mono">{equipment.id}</span>
            {latest ? <StatusPill status={latest.status} /> : null}
          </span>
        }
        subtitle={`${equipment.label} · ${equipment.unit}${
          equipment.year ? ` · ${equipment.year}` : ''
        }`}
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Inspections" value={history.length} />
        <StatCard
          label="Tires"
          value={equipment.tireCount}
          sub={formatAxleSpec(equipment.tireSize)}
        />
        <StatCard
          label="Per tire installed"
          value={formatUSD(latest?.perTireCostUSD ?? 0, { compact: true })}
          sub="incl. labour & disposal"
        />
        <StatCard
          label="Min tread seen"
          value={latest?.minTread != null ? `${latest.minTread.toFixed(1)}` : '—'}
          sub={`min allowed ${equipment.treadDepthMin_mm ?? '—'} mm`}
          tone={
            latest?.minTread != null &&
            equipment.treadDepthMin_mm != null &&
            latest.minTread <= equipment.treadDepthMin_mm
              ? 'danger'
              : 'default'
          }
        />
      </div>

      {history.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="Never inspected"
            body="This unit is in the roster but has no walk-around on record yet."
          />
        </div>
      ) : (
        <>
          {history.length > 1 ? (
            <section className="mt-8">
              <SectionTitle>Average tread over time</SectionTitle>
              <Card className="p-4">
                <TreadHistory history={history} equipment={equipment} />
              </Card>
            </section>
          ) : null}

          <section className="mt-8">
            <SectionTitle>Latest walk-around</SectionTitle>
            <Card className="p-4">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <Link
                  to={`/inspections/${latest.inspectionId}`}
                  className="font-mono text-sm text-amber hover:underline"
                >
                  {latest.displayId}
                </Link>
                <span className="text-xs text-faint">
                  {formatDate(latest.createdAt, { withTime: true })}
                </span>
              </div>
              <TireGrid equipment={equipment} results={latest.results} />
            </Card>
          </section>

          <section className="mt-8">
            <SectionTitle>History</SectionTitle>
            <Card className="divide-y divide-edge">
              {[...history].reverse().map((h) => (
                <Link
                  key={h.inspectionId}
                  to={`/inspections/${h.inspectionId}`}
                  className="grid grid-cols-2 items-center gap-3 p-3.5 hover:bg-stripe sm:grid-cols-4"
                >
                  <div className="min-w-0">
                    <div className="font-mono text-sm text-bone">{h.displayId}</div>
                    <div className="truncate text-xs text-faint">{h.site || 'No site'}</div>
                  </div>
                  <div><StatusPill status={h.status} /></div>
                  <div className="font-mono text-sm text-dim">
                    {h.avgTread != null ? `${h.avgTread.toFixed(1)} mm avg` : '—'}
                  </div>
                  <div className="text-right text-xs text-faint">{formatDate(h.createdAt)}</div>
                </Link>
              ))}
            </Card>
          </section>
        </>
      )}
    </>
  );
}

// Single series — average tread depth. The legal-minimum line is a reference
// rule, not a second series, so no legend is needed.
function TreadHistory({ history, equipment }) {
  const data = history
    .filter((h) => h.avgTread != null)
    .map((h) => ({
      label: formatDate(h.createdAt),
      avgTread: Number(h.avgTread.toFixed(2)),
      minTread: h.minTread,
      displayId: h.displayId,
    }));

  if (data.length < 2) {
    return <p className="py-8 text-center text-sm text-dim">Not enough readings to plot yet.</p>;
  }

  const min = equipment.treadDepthMin_mm ?? null;

  return (
    <figure className="m-0">
      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
            <CartesianGrid stroke="#2a2c31" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: '#5a5d63', fontSize: 10, fontFamily: 'DM Mono, monospace' }}
              axisLine={{ stroke: '#2a2c31' }}
              tickLine={false}
            />
            <YAxis
              width={40}
              unit="mm"
              domain={['dataMin - 2', 'dataMax + 2']}
              tick={{ fill: '#5a5d63', fontSize: 10, fontFamily: 'DM Mono, monospace' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<TreadTooltip min={min} />} />
            <Line
              type="monotone"
              dataKey="avgTread"
              stroke="#f5a623"
              strokeWidth={2}
              dot={{ r: 4, fill: '#f5a623', stroke: '#17181b', strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <figcaption className="mt-3 text-xs text-faint">
        Average tread depth across all {equipment.tireCount} positions.
        {min != null ? ` Replacement threshold is ${min} mm.` : ''}
      </figcaption>
    </figure>
  );
}

function TreadTooltip({ active, payload, label, min }) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  const belowMin = min != null && row.minTread != null && row.minTread <= min;
  return (
    <div className="rounded-lg border border-edge bg-ink px-3 py-2 text-sm shadow-lg">
      <div className="font-mono text-xs text-faint">{row.displayId}</div>
      <div className="mt-1 font-display text-base text-bone">{row.avgTread} mm avg</div>
      <div className="text-xs text-dim">
        shallowest {row.minTread != null ? `${row.minTread} mm` : '—'}
        {belowMin ? ' · at threshold' : ''}
      </div>
      <div className="mt-1 text-xs text-faint">{label}</div>
    </div>
  );
}
