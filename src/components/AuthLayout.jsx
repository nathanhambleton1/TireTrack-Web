import { Link } from 'react-router-dom';

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="grid min-h-full place-items-center px-4 py-12">
      <div className="w-full max-w-sm">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2.5">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="size-9 rounded-md" />
          <span className="font-display text-xl leading-none tracking-tight">
            TireTrack<span className="text-amber"> Pro</span>
          </span>
        </Link>

        <div className="rounded-xl border border-edge bg-elevated p-6">
          <h1 className="font-display text-xl">{title}</h1>
          {subtitle ? <p className="mt-1.5 text-sm text-dim">{subtitle}</p> : null}
          <div className="mt-6">{children}</div>
        </div>

        {footer ? <div className="mt-5 text-center text-sm text-dim">{footer}</div> : null}
      </div>
    </div>
  );
}
