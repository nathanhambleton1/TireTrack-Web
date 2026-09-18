import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  ClipboardList,
  Gauge,
  LogOut,
  Menu,
  Truck,
  UserRound,
  X,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NAV = [
  { to: '/dashboard', label: 'Dashboard', icon: Gauge },
  { to: '/inspections', label: 'Inspections', icon: ClipboardList },
  { to: '/fleet', label: 'Fleet', icon: Truck },
  { to: '/reports', label: 'Reports', icon: BarChart3 },
  { to: '/account', label: 'Account', icon: UserRound },
];

export default function AppShell() {
  const { userAttributes, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/sign-in', { replace: true });
  };

  const nav = (
    <nav className="flex flex-col gap-1">
      {NAV.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          onClick={() => setMobileOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              isActive
                ? 'bg-amber/10 text-amber'
                : 'text-dim hover:bg-elevated hover:text-bone'
            }`
          }
        >
          <Icon size={17} />
          {label}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <div className="flex min-h-full">
      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-edge bg-ink p-4 lg:flex">
        <Brand />
        <div className="mt-8 flex-1">{nav}</div>
        <SignOutButton email={userAttributes?.email} onClick={handleSignOut} />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative flex h-full w-64 flex-col border-r border-edge bg-ink p-4">
            <div className="flex items-center justify-between">
              <Brand />
              <button
                onClick={() => setMobileOpen(false)}
                className="text-dim hover:text-bone"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <div className="mt-8 flex-1">{nav}</div>
            <SignOutButton email={userAttributes?.email} onClick={handleSignOut} />
          </aside>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-edge px-4 py-3 lg:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            className="text-dim hover:text-bone"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
          <Brand />
        </header>
        <div className="border-b border-amber/25 bg-amber/10 px-4 py-2 text-center text-xs text-amber sm:px-6 lg:px-8">
          Demo build — every inspection below is generated sample data, stored only in this browser.
        </div>
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="size-8 rounded-md" />
      <span className="font-display text-lg leading-none tracking-tight">
        TireTrack<span className="text-amber"> Pro</span>
      </span>
    </div>
  );
}

function SignOutButton({ email, onClick }) {
  return (
    <div className="border-t border-edge pt-4">
      {email ? <p className="truncate px-3 pb-2 text-xs text-faint">{email}</p> : null}
      <button
        onClick={onClick}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-dim
          transition-colors hover:bg-elevated hover:text-danger"
      >
        <LogOut size={17} />
        Sign out
      </button>
    </div>
  );
}
