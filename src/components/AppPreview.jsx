const PROGRESS = ['done', 'done', 'current', 'pending', 'pending', 'pending'];

const CONDITIONS = [
  { label: 'OK', tone: 'ok', active: true },
  { label: 'Watch', tone: 'amber', active: false },
  { label: 'Replace', tone: 'danger', active: false },
];

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫'];

/** Static illustration of the mobile app's per-tire data-entry screen, for the marketing site. */
export default function AppPreview({ className = '' }) {
  return (
    <div className={`relative mx-auto w-[260px] select-none ${className}`}>
      <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-amber/10 blur-3xl" />
      <div className="rounded-[2.25rem] border-4 border-edge-strong bg-ink p-2 shadow-2xl shadow-black/50">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-edge bg-ink">
          <div className="absolute top-0 left-1/2 z-10 h-4 w-20 -translate-x-1/2 rounded-b-xl bg-edge-strong" />

          <div className="px-3 pt-6 pb-4">
            <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-widest text-faint uppercase">
              <span className="text-amber">←</span>
              <span>Tire 3 of 6</span>
            </div>

            <div className="mt-2 flex gap-1">
              {PROGRESS.map((state, i) => (
                <span
                  key={i}
                  className={
                    'h-1 flex-1 rounded-full ' +
                    (state === 'done'
                      ? 'bg-ok'
                      : state === 'current'
                        ? 'bg-amber'
                        : 'bg-edge')
                  }
                />
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-amber font-display text-[11px] font-bold text-ink">
                FL
              </div>
              <div className="min-w-0">
                <div className="font-mono text-[8px] tracking-widest text-faint uppercase">
                  Tire data · Front left
                </div>
                <div className="font-display text-[13px] leading-tight text-bone">
                  Tread Depth
                </div>
              </div>
            </div>

            <div className="relative mt-3 rounded-lg border border-amber/40 bg-elevated px-3 py-4 text-center">
              <span className="absolute top-1 left-1 h-2 w-2 border-t border-l border-amber" />
              <span className="absolute top-1 right-1 h-2 w-2 border-t border-r border-amber" />
              <span className="absolute bottom-1 left-1 h-2 w-2 border-b border-l border-amber" />
              <span className="absolute right-1 bottom-1 h-2 w-2 border-r border-b border-amber" />
              <div className="font-mono text-4xl leading-none text-bone">
                9.2<span className="ml-1 text-xs text-faint">mm</span>
              </div>
            </div>

            <div className="mt-2 grid grid-cols-3 gap-1">
              {KEYS.map((k) => (
                <div
                  key={k}
                  className="rounded border border-edge bg-elevated py-1.5 text-center font-mono text-[10px] text-dim"
                >
                  {k}
                </div>
              ))}
            </div>

            <div className="mt-3 font-mono text-[8px] tracking-widest text-faint uppercase">
              Overall condition
            </div>
            <div className="mt-1 grid grid-cols-3 gap-1">
              {CONDITIONS.map(({ label, tone, active }) => (
                <div
                  key={label}
                  className={
                    'flex items-center justify-center gap-1 rounded border py-1 font-mono text-[9px] uppercase ' +
                    (active
                      ? tone === 'ok'
                        ? 'border-ok bg-ok/10 text-ok'
                        : tone === 'amber'
                          ? 'border-amber bg-amber/10 text-amber'
                          : 'border-danger bg-danger/10 text-danger'
                      : 'border-edge text-faint')
                  }
                >
                  <span
                    className={
                      'size-1.5 rounded-full ' +
                      (tone === 'ok' ? 'bg-ok' : tone === 'amber' ? 'bg-amber' : 'bg-danger')
                    }
                  />
                  {label}
                </div>
              ))}
            </div>

            <div className="mt-2 grid grid-cols-2 gap-1.5">
              <div className="rounded border border-edge bg-elevated px-2 py-1.5">
                <div className="font-mono text-[7px] tracking-widest text-faint uppercase">
                  PSI
                </div>
                <div className="font-mono text-sm text-bone">108</div>
              </div>
              <div className="flex flex-col items-center justify-center gap-0.5 rounded border border-amber bg-amber/10 px-2 py-1.5">
                <span className="text-[10px] text-amber">◉</span>
                <span className="font-mono text-[7px] tracking-widest text-amber uppercase">
                  Photo attached
                </span>
              </div>
            </div>

            <div className="mt-3 rounded-lg bg-amber py-2 text-center font-display text-[11px] text-ink">
              Next tire →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
