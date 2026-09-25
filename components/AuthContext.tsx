"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

/* ===============================================================
   AUTH CONTEXT

   Lightweight, localStorage-backed session flag — matches the
   pattern used by CartContext / WishlistContext / ThemeContext.

   This is NOT real authentication. It's a placeholder session
   layer so pages can gate on "is someone logged in" while the
   real auth backend isn't built yet. Swap `login`/`logout` for
   real API calls + token storage when that's ready; every
   consumer of useAuth() keeps working unchanged.
================================================================ */

const STORAGE_KEY = "shopora_auth";

type AuthUser = {
  email: string;
  name?: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  // True until the initial localStorage read completes. Callers
  // that gate rendering on auth state should wait for this to be
  // false before redirecting, or they'll bounce logged-in users
  // to /login for a frame on every page load / refresh.
  isLoading: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hydrate from localStorage on mount (client-only — avoids
  // SSR/client mismatch since localStorage doesn't exist on the
  // server).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setUser(JSON.parse(raw));
      }
    } catch (err) {
      console.error("Failed to read auth session:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  function login(nextUser: AuthUser) {
    setUser(nextUser);
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(nextUser)
      );
    } catch (err) {
      console.error("Failed to persist auth session:", err);
    }
  }

  function logout() {
    setUser(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error("Failed to clear auth session:", err);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
