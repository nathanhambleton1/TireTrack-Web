import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useInspections } from '../context/DataContext';
import { fleetSummary } from '../lib/analytics';
import { hasLocalChanges, resetToDemo } from '../lib/dataService';
import { relativeTime } from '../lib/format';
import {
  Button,
  Card,
  PageHeader,
  SectionTitle,
  StatCard,
} from '../components/ui';

export default function Account() {
  const { userAttributes, signOut } = useAuth();
  const { inspections, refresh } = useInspections();
  const navigate = useNavigate();
  const summary = fleetSummary(inspections);
  const modified = hasLocalChanges();

  const handleSignOut = async () => {
    await signOut();
    navigate('/', { replace: true });
  };

  const handleReset = async () => {
    if (!window.confirm('Discard your changes and restore the original demo data?')) return;
    resetToDemo();
    await refresh();
  };

  return (
    <>
      <PageHeader title="Account" subtitle="Demo session — nothing here leaves your browser." />

      <Card className="p-5">
        <dl className="grid gap-5 sm:grid-cols-2">
          <Row label="Name" value={userAttributes?.name || 'Not set'} />
          <Row label="Stored" value="This browser only" />
        </dl>
      </Card>

      <section className="mt-8">
        <SectionTitle>Data in view</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-3">
          <StatCard label="Inspections" value={summary.reportCount} />
          <StatCard label="Tires checked" value={summary.tireCount.toLocaleString('en-US')} />
          <StatCard label="Most recent" value={relativeTime(summary.lastInspectionAt)} />
        </div>
      </section>

      <section className="mt-8">
        <SectionTitle>Demo data</SectionTitle>
        <Card className="p-5">
          <p className="text-sm text-dim">
            This dashboard is running on generated sample inspections so the charts have
            something to show. There is no server behind it. Edits and deletions are saved
            to this browser&rsquo;s local storage and are not visible to anyone else.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="ghost" onClick={handleReset} disabled={!modified}>
              {modified ? 'Restore original demo data' : 'No changes to restore'}
            </Button>
            <Button variant="danger" onClick={handleSignOut}>
              Sign out
            </Button>
          </div>
        </Card>
      </section>
    </>
  );
}

function Row({ label, value }) {
  return (
    <div>
      <dt className="font-mono text-[11px] tracking-widest text-faint uppercase">{label}</dt>
      <dd className="mt-1 break-all text-bone">{value}</dd>
    </div>
  );
}
