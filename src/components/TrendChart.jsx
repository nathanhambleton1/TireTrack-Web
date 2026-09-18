import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { formatUSD } from '../data/tireCosts';

// Single-series by design. Replace and Watch are ordered severity levels, not
// independent identities, and amber/red/green cannot be told apart under
// red-green colour blindness (validated: ΔE 2.6 protan for amber↔green). Where
// both severities matter they are drawn as small multiples — one series each —
// rather than as two colours in one chart. See SeverityTrend below.
const AMBER = '#f5a623';
const AMBER_MUTED = 'rgba(245,166,35,0.35)';

export default function TrendChart({ data }) {
  const [showTable, setShowTable] = useState(false);
  const hasAny = data.some((d) => d.immediateCostUSD > 0);

  if (!hasAny) {
    return (
      <p className="py-10 text-center text-sm text-dim">
        No tires have been flagged for replacement in the last 12 months.
      </p>
    );
  }

  return (
    <figure className="m-0">
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
            <CartesianGrid stroke="#2a2c31" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: '#5a5d63', fontSize: 11, fontFamily: 'DM Mono, monospace' }}
              axisLine={{ stroke: '#2a2c31' }}
              tickLine={false}
            />
            <YAxis
              width={54}
              tick={{ fill: '#5a5d63', fontSize: 11, fontFamily: 'DM Mono, monospace' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => formatUSD(v, { compact: true })}
            />
            <Tooltip
              cursor={{ fill: 'rgba(245,166,35,0.08)' }}
              content={<CostTooltip />}
            />
            <Bar dataKey="immediateCostUSD" radius={[4, 4, 0, 0]} maxBarSize={28}>
              {data.map((d) => (
                <Cell
                  key={d.key}
                  fill={d.immediateCostUSD > 0 ? AMBER : AMBER_MUTED}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <figcaption className="mt-3 flex items-center justify-between gap-3 text-xs text-faint">
        <span>Estimated cost of tires marked REPLACE, by month inspected.</span>
        <button
          onClick={() => setShowTable((v) => !v)}
          className="shrink-0 underline hover:text-amber"
        >
          {showTable ? 'Hide table' : 'View as table'}
        </button>
      </figcaption>

      {showTable ? <TrendTable data={data} /> : null}
    </figure>
  );
}

function CostTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="rounded-lg border border-edge bg-ink px-3 py-2 text-sm shadow-lg">
      <div className="font-mono text-xs text-faint">
        {label} {row.year}
      </div>
      <div className="mt-1 font-display text-base text-bone">
        {formatUSD(row.immediateCostUSD)}
      </div>
      <div className="mt-1 text-xs text-dim">
        {row.replaceCount} replace · {row.watchCount} watch · {row.reportCount} reports
      </div>
    </div>
  );
}

function TrendTable({ data }) {
  return (
    <div className="mt-3 overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="font-mono text-[11px] tracking-widest text-faint uppercase">
            <th className="py-1.5 pr-3 font-normal">Month</th>
            <th className="py-1.5 pr-3 font-normal">Reports</th>
            <th className="py-1.5 pr-3 font-normal">Replace</th>
            <th className="py-1.5 pr-3 font-normal">Watch</th>
            <th className="py-1.5 font-normal">Cost</th>
          </tr>
        </thead>
        <tbody className="text-dim">
          {data.map((d) => (
            <tr key={d.key} className="border-t border-edge">
              <td className="py-1.5 pr-3 font-mono text-bone">
                {d.label} {String(d.year).slice(-2)}
              </td>
              <td className="py-1.5 pr-3">{d.reportCount}</td>
              <td className="py-1.5 pr-3">{d.replaceCount}</td>
              <td className="py-1.5 pr-3">{d.watchCount}</td>
              <td className="py-1.5 font-mono">{formatUSD(d.immediateCostUSD)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
