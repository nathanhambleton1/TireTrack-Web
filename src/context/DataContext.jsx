import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { listInspections } from '../lib/dataService';
import { useAuth } from './AuthContext';

// Exported so tests can render pages against a fixed dataset.
export const DataContext = createContext(null);

// Inspections are loaded once per session and shared across every page, so
// switching tabs does not re-read storage. Call refresh() after a mutation.
export function DataProvider({ children }) {
  const { user } = useAuth();
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    if (!user) {
      setInspections([]);
      setLoading(false);
      return;
    }
    setError(null);
    try {
      setInspections(await listInspections());
    } catch (e) {
      setError(e?.message ?? 'Could not load inspections.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    setLoading(true);
    refresh();
  }, [refresh]);

  return (
    <DataContext.Provider value={{ inspections, loading, error, refresh }}>
      {children}
    </DataContext.Provider>
  );
}

export function useInspections() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useInspections must be used inside DataProvider');
  return ctx;
}
