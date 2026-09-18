import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check, Pencil, Trash2 } from 'lucide-react';
import { useInspections } from '../context/DataContext';
import { costForInspection, costForVehicle, inspectionStatus } from '../lib/analytics';
import { formatUSD } from '../data/tireCosts';
import { deleteInspection, updateInspection } from '../lib/dataService';
import { formatDate } from '../lib/format';
import TireGrid from '../components/TireGrid';
import {
  Button,
  Card,
  EmptyState,
  ErrorNote,
  Field,
  Input,
  PageHeader,
  SectionTitle,
  Spinner,
  StatCard,
  StatusPill,
} from '../components/ui';

export default function InspectionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { inspections, loading, error, refresh } = useInspections();
  const [editing, setEditing] = useState(false);
  const [site, setSite] = useState('');
  const [inspector, setInspector] = useState('');
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState('');

  if (loading) return <Spinner label="Loading inspection" />;
  if (error) return <ErrorNote>{error}</ErrorNote>;

  const inspection = inspections.find((i) => i.id === id);
  if (!inspection) {
    return (
      <EmptyState
        title="Inspection not found"
        body="It may have been deleted, or it belongs to another account."
        action={
          <Button as="link" to="/inspections" variant="ghost">
            Back to inspections
          </Button>
        }
      />
    );
  }

  const vehicles = Object.entries(inspection.vehicles);
  const cost = costForInspection(inspection);

  const startEditing = () => {
    setSite(inspection.site ?? '');
    setInspector(inspection.inspector ?? '');
    setActionError('');
    setEditing(true);
  };

  const saveDetails = async () => {
    setBusy(true);
    setActionError('');
    try {
      await updateInspection(inspection.id, { site: site.trim(), inspector: inspector.trim() });
      await refresh();
      setEditing(false);
    } catch (e) {
      setActionError(e?.message ?? 'Could not save.');
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    const label = inspection.displayId;
    if (
      !window.confirm(
        `Delete inspection ${label} and all ${vehicles.length} vehicle records? This cannot be undone.`
      )
    ) {
      return;
    }
    setBusy(true);
    setActionError('');
    try {
      await deleteInspection(
        inspection.id,
        vehicles.map(([, v]) => v.vehicleInspectionId).filter(Boolean)
      );
      await refresh();
      navigate('/inspections', { replace: true });
    } catch (e) {
      setActionError(e?.message ?? 'Could not delete.');
      setBusy(false);
    }
  };

  return (
    <>
      <Link
        to="/inspections"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-dim hover:text-amber"
      >
        <ArrowLeft size={15} /> Inspections
      </Link>

      <PageHeader
        title={
          <span className="flex items-center gap-3">
            <span className="font-mono">{inspection.displayId}</span>
            <StatusPill status={inspectionStatus(inspection)} />
          </span>
        }
        subtitle={formatDate(inspection.createdAt, { withTime: true })}
        action={
          <div className="flex gap-2">
            {editing ? (
              <Button onClick={saveDetails} disabled={busy}>
                <Check size={15} /> {busy ? 'Saving…' : 'Save'}
              </Button>
            ) : (
              <Button variant="ghost" onClick={startEditing}>
                <Pencil size={15} /> Edit
              </Button>
            )}
            <Button variant="danger" onClick={handleDelete} disabled={busy}>
              <Trash2 size={15} /> Delete
            </Button>
          </div>
        }
      />

      <ErrorNote>{actionError}</ErrorNote>

      <Card className="mt-2 p-4">
        {editing ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Site">
              <Input value={site} onChange={(e) => setSite(e.target.value)} placeholder="Pit 4" />
            </Field>
            <Field label="Inspector">
              <Input
                value={inspector}
                onChange={(e) => setInspector(e.target.value)}
                placeholder="Name"
              />
            </Field>
          </div>
        ) : (
          <dl className="grid gap-4 sm:grid-cols-2">
            <Detail label="Site" value={inspection.site || '—'} />
            <Detail label="Inspector" value={inspection.inspector || '—'} />
          </dl>
        )}
      </Card>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Vehicles" value={vehicles.length} />
        <StatCard
          label="At replace"
          value={cost.replaceCount}
          sub={formatUSD(cost.immediateCostUSD)}
          tone="danger"
        />
        <StatCard
          label="On watch"
          value={cost.watchCount}
          sub={formatUSD(cost.projectedWatchCostUSD)}
          tone="amber"
        />
        <StatCard
          label="Total exposure"
          value={formatUSD(cost.totalExposureUSD, { compact: true })}
          sub="replace + watch"
        />
      </div>

      <section className="mt-8 space-y-6">
        <SectionTitle>Vehicles</SectionTitle>
        {vehicles.length === 0 ? (
          <p className="text-sm text-dim">No vehicles were recorded on this inspection.</p>
        ) : (
          vehicles.map(([equipmentId, vehicle]) => {
            const vCost = costForVehicle(vehicle);
            return (
              <Card key={equipmentId} className="p-4">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/fleet/${equipmentId}`}
                        className="font-mono text-base text-amber hover:underline"
                      >
                        {equipmentId}
                      </Link>
                      <StatusPill status={vehicle.status} />
                    </div>
                    <div className="text-xs text-faint">
                      {vehicle.equipment?.label} · {vehicle.equipment?.unit} ·{' '}
                      {vehicle.equipment?.tireCount} tires
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm text-bone">
                      {formatUSD(vCost.immediateCostUSD)}
                    </div>
                    <div className="text-xs text-faint">
                      {formatUSD(vCost.perTire)} per tire installed
                    </div>
                  </div>
                </div>
                <TireGrid equipment={vehicle.equipment} results={vehicle.results} />
              </Card>
            );
          })
        )}
      </section>
    </>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <dt className="font-mono text-[11px] tracking-widest text-faint uppercase">{label}</dt>
      <dd className="mt-1 text-bone">{value}</dd>
    </div>
  );
}
