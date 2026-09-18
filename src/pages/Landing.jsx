import { Link } from 'react-router-dom';
import { BarChart3, Camera, Gauge, Smartphone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui';
import { FLEET_DISPLAY } from '../data/fleet';

const FEATURES = [
  {
    icon: Camera,
    title: 'Walk-around in the app',
    body: 'Scan a unit, step each tire position in order, and record tread depth, pressure and a photo without leaving the yard.',
  },
  {
    icon: Smartphone,
    title: 'Works with no signal',
    body: 'Inspections are written straight to the device. No account, no upload, nothing to fail halfway up a haul road.',
  },
  {
    icon: BarChart3,
    title: 'Costed automatically',
    body: 'Every tire carries a size-derived replacement cost, so a flagged walk-around becomes a budget number on its own.',
  },
  {
    icon: Gauge,
    title: 'Wear tracked over time',
    body: 'Per-unit history shows tread trending toward the legal minimum before it becomes downtime.',
  },
];

export default function Landing() {
  const { user, loading } = useAuth();

  return (
    <div className="min-h-full">
      <header className="flex items-center justify-between px-5 py-4 sm:px-8">
        <div className="flex items-center gap-2.5">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="size-8 rounded-md" />
          <span className="font-display text-lg leading-none tracking-tight">
            TireTrack<span className="text-amber"> Pro</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          {!loading && user ? (
            <Button as="link" to="/dashboard">
              Open dashboard
            </Button>
          ) : (
            <Button as="link" to="/sign-in">
              Open the demo
            </Button>
          )}
        </div>
      </header>

      <section className="hatch border-y border-edge px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[11px] tracking-[0.25em] text-amber uppercase">
            Tire inspection for heavy fleets
          </p>
          <h1 className="mt-5 font-display text-4xl leading-[1.1] sm:text-6xl">
            Know which tire fails
            <br />
            <span className="text-amber">before it does.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-dim">
            TireTrack Pro turns a clipboard walk-around into costed, searchable history across
            every haul truck, loader and grader you run.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button as="link" to={user ? '/dashboard' : '/sign-in'}>
              {user ? 'Open dashboard' : 'Open the demo'}
            </Button>
          </div>
          <p className="mt-6 font-mono text-xs text-faint">
            {FLEET_DISPLAY.length} unit roster · {new Set(FLEET_DISPLAY.map((f) => f.category)).size}{' '}
            equipment classes preconfigured
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
        <div className="grid gap-5 sm:grid-cols-2">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-xl border border-edge bg-elevated p-6">
              <Icon size={20} className="text-amber" />
              <h2 className="mt-4 font-display text-lg">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-dim">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-edge px-5 py-8 text-center text-sm text-faint sm:px-8">
        TireTrack Pro · demo build running on sample data ·{' '}
        <Link to="/sign-in" className="hover:text-amber">
          Open it
        </Link>
      </footer>
    </div>
  );
}
