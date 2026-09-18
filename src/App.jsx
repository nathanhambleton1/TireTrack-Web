import { Navigate, Route, Routes } from 'react-router-dom';
import AppShell from './components/AppShell';
import RequireAuth from './components/RequireAuth';
import { DataProvider } from './context/DataContext';
import Account from './pages/Account';
import Dashboard from './pages/Dashboard';
import Fleet from './pages/Fleet';
import InspectionDetail from './pages/InspectionDetail';
import Inspections from './pages/Inspections';
import Landing from './pages/Landing';
import Reports from './pages/Reports';
import SignIn from './pages/SignIn';
import VehicleDetail from './pages/VehicleDetail';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/sign-in" element={<SignIn />} />

      <Route
        element={
          <RequireAuth>
            <DataProvider>
              <AppShell />
            </DataProvider>
          </RequireAuth>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inspections" element={<Inspections />} />
        <Route path="/inspections/:id" element={<InspectionDetail />} />
        <Route path="/fleet" element={<Fleet />} />
        <Route path="/fleet/:equipmentId" element={<VehicleDetail />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/account" element={<Account />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
