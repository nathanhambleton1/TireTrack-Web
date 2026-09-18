import { Link } from 'react-router-dom';

const STATUS_STYLES = {
  OK: 'border-ok/40 bg-ok/10 text-ok',
  WATCH: 'border-amber/40 bg-amber/10 text-amber',
  REPLACE: 'border-danger/40 bg-danger/10 text-danger',
};

export function StatusPill({ status, className = '' }) {
  const style = STATUS_STYLES[status] ?? 'border-edge bg-elevated text-faint';
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[11px] tracking-widest uppercase ${style} ${className}`}
    >
      {status ?? 'pending'}
    </span>
  );
}

export function Card({ children, className = '' }) {
  return (
    <div className={`rounded-xl border border-edge bg-elevated ${className}`}>{children}</div>
  );
}

export function StatCard({ label, value, sub, tone = 'default', icon: Icon }) {
  const tones = {
    default: 'text-bone',
    amber: 'text-amber',
    danger: 'text-danger',
    ok: 'text-ok',
  };
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="font-mono text-[11px] tracking-widest text-faint uppercase">
            {label}
          </div>
          <div className={`mt-2 font-display text-3xl leading-none ${tones[tone]}`}>{value}</div>
          {sub ? <div className="mt-1.5 text-sm text-dim">{sub}</div> : null}
        </div>
        {Icon ? <Icon size={18} className="shrink-0 text-faint" /> : null}
      </div>
    </Card>
  );
}

export function Spinner({ label = 'Loading' }) {
  return (
    <div className="flex items-center gap-3 p-8 text-dim">
      <span className="size-4 animate-spin rounded-full border-2 border-edge-strong border-t-amber" />
      <span className="text-sm">{label}…</span>
    </div>
  );
}

export function EmptyState({ title, body, action }) {
  return (
    <Card className="hatch p-10 text-center">
      <h3 className="font-display text-lg text-bone">{title}</h3>
      {body ? <p className="mx-auto mt-2 max-w-md text-sm text-dim">{body}</p> : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </Card>
  );
}

export function Button({ as = 'button', variant = 'primary', className = '', ...props }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-display text-sm ' +
    'transition-colors disabled:cursor-not-allowed disabled:opacity-50';
  const variants = {
    primary: 'bg-amber text-ink hover:bg-amber-dark',
    ghost: 'border border-edge text-bone hover:border-edge-strong hover:bg-elevated',
    danger: 'border border-danger/40 text-danger hover:bg-danger/10',
  };
  const cls = `${base} ${variants[variant]} ${className}`;
  const Component = as === 'link' ? Link : as;
  return <Component className={cls} {...props} />;
}

export function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] tracking-widest text-faint uppercase">{label}</span>
      <div className="mt-1.5">{children}</div>
      {hint ? <p className="mt-1.5 text-xs text-faint">{hint}</p> : null}
    </label>
  );
}

export function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full rounded-lg border border-edge bg-input px-3 py-2.5 text-bone
        placeholder:text-faint focus:border-amber focus:outline-none ${className}`}
      {...props}
    />
  );
}

export function ErrorNote({ children }) {
  if (!children) return null;
  return (
    <p className="rounded-lg border border-danger/40 bg-danger/10 px-3 py-2 text-sm text-danger">
      {children}
    </p>
  );
}

export function PageHeader({ title, subtitle, action }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="font-display text-2xl">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-dim">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function SectionTitle({ children }) {
  return (
    <h2 className="mb-2.5 font-mono text-[11px] tracking-widest text-faint uppercase">
      {children}
    </h2>
  );
}
