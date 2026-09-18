import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { Button, Field, Input } from '../components/ui';
import { useAuth } from '../context/AuthContext';

// Placeholder gate — one button. Nothing is checked, nothing is sent anywhere.
export default function SignIn() {
  const { user, loading, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState('');

  if (!loading && user) {
    return <Navigate to={location.state?.from ?? '/dashboard'} replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(name);
    navigate(location.state?.from ?? '/dashboard', { replace: true });
  };

  return (
    <AuthLayout
      title="Open the demo"
      subtitle="No account needed. This is a preview running on sample data."
      footer="Everything you change stays in this browser."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label="Your name (optional)" hint="Only used to personalise the dashboard.">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Alex Rivera"
            autoComplete="name"
          />
        </Field>
        <Button type="submit" className="w-full">
          Continue
        </Button>
      </form>
    </AuthLayout>
  );
}
