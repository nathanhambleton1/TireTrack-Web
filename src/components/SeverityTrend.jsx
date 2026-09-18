import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// Small multiples rather than one two-series chart: amber and red sit too close
// together under deuteranopia (ΔE 5.8–7.8) to carry identity by colour alone.
// Each panel is a single series with its own title, so nothing depends on hue.
const PANELS = [
  {
    key: 'replaceCount',
    title: 'Tires at REPLACE',
    color: '#e5484d',
    cursor: 'rgba(229,72,77,0.1)',
  },
  {
    key: 'watchCount',
    title: 'Tires on WATCH',
    color: '#f5a623',
    cursor: 'rgba(245,166,35,0.1)',
  },
];

export default function SeverityTrend({ data }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {PANELS.map((panel) => (
        <figure key={panel.key} className="m-0">
          <figcaption className="mb-2 font-mono text-[11px] tracking-widest text-faint uppercase">
            {panel.title}
          </figcaption>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
                <CartesianGrid stroke="#2a2c31" vertical={false} />
                <XAxis
                  dataKey="label"
                  tick={{ fill: '#5a5d63', fontSize: 10, fontFamily: 'DM Mono, monospace' }}
                  axisLine={{ stroke: '#2a2c31' }}
                  tickLine={false}
                  interval={1}
                />
                <YAxis
                  width={30}
                  allowDecimals={false}
                  tick={{ fill: '#5a5d63', fontSize: 10, fontFamily: 'DM Mono, monospace' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: panel.cursor }}
                  content={<CountTooltip title={panel.title} dataKey={panel.key} />}
                />
                <Bar
                  dataKey={panel.key}
                  fill={panel.color}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={22}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </figure>
      ))}
    </div>
  );
}

function CountTooltip({ active, payload, label, title, dataKey }) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="rounded-lg border border-edge bg-ink px-3 py-2 text-sm shadow-lg">
      <div className="font-mono text-xs text-faint">
        {label} {row.year}
      </div>
      <div className="mt-1 font-display text-base text-bone">{row[dataKey]}</div>
      <div className="text-xs text-dim">{title.toLowerCase()}</div>
    </div>
  );
}
