import { createContext, useCallback, useContext, useEffect, useState } from 'react';

// Placeholder authentication. There is no account server and nothing is verified
// — "signing in" writes a name to this browser's localStorage so the dashboard
// has a session to gate on and something to greet you with. It is a demo gate,
// not a security boundary.
const PROFILE_KEY = 'tiretrackpro.web.profile.v1';

const AuthContext = createContext(null);

function readProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(readProfile());
    setLoading(false);
  }, []);

  const signIn = useCallback((name = '') => {
    const profile = {
      userId: 'demo-viewer',
      name: name.trim(),
      signedInAt: new Date().toISOString(),
    };
    setUser(profile);
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch {
      // Session just will not survive a reload.
    }
    return profile;
  }, []);

  const signOut = useCallback(async () => {
    setUser(null);
    try {
      localStorage.removeItem(PROFILE_KEY);
    } catch {
      // Nothing stored.
    }
  }, []);

  const userAttributes = user ? { name: user.name, email: '' } : null;

  return (
    <AuthContext.Provider value={{ user, userAttributes, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
