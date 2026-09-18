import { Link } from 'react-router-dom';
import { BarChart3, Camera, Gauge, NotebookPen, Smartphone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui';
import AppPreview from '../components/AppPreview';
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
        <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] tracking-[0.25em] text-amber uppercase">
              Tire inspection for heavy fleets
            </p>
            <h1 className="mt-5 font-display text-4xl leading-[1.1] sm:text-6xl">
              Know which tire fails
              <br />
              <span className="text-amber">before it does.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-dim">
              TireTrack Pro turns a clipboard walk-around into costed, searchable history across
              every haul truck, loader and grader you run.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button as="link" to={user ? '/dashboard' : '/sign-in'}>
                {user ? 'Open dashboard' : 'Open the demo'}
              </Button>
            </div>
            <p className="mt-6 font-mono text-xs text-faint">
              {FLEET_DISPLAY.length} unit roster ·{' '}
              {new Set(FLEET_DISPLAY.map((f) => f.category)).size} equipment classes preconfigured
            </p>
          </div>
          <div className="perspective-distant flex justify-center py-4 lg:justify-end">
            <AppPreview className="-rotate-2 rotate-x-6 -rotate-y-12" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8">
        <p className="font-mono text-[11px] tracking-[0.25em] text-amber uppercase">
          Logged on-site, not re-typed later
        </p>
        <h2 className="mx-auto mt-4 max-w-xl font-display text-3xl leading-tight sm:text-4xl">
          Skip the clipboard. The inspection <span className="text-amber">is</span> the record.
        </h2>
        <div className="mx-auto mt-8 max-w-xl space-y-5 text-left">
          <div className="flex gap-3 opacity-60">
            <NotebookPen size={18} className="mt-0.5 shrink-0 text-faint" />
            <p className="text-sm leading-relaxed text-dim">
              <span className="text-bone">The old way:</span> write tread, pressure and notes on a
              paper form out in the yard, then sit down later and type it all into a spreadsheet —
              twice the work, and numbers drift between the two.
            </p>
          </div>
          <div className="flex gap-3">
            <Smartphone size={18} className="mt-0.5 shrink-0 text-amber" />
            <p className="text-sm leading-relaxed text-dim">
              <span className="text-bone">With TireTrack Pro:</span> scan the unit, step through
              each tire position, and enter tread, PSI, condition and a photo right there. It's
              saved the moment you tap next — nothing left to transcribe.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-16 sm:px-8">
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
