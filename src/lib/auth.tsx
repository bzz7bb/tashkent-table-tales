import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type User = { name: string; contact: string };

type Ctx = {
  user: User | null;
  ready: boolean;
  login: (u: User) => void;
  logout: () => void;
  update: (u: Partial<User>) => void;
};

const AuthContext = createContext<Ctx | null>(null);
const KEY = "vibecheck.user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw) as User);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      user,
      ready,
      login: (u) => {
        setUser(u);
        localStorage.setItem(KEY, JSON.stringify(u));
      },
      logout: () => {
        setUser(null);
        localStorage.removeItem(KEY);
      },
      update: (patch) =>
        setUser((prev) => {
          if (!prev) return prev;
          const next = { ...prev, ...patch };
          localStorage.setItem(KEY, JSON.stringify(next));
          return next;
        }),
    }),
    [user, ready],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
