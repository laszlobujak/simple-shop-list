'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useSession, signIn, signOut } from '@/lib/auth-client';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { id: string; email: string; name: string | null } | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, isPending } = useSession();

  const login = async (email: string, password: string) => {
    try {
      const result = await signIn.email({
        email,
        password,
      });

      if (result.error) {
        return { success: false, error: result.error.message };
      }

      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'An error occurred during login' 
      };
    }
  };

  const logout = async () => {
    await signOut();
  };

  const value: AuthContextType = {
    isAuthenticated: !!session?.user && !isPending,
    user: session?.user ? {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
    } : null,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
